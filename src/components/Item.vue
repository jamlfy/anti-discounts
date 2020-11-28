<template>
  <li :class="{ error: error }">
    <img
      :src="image"
      @click="$emit('open', id)"
    />
    <section
      @click="$emit('open', id)">
      <div class="info">
        <h2 v-text="title" />
        <p
          v-if="lastTime"
          v-text="date"
        />
      </div>
      <h2
        v-if="times.length"
        class="price"
        :class="classTendences">
        <span v-text="price" />
        <span class="porcent"
          v-text="numberTendences"
        />
      </h2>
    </section>

    <nav
      v-if="!load"
      class="actions">
      <button
        class="update"
        @click="$emit('update', id)">
        <FontIcon :icon="update" />
      </button>
      <button
        class="trash"
        @click="$emit('remove', id)">
        <FontIcon :icon="trash" />
      </button>
    </nav>

    <div
      v-if="load"
      class="loader">
      <div class="lds-dual-ring"></div>
    </div>
  </li>
</template>

<script>
import { faRedo, faTrash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { lastTime, listTime } from '../utils';

export default {
  name: 'Item',
  props: {
    error: Boolean,
    load: Boolean,
    id: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    symbol: {
      type: String,
      default: 'COP',
    },
    prices: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    numberTendences() {
      return (this.prices[this.times[0]] / this.priceNumber) - 1;
    },
    price() {
      return this.priceNumber.toLocaleString(navigator.language, {
        style: 'currency',
        currency: this.symbol,
      });
    },
    classTendences() {
      return {
        green: this.numberTendences < 1,
        red: this.numberTendences > 1,
        grey: this.numberTendences === 1,
      };
    },
    priceNumber() {
      return this.prices[this.lastTime] || 0;
    },
    times() {
      return listTime(this.prices);
    },
    lastTime() {
      return lastTime({ prices: this.prices });
    },
    date() {
      return new Date(parseInt(this.lastTime, 10)).toLocaleString(navigator.language);
    },
    trash() {
      return faTrash;
    },
    update() {
      return faRedo;
    },
    spinner() {
      return faSpinner;
    },
  },
};
</script>

<style lang="scss">
  @import "../style/Item.scss";
</style>
