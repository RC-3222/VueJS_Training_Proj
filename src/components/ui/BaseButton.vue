<template>
  <router-link v-if="isLink" :to="to" :class="mode">
    <slot></slot>
  </router-link>

  <button v-else :class="mode">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null
    },
    isLink: {
      type: Boolean,
      required: false,
      default: false
    },
    to: {
      type: String,
      required: false,
      default: '/'
    }
  }
}
</script>

<style lang="scss" scoped>
@use "../../scss/variables" as *;

button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: $clr-blue-10;
  border: 1px solid $clr-blue-10;;
  color: $clr-white-20;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;

  &:active,
  &:hover {
    background-color: $clr-blue-5;
    border-color: $clr-blue-5;
  }
}

.flat {
  background-color: transparent;
  color: $clr-blue-10;;
  border: none;

  &:active,
  &:hover {
    background-color: $clr-pink-30;
  }
}

.outline {
  background-color: transparent;
  color: $clr-blue-5;
  border-color: currentColor;

  &:active,
  &:hover {
    background-color: $clr-pink-30;
  }
}
</style>