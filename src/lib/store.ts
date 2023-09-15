import { writable } from 'svelte/store';
export const url = 'http://localhost:3000';

export let openDialog = writable(false);
export let isFormValid = writable(false);
export let eventsCollection = writable();
