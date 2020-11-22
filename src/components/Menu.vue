<template>
	<nav>
		<template v-for="(id, text ) in $option.Links">
			<a
				href="#"
				:key="id"
				:class="{ 'active': id === active }"
				@click.prevent="$emit('update:active', id)"
				v-text="text" 
			/>
		</template>
	</nav>
</template>
<script>
export const Links =  {
	settings: 'Settings',
	list : 'List',
};

export default {
	name: "Menu",
	Links,
	props: {
		active: {
			type: String,
			validation: (val) => !!Links[val]
		}
	}
};
</script>