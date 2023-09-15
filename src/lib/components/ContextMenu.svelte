<script lang="ts">
	import { serviceDeleteEvent, serviceHideDialog } from '$lib/services/service';
	import { openDialog } from '$lib/store';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	export let record: any = {};

	let pos = { x: 0, y: 0 };
	let menu = { h: 0, w: 0 };
	let browser = { h: 0, w: 0 };
	export let showMenu = false;
	export let holdShowMenu = false;

	function rightClickContextMenu(e: any) {
		browser = {
			w: window.innerWidth,
			h: window.innerHeight
		};
		pos = {
			x: e.clientX,
			y: e.clientY
		};

		if (browser.h - pos.y < menu.h) pos.y = pos.y - menu.h;
		if (browser.w - pos.x < menu.w) pos.x = pos.x - menu.w;
	}

	function getContextMenuDimension(node: any) {
		let height = node.offsetHeight;
		let width = node.offsetWidth;
		menu = {
			h: height,
			w: width
		};
	}

	function editItem() {
		openDialog.update(() => true);
	}

	function remove() {
		console.log(record);
		
		serviceDeleteEvent(record?.id);
		dispatch('refresh', { record: record, delete: true });
		record = {};
		serviceHideDialog();
	}

	let menuItems = [
		{
			name: 'edit',
			onClick: editItem,
			displayText: 'Szerkesztés',
			icon: 'edit'
		},
		{
			name: 'remove',
			onClick: remove,
			displayText: 'Törlés',
			icon: 'delete'
		}
	];
	
	function clickout() {
		showMenu = false;
	}
    
	function holdMenu() {
		holdShowMenu = true;
	}

	function mouseLeave() {
		holdShowMenu = false;
		setTimeout(() => {
			if (!holdShowMenu) {
				showMenu = false;
			}
		}, 2000);
	}
</script>

{#if showMenu}
	<div class="p-3">
		<nav
			use:getContextMenuDimension
			style="position: absolute; top:{pos.y}px; left:{pos.x}px"
			on:blur={clickout}
			on:mouseleave={mouseLeave}
			on:mouseenter={holdMenu}
		>
			<div class="btn-group-vertical" id="navbar">
				{#each menuItems as item}
					<button class="btn btn-light border d-flex justify-content-start" on:click={item.onClick}
						><span class="material-symbols-outlined">
							{item.icon}
						</span>
						<span>
							{item.displayText}
						</span>
					</button>
				{/each}
			</div>
		</nav>
	</div>
{/if}

<svelte:window on:contextmenu|preventDefault={rightClickContextMenu} />
