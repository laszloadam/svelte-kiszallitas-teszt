import { eventsCollection, isFormValid, openDialog, url } from "$lib/store";
import type { EventInput } from "@fullcalendar/core";
import { get } from "svelte/store";

export async function getEvents(): Promise<EventInput[]> {
    const response = await fetch(url + '/events');
    const data = await response.json();
    eventsCollection.update(() => data)
    return data
};

export async function serviceCreateEvent(value: EventInput) {

    await fetch(url + '/events', {
        method: 'POST',
        body: JSON.stringify(value),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await getEvents()
}

export async function serviceUpdateEvent(value: EventInput) {

    await fetch(url + '/events/' + value.id, {
        method: 'PUT',
        body: JSON.stringify(value),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await getEvents()
}

export async function serviceDeleteEvent(id: number) {
    if (confirm('Megerősíti?')) {
        await fetch(url + '/events/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await getEvents()
    };
}

export async function serviceSave(event: any) {
    if (get(isFormValid)) {
        event?.id ? await serviceUpdateEvent(event) : await serviceCreateEvent(event);
        serviceHideDialog();
    }
}

export function serviceHideDialog() {
    openDialog.update(() => false);
}
