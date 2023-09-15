<script lang="ts">
	import { getEvents, serviceHideDialog } from '$lib/services/service';
	import type { EventInput } from '@fullcalendar/core';
	import { Grid, type CellContextMenuEvent } from 'ag-grid-community';
	import 'ag-grid-community/styles//ag-grid.css';
	import 'ag-grid-community/styles//ag-theme-alpine.css';
	import { onMount } from 'svelte';
	import OpenOrder from '../../lib/components/OpenOrder.svelte';
	import ContextMenu from '../../lib/components/ContextMenu.svelte';
	import { openDialog } from '$lib/store';

	let open: boolean;
	let record: EventInput;
	let grid: Grid;
	let gridOptions: any;
	let showMenu: boolean = false;

	openDialog.subscribe((value) => (open = value));

	onMount(async () => {
		gridOptions = {
			pagination: true,
			paginationAutoPageSize: true,
			onCellContextMenu: (event: CellContextMenuEvent) => {
				record = event.data;
				showMenu = true;
			},
			defaultColDef: {
				sortable: true,
				filter: true,
				floatingFilter: true,
				flex: 1
			},
			rowClassRules: {
				'bg-danger': function (params: any) {
					return !params?.data?.start;
				}
			},
			columnDefs: [
				{ headerName: 'Megnevezés', field: 'title' },
				{ headerName: 'Kiszállítás időpontja', field: 'start' },
				{ headerName: 'Szállítási cím', field: 'szallitasiCim' },
				{ headerName: 'Státusz', field: 'statusz' },
				{ headerName: 'Csomag súly', field: 'csomagSuly' }
			],
			rowData: await getEvents()
		};

		var eGridDiv = document.getElementById('myGrid');

		if (eGridDiv) {
			grid = new Grid(eGridDiv, gridOptions);
		}
	});

	async function refreshEvents(event?: EventInput) {
		showMenu = false;
		if (event?.detail?.record?.id) {
			if (event?.detail?.delete) {
				gridOptions.api.applyTransaction({ remove: [event?.detail?.record] });
				hideDialog();
				return;
			}
			gridOptions.api.applyTransaction({ update: [event?.detail?.record] });
			return;
		}
		gridOptions.api.applyTransaction({ add: [event?.detail?.record] });
	}

	async function newOrder() {
		openDialog.update(() => true);
	}

	function hideDialog() {
		record = {};
		serviceHideDialog();
	}

	function clickout() {
		showMenu = false;
	}
</script>

<h1 class="text-center mt-3">Lista nézet</h1>

<div>
	<button class="m-3 btn btn-primary" on:click={newOrder}>+ Új rendelés</button>
</div>

<div id="myGrid" class="ag-theme-alpine" />

{#if open}
	<OpenOrder bind:record on:refresh={refreshEvents} />
{/if}

<ContextMenu bind:record bind:showMenu on:refresh={refreshEvents} />

<style>
	#myGrid {
		height: calc(100vh - 300px);
	}
</style>
