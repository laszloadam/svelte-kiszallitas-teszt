<script lang="ts">
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import TextField from '@smui/textfield';
	import { DateInput, localeFromDateFnsLocale } from 'date-picker-svelte';
	import { hu } from 'date-fns/locale';
	import Button, { Label } from '@smui/button';
	import { openDialog } from './store.js';

	let Megnevezes: string | null = null;
	let Leiras: string | null = null;
	let VarhatoKiszallitasIdeje: Date | null = null;
	let SzallitasiCim: string | null = null;
	let CsomagSuly: number | null = null;

	const locale = localeFromDateFnsLocale(hu);
	let open: any = true;

	openDialog.subscribe((value) => {
		open = value;
	});

	const save = () => {
		let record = {
			Megnevezes: Megnevezes,
			Leiras: Leiras,
			VarhatoKiszallitasIdeje: VarhatoKiszallitasIdeje,
			SzallitasiCim: SzallitasiCim,
			CsomagSuly: CsomagSuly
		};
		console.log('mentés2!', record);

		hideDialog();
	};

	function hideDialog() {
		removeRecord();
		openDialog.update(() => false);
	}

	function removeRecord() {
		Megnevezes = null;
		Leiras = null;
		VarhatoKiszallitasIdeje = new Date();
		SzallitasiCim = null;
		CsomagSuly = null;
	}
</script>

<Dialog
	scrimClickAction=""
	escapeKeyAction=""
	bind:open
	aria-labelledby="fullscreen-title"
	aria-describedby="fullscreen-content"
>
	<Title id="fullscreen-title" class="px-3 text-center">Megrendelés leadása</Title>
	<Content id="fullscreen-content" class="p-3">
		<form on:submit|preventDefault={save}>
			<TextField
				class="w-100 mt-3"
				variant="outlined"
				label="Megnevezés"
				type="text"
				bind:value={Megnevezes}
			/>
			<TextField
				type="text"
				bind:value={Leiras}
				label="Leírás"
				class="w-100 mt-3"
				variant="outlined"
			/>
			<DateInput
				bind:value={VarhatoKiszallitasIdeje}
				class="customDateInput w-100 mt-3"
				visible={false}
				placeholder="Várható kiszállítás ideje"
				format="yyyy.MM.dd."
				{locale}
			/>
			<TextField
				class="w-100 mt-3"
				variant="outlined"
				type="text"
				bind:value={SzallitasiCim}
				label="Szállítáési cím"
			/>
			<TextField
				class="w-100 mt-3"
				variant="outlined"
				type="number"
				bind:value={CsomagSuly}
				label="Csomag súly"
			/>
		</form>
	</Content>
	<Actions>
		<Button on:click={() => hideDialog()} variant="raised">
			<Label>Mégsem</Label>
		</Button>
		<Button on:click={() => save()} variant="raised">
			<Label>Mentés</Label>
		</Button>
	</Actions>
</Dialog>

<style>
	 :global(input) {
		height: 56px;
		width: 100% !important;
		border-color: #9e9e9e !important;
	}
	:global(input:focus) {
		border: 2px solid #6200ee !important;
		box-shadow: none !important;
	}
</style>