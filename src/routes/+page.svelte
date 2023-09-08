<script lang="ts">
	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';

let prominent = false;
	let dense = false;
	let secondaryColor = false;
</script>

<div class="flexy">
	<div class="top-app-bar-container flexor">
		<TopAppBar
			variant="static"
			{prominent}
			{dense}
			color={secondaryColor ? 'secondary' : 'primary'}
		>
			<Row>
				<Section>
					<Title>Flex Static</Title>
				</Section>
			</Row>
		</TopAppBar>
		<div class="flexor-content">
			<h1>Welcome to SvelteKit</h1>
			<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
		</div>
	</div>
</div>

<style>
	.top-app-bar-container {
		width: 100vw;
		height: 100vh;
		overflow: auto;
		display: inline-block;
	}

	.flexy {
		display: flex;
		flex-wrap: wrap;
	}

	.flexor {
		display: inline-flex;
		flex-direction: column;
	}

	.flexor-content {
		flex-basis: 0;
		height: 0;
		flex-grow: 1;
		overflow: auto;
	}
</style>
