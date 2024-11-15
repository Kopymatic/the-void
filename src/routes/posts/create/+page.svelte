<script lang="ts">
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<form method="POST" action="?/post">
	{#if form && form.error}<p class="text-red-500">{form.message}</p>{/if}
	<label>
		Desired URL for the post
		<br />
		<input name="url" type="text" required={true} />
	</label>
	<br />
	<label>
		Category
		<br />
		<input name="category" type="text" required={false} value="uncategorized" />
	</label>
	<br />
	<label>
		Breif Description
		<br />
		<input name="description" type="text" required={false} />
	</label>
	<br />
	<label>
		Body
		<br />
		<textarea name="body" required={true}></textarea>
	</label>
	<br />
	<label>
		Password
		<br />
		yes i made you need a password to post. fuck off.
		<br />
		<input name="password" required={true} type="password" />
	</label>
	<br />
	<button>Post!</button>
</form>
