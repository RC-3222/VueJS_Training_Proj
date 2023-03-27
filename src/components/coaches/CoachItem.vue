<template>
    <li>
        <h3>{{ fullName }}</h3>
        <h4>${{ coachData.hourlyRate }}/hour</h4>
        <div class="expertise">
            <base-badge v-for="area in coachData.areas" :key="area" :type="area" :title="area"></base-badge>
        </div>
        <div class="actions">
            <base-button mode="outline" isLink :to="`/coaches/${coachData.id}/contact`">Contact</base-button>
            <base-button isLink :to="`/coaches/${coachData.id}`">View Details</base-button>
        </div>
    </li>
</template>

<script>
export default {
    props:['coachData'],
    computed: {
        fullName() {
            return `${this.coachData.firstName} ${this.coachData.lastName}`
        }
    }
}
</script>

<style lang="scss" scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
  
    h3 {
    font-size: 1.5rem;
    }

    h3,
    h4 {
    margin: 0.5rem 0;
    }

    div {
    margin: 0.5rem 0;
    }

    .actions {
    display: flex;
    justify-content: flex-end;
    }

    .expertise {
        margin-bottom: 3.5rem;
    }
}
</style>