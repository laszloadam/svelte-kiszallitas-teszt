<script lang="ts">
	import { onMount } from 'svelte';
	import { Calendar } from '@fullcalendar/core';
	import dayGridPlugin from '@fullcalendar/daygrid';

	onMount(() => {
		const calendarEl = document.getElementById('calendar');
		if (calendarEl) {
			let calendar: Calendar = new Calendar(calendarEl, {
				plugins: [dayGridPlugin],
				initialView: 'dayGridMonth',
				locale: 'hu',
				timeZone: 'local',
				firstDay: 1
			});

			calendar.render();
		}
	});
</script>

<div class="d-flex justify-content-center">
	<div id="calendar" class="w-50 h-100" />
</div>
