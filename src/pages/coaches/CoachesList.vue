<template>
    <div>
        <base-dialog title="Error" :show="(!isLoading && error !== null)" @close="handleLoadingError"><p>{{ error }}</p></base-dialog>
        <section>
            <coach-filter @change-filter="setFilters"></coach-filter>
        </section>
        <section>
            <base-card>
                <div class="controls">
                    <base-button mode="outline" @click="forceRefresh">Refresh</base-button>
                    <base-button isLink to="/auth?redirect=register" v-if="!isLoggedIn">Sign in to register as a Coach</base-button>
                    <base-button isLink to="/register" v-if="!isAlreadyRegistered && isLoggedIn">Register as Coach</base-button>
                </div>
                <div v-if="isLoading">
                    <base-spinner></base-spinner>
                </div>
                <ul v-else-if="hasCoaches && filteredCoaches.length > 0">
                    <coach-item v-for="coach in filteredCoaches" :key="coach.id" :coachData="coach"></coach-item>
                </ul>
                <h3 v-else-if="hasCoaches">No suitable coaches found</h3>
                <h3 v-else>No coaches found</h3>
            </base-card>
        </section>
    </div>
</template>

<script>
import CoachItem from '@/components/coaches/CoachItem.vue';
import CoachFilter from '@/components/coaches/CoachFilter.vue';

export default {
    data() {
        return {
            isLoading:false,
            error:null,
            activeFilters: {
                frontend:true,
                backend:true,
                career:true
            },
        }
    },
    components: {
        CoachItem,
        CoachFilter,
    },
    computed: {
        filteredCoaches() {
            const coaches = this.$store.getters['coaches/coaches'];

            return coaches.filter((item)=>{
                for (const area of item.areas) {
                    if (this.activeFilters[area])
                        return true;
                }
                return false;
            });
        },
        isLoggedIn() {
            return this.$store.getters['isAuthenticated']
        },
        hasCoaches() {
            return this.$store.getters['coaches/hasCoaches'];
        },

        isAlreadyRegistered() {
            return this.$store.getters['coaches/isCoach']
        },
    },
    created() {
       this.loadCoaches()
    },
    methods: {
        forceRefresh() {
            this.loadCoaches(true)
        },
        handleLoadingError() {
            this.loadCoaches();
        },
        setFilters(updatedFilters) {
            this.activeFilters = updatedFilters;
        },
        async loadCoaches(forceRefresh = false) {
            this.isLoading = true;
            this.error = null;
            
            try {
                await this.$store.dispatch('coaches/loadCoaches', forceRefresh)
            } catch(err) {
                this.error = err.message || 'Something went wrong!';
            }

            this.isLoading = false;
        }
    }
}
</script>

<style lang="scss" scoped>
ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.controls {
    display: flex;
    justify-content: space-between;
}
</style>