<template>
    <span class="badge" :class="type">{{ text }}</span>
</template>

<script>
export default {
    props: ['type', 'title'],
    computed: {
        text() {
            return this.title.toUpperCase();
        },
    }
}
</script>

<style lang="scss" scoped>
@use "../../scss/variables" as *;
.badge {
    background-color: $clr-grey-30;
    color: $clr-black;
    border-radius: 30px;
    padding: 0.5rem 1.5rem;
    display: inline-block;
    margin-right: 0.5rem;
}

.frontend {
    background-color: $clr-blue-10;
    color: $clr-white-20;
}

.backend {
    background-color:$clr-purple-10;
    color: $clr-white-20;
}

.career {
    background-color: $clr-purple-20;
    color: $clr-white-20;
}
</style>