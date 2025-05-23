<script lang="ts">
	import { SignIn, SignOut } from "@auth/sveltekit/components";

	import type { PageData } from "./$types";
	let { data }: { data: PageData } = $props();
</script>

{#if data.session}
	<SignOut></SignOut>
{:else}
	<SignIn provider="discord" signInPage="signin" />
{/if}
