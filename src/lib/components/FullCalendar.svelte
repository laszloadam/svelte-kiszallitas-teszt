<script async script lang="ts">
	import { onMount } from 'svelte';
	import { Calendar, type EventInput } from '@fullcalendar/core';
	import dayGridPlugin from '@fullcalendar/daygrid';
	import { openDialog } from '$lib/store.js';
	import OpenOrder from './OpenOrder.svelte';
	import interactionPlugin from '@fullcalendar/interaction';
	import { getEvents, serviceUpdateEvent } from '$lib/services/service';
	import { format } from 'date-fns';

	let record: EventInput;
	let calendar: Calendar;
	let open: boolean;
	let events: EventInput[];

	onMount(async () => {
		calendarRender();
	});

	openDialog.subscribe((value) => (open = value));

	export async function calendarRender() {
		events = await getEvents();
		let calendarEl = document.getElementById('calendar');
		if (calendarEl) {
			calendar = new Calendar(calendarEl, {
				plugins: [interactionPlugin, dayGridPlugin],
				initialView: 'dayGridMonth',
				editable: true,
				eventDurationEditable: false,
				locale: 'hu',
				timeZone: 'local',
				firstDay: 1,
				buttonText: {
					today: 'Ma'
				},
				buttonHints: {
					next: 'Következő hónap',
					prev: 'Elöző hónap',
					today: 'Aktuális hónap'
				},
				headerToolbar: {
					left: 'myCustomButton',
					center: 'title',
					right: 'today prev,next'
				},
				events: events,
				customButtons: {
					myCustomButton: {
						text: '+ Új rendelés',
						click: function () {
							openDialog.update(() => true);
						}
					}
				},
				eventClick: function (arg) {
					if (events.length) {
						record =
							events.find((value: EventInput) => value.id?.toString() === arg.event?.id) || {};
						openDialog.update(() => true);
					}
				},
				eventDrop: async function (arg) {
					if (arg?.event?.start) {
						let event = {
							...events.find((event) => event.id == arg.event.id),
							start: format(new Date(arg.event.start), 'yyyy-MM-dd')
						};
						events = await serviceUpdateEvent(event);
					}
				}
			});

			calendar.render();
		}
	}
	async function refreshEvents(event?: EventInput) {
		if (event?.detail?.record?.id) {
			calendar.getEventById(event.detail.record.id)?.remove();
			if (event?.detail?.delete) {
				return;
			}
		}
		calendar.addEvent(event?.detail?.record);
		record = {};
		events = await getEvents();
	}
</script>

<div class="d-flex justify-content-center">
	<div id="calendar" class="w-50 h-100" />
</div>
{#if open}
	<OpenOrder bind:record on:refresh={refreshEvents} />
{/if}
