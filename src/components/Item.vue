<template>
  <li :class="{ error: error }">
    <img
      :src="image"
      @click="$emit('open', url)"
    />
    <section
      @click="$emit('open', url)"
    >
      <div class="info">
        <h2 v-text="title" />
        <p v-text="lastTime"/>
      </div>
      <h2
        v-if="times.length"
        v-text="price"
        :class="classTendences"
        :number="numberTendences"
      />
    </section>

    <nav v-if="!load">
      <button
        class="trash"
        @click="$emit('remove', id)">
        <FontIcon :icon="trash" />
      </button>
      <button
        class="update"
        @click="$emit('update', id)">
        <FontIcon :icon="update" />
      </button>
    </nav>

    <div
      v-if="load"
      class="loader">
      <FontIcon class="spinner" :icon="spinner" />
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
    url: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    symbol: {
      type: String,
      default: '$',
    },
    prices: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    numberTendences() {
      return this.prices[this.times[0]] / this.priceNumber;
    },
    price() {
      return `${this.symbol} ${this.priceNumber}`;
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
