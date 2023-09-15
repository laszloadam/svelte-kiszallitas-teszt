<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import Dialog, { Title, Content } from '@smui/dialog';
	import { openDialog } from '$lib/store';
	import { serviceHideDialog, serviceSave, serviceDeleteEvent, checkFormValidity } from '$lib/services/service';

	export let record: any = {};

	const dispatch = createEventDispatcher();

	let isValid = checkFormValidity(document.querySelector('form'));
	let open: boolean;

	openDialog.subscribe((value) => (open = value));

	onMount(async () => {
		isValid = checkFormValidity(document.querySelector('form'));
	});

	async function save(event: any) {
		serviceSave(record);
		dispatch('refresh', { record: record });
		event.target.reset();
	}

	function handleInput(event: any) {
		record[event.target.name] = event.target.value ?? '';
		isValid = checkFormValidity(document.querySelector('form'));
	}

	function hideDialog() {
		record = {};
		serviceHideDialog();
	}

	function deleteEvent() {
		serviceDeleteEvent(record?.id);
		dispatch('refresh', { record: record, delete: true });
		hideDialog();
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
	<Content id="fullscreen-content" class="p-3" style="min-width: 400px">
		<form on:submit|preventDefault={save} class="was-validated">
			<div class="form-floating mb-3">
				<input
					class="form-control"
					type="text"
					name="title"
					id="title"
					on:input={handleInput}
					value={record?.title ?? ''}
					placeholder="Megnevezés"
					required
				/>
				<div class="invalid-feedback">Kérem adjon meg egy termék nevet.</div>
				<label for="title">Megnevezés *</label>
			</div>
			<div class="form-floating mb-3">
				<input
					class="form-control"
					type="text"
					name="leiras"
					id="leiras"
					on:input={handleInput}
					value={record?.leiras ?? ''}
					placeholder="Leírás"
				/>
				<label for="leiras">Leírás</label>
			</div>
			<div class="form-floating mb-3">
				<input
					class="form-control"
					type="date"
					name="start"
					id="start"
					on:input={handleInput}
					value={record?.start ?? null}
					placeholder="év.hónap.nap"
				/>
				<div class="invalid-feedback">Kérem adjon meg egy szállítási dátumot.</div>
				<label for="start">Várható kiszállítás időpontja</label>
			</div>
			<div class="form-floating mb-3">
				<input
					class="form-control"
					type="text"
					name="szallitasiCim"
					id="szallitasiCim"
					on:input={handleInput}
					value={record?.szallitasiCim ?? ''}
					placeholder="Szállítási cím"
					required
				/>
				<div class="invalid-feedback">Kérem adjon meg egy szállítási címet.</div>
				<label for="szallitasiCim">Szállítási cím *</label>
			</div>
			<div class="form-floating mb-3">
				<input
					class="form-control"
					type="text"
					name="csomagSuly"
					id="csomagSuly"
					on:input={handleInput}
					value={record?.csomagSuly ?? 0}
					placeholder="CsomagSúly"
				/>
				<label for="csomagSuly">CsomagSúly</label>
			</div>
			<div class="form-floating mb-3">
				<select
					class="form-select"
					name="statusz"
					id="statusz"
					on:input={handleInput}
					value={record?.statusz ?? ''}
					placeholder="Státusz"
					required
				>
					<option value="elutasitott">Elutasított</option>
					<option value="elfogadva">Elfogadva</option>
					<option value="uton">Úton</option>
					<option value="kezbesitve">Kézbesítve</option>
				</select>
				<label for="statusz">Státusz</label>
			</div>
			<div class="d-grid gap-2 d-md-flex justify-content-end">
				{#if record?.id}
					<button class="btn btn-danger" type="button" on:click={deleteEvent}>Törlés</button>
				{/if}
				<button class="btn btn-primary" type="submit" disabled={!isValid}>Mentés</button>
				<button class="btn btn-outline-secondary" type="reset" on:click={hideDialog}>Mégsem</button>
			</div>
		</form>
	</Content>
</Dialog>

<style>
	input {
		height: 56px;
		width: 100% !important;
	}
	input:focus {
		border: 2px solid #0d6efd !important;
		box-shadow: none !important;
	}
</style>
