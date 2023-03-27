<template>
    <div>
        <div v-if="isLoading">
            <base-spinner></base-spinner>
        </div>
        <base-dialog title="Error" :show="(!isLoading && error !== null)" @close="handleLoadingError"><p>{{ error }}</p></base-dialog>
        <section v-if="!isLoading && !error">
            <base-card>
                <h2>{{ fullName }}</h2>
                <h3>${{ rate }}/hour</h3>
            </base-card>
        </section>
        <section v-if="!isLoading && !error">
            <base-card>
                <header>
                    <h2>Interested? Reach out now!</h2>
                    <base-button isLink :to="contactRoute">Contact</base-button>
                </header>
                <router-view></router-view>
            </base-card>
        </section>
        <section v-if="!isLoading && !error">
            <base-card>
                <base-badge v-for="area in areas" :key="area" :type="area" :title="area"></base-badge>
                <p>{{ description }}</p>
            </base-card>
        </section>
    </div>

</template>

<script>
export default {
    props:['id'],
    data() {
        return {
            error:null,
            isLoading:false,
        }
    },
    created() {
        // this.selectedCoach = this.$store.getters['coaches/coaches'].find((item)=>item.id === this.id);
        this.loadCoachDetails()
    },
    computed: {
        fullName() {
            return `${this.selectedCoach.firstName} ${this.selectedCoach.lastName}`
        },
        contactRoute() {
            return `/coaches/${this.id}/contact`
        },
        areas() {
            return this.selectedCoach.areas
        },
        rate() {
            return this.selectedCoach.hourlyRate
        },
        description() {
            return this.selectedCoach.description
        },
        selectedCoach() {
            return this.$store.getters['coaches/selectedCoach']
        }
    },
    methods: {
        handleLoadingError() {
            this.loadCoachDetails()
        },
        async loadCoachDetails() {
            this.isLoading = true;
            this.error = null;
            
            try {
                await this.$store.dispatch('coaches/loadSelectedCoach', this.id)
            } catch(err) {
                this.error = err.message || 'Something went wrong!';
            }

            this.isLoading = false;
        }
    }
}
</script>