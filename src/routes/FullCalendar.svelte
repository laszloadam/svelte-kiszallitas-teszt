<script lang="ts">
	import { onMount } from 'svelte';
	import { Calendar } from '@fullcalendar/core';
	import dayGridPlugin from '@fullcalendar/daygrid';
	import { openDialog } from './store.js';
	import NewOrder from './NewOrder.svelte';

	onMount(() => {
		const calendarEl = document.getElementById('calendar');
		if (calendarEl) {
			let calendar: Calendar = new Calendar(calendarEl, {
				plugins: [dayGridPlugin],
				initialView: 'dayGridMonth',
				locale: 'hu',
				timeZone: 'local',
				firstDay: 1,
				buttonText: {
					start: 'title',
					today: 'Ma',
					end: 'today prev,next'
				},
				buttonHints: {
					next: 'Következő hónap',
					prev: 'Elöző hónap',
					today: 'Aktuális hónap'
				},
				customButtons: {
					myCustomButton: {
						text: '+ Új rendelés',
						click: function () {
							openDialog.update(() => true);
						}
					}
				},
				headerToolbar: {
					left: 'myCustomButton',
					center: 'title',
					right: 'today prev,next'
				}
			});

			calendar.render();
		}
	});
</script>

<div class="d-flex justify-content-center">
	<div id="calendar" class="w-50 h-100" />
</div>

<NewOrder />
