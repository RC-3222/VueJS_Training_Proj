<template>
    <div class="card">
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
@use "../../scss/variables" as *;
.card {
    border-radius: 12px;
    box-shadow: 0 2px 8px $clr-shadow-light;
    padding: 1rem;
    margin: 2rem auto;
    max-width: 40rem;
}
</style>
