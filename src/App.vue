<template>
    <the-header></the-header>
    <router-view v-slot="slotProps">
        <transition name="routing" mode="out-in">
            <component :is="slotProps.Component"></component>
        </transition>
    </router-view>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue'

export default {
    components: {
        TheHeader,
    },
    created() {
      this.$store.dispatch('trySignin')
    },
    computed: {
      didAutoSignout() {
        return this.$store.getters.didAutoSignout
      }
    },
    watch: {
      didAutoLogout(curValue, oldValue) {
        if (curValue && curValue !== oldValue) {
          this.$router.replace('/coaches');
        }
      }
    },
}

</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
    box-sizing: border-box;
}

html {
    font-family: "Roboto", sans-serif;
}

body {
    margin: 0;
}

.routing-enter-active {
  animation: nav-in .3s ease-out;
}

.routing-leave-active {
  animation: nav-out .3s ease-in;
}

@keyframes nav-in {
  from {
    opacity: 0;
    transform: translateX(-100%) scale(0.8);
  }

  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

@keyframes nav-out {
  from {
    opacity: 1;
    transform: translateX(0) scale(1);
  }

  to {
    opacity: 0;
    transform: translateX(100%) scale(0.8);
  }
}
</style>