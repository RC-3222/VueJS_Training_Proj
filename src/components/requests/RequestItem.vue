<template>
    <li>
        <div>
            <a :href="emailLink">{{ email }}</a>
        </div>
        <p>{{ message }}</p>
    </li>
</template>

<script>
export default {
    props: ['email', 'message'],
    computed: {
        emailLink() {
            return `mailto:${this.email}`
        }
    }
}
</script>

<style lang="scss" scoped>
@use "../../scss/variables" as *;

li {
  margin: 1rem 0;
  border: 1px solid $clr-grey-30;
  padding: 1rem;
}

a {
  color: $clr-blue-10;
  text-decoration: none;
  font-weight: bold;
}

a:hover,
a:active {
  color: $clr-purple-20;
}

p {
  margin: 0.5rem 0 0 0;
}
</style>