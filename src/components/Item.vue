<template>
  <li :class="{ error: error }">
    <img
      :src="image"
      @click="$emit('open', url)"
    />
    <section
      @click="$emit('open', url)"
    >
      <div>
        <h2 v-text="title" />
        <p v-text="description"/>
      </div>
      <h2
        v-if="times.length"
        v-text="price"
        :class="classTendences"
        :number="numberTendences"
      />
    </section>

    <nav v-if="!load">
      <div
        class="trash"
        @click="$emit('remove', id)">
        <i name="trash" />
      </div>
       <div
        class="trash"
        @click="$emit('update', id)">
        <i name="trash" />
      </div>
    </nav>

    <div v-if="load">
      <i name="trash" />
    </div>
  </li>
</template>

<script>
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
    description: {
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
  },
};
</script>
