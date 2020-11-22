<template>
	<li>
		<button @click="addItem">
			<i name="plus" />
		</button>
	</li>
</template>

<script>
export default {
	name: "Add",
	methods: {
		async addItem(){
			this.$emit("add", url);
			this.$root.$emit("message", {
				command: "addItem"
			});
		},
	},
};
</script>