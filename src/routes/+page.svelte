<script lang="ts">
	import FullCalendar from './FullCalendar.svelte';
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Button, { Label } from '@smui/button';
	import FormField from '@smui/form-field';
	import Textfield from '@smui/textfield';
	import { DateInput, localeFromDateFnsLocale } from 'date-picker-svelte';
	import { hu } from 'date-fns/locale';

	let open = false;
	const today = new Date();

	const locale = localeFromDateFnsLocale(hu);

	let megnevezes: string | null = null;
	let leiras: string | null = null;
	let varhatoKiszallitasIdeje: Date | null = new Date();
	let szallitasiCim: string | null = null;
	let csomagSuly: number | null = null;

	$: record = {
		Megnevezes: megnevezes,
		Leiras: leiras,
		VarhatoKiszallitasIdeje: varhatoKiszallitasIdeje,
		szallitasiCim: szallitasiCim,
		CsomagSuly: csomagSuly
	};

	function removeRecord() {
		megnevezes = null;
		leiras = null;
		varhatoKiszallitasIdeje = null;
		szallitasiCim = null;
		csomagSuly = null;
	}
</script>

<h1 class="text-center mt-3">Hello World!</h1>

<Button on:click={() => (open = true)} variant="raised">
	<Label>+ Új rendelés</Label>
</Button>

<FullCalendar />

<Dialog
	bind:open
	fullscreen
	aria-labelledby="fullscreen-title"
	aria-describedby="fullscreen-content"
>
	<Title id="fullscreen-title" class="px-3 text-center">Megrendelés leadása</Title>
	<Content id="fullscreen-content" class="p-3">
		<FormField class="w-50 pt-3">
			<Textfield
				type="text"
				bind:value={megnevezes}
				label="Megnevezés"
				class="w-100"
				variant="outlined"
			/>
		</FormField>
		<FormField class="w-100 pt-3">
			<Textfield type="text" bind:value={leiras} label="Leírás" class="w-100" variant="outlined" />
		</FormField>
		<FormField class="w-10 pt-3">
			<DateInput
				bind:value={varhatoKiszallitasIdeje}
				min={today}
				format="yyyy.MM.dd."
				closeOnSelection={true}
				visible={false}
				placeholder="Várható kiszállítás ideje"
				{locale}
			/>
		</FormField>
		<FormField class="w-100 pt-3">
			<Textfield
				type="text"
				bind:value={szallitasiCim}
				label="Szállítási cím"
				class="w-100"
				variant="outlined"
			/>
		</FormField>
		<FormField class="w-100 pt-3">
			<Textfield
				type="number"
				bind:value={csomagSuly}
				label="Csomag súly"
				class="w-100"
				variant="outlined"
			/>
		</FormField>
	</Content>
	<Actions>
		<Button on:click={() => removeRecord()} variant="raised">
			<Label>Mégsem</Label>
		</Button>
		<Button on:click={() => console.log(record)} variant="raised">
			<Label>Mentés</Label>
		</Button>
	</Actions>
</Dialog>

{JSON.stringify(record)}
