<template>
	<ul>
		<Item 
			v-for="item in items"
			:key="item.key"
			:bind="item" 
			@open="openTab"
			@remove="removeItem"
			@update="updateById"
		/>
		<Add @is="addItem" />
	</ul>
</template>

<script>
import { mapActions } from 'vuex';
import Item from "./Item.vue";
import Add from "./Add.vue";

export default {
	name: "List",
	components: {
		Item,
		Add
	},
	watch: {
		items(){
			return this.$store.store.items;
		},
	},
	methods:{
		...mapActions([
			"updateById",
			"removeItem",
			"addItem",
			"openTab"
		])
	}
};
</script>