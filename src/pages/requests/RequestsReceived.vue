<template>
    <div>
        <base-dialog title="Error" :show="(!isLoading && error !== null)" @close="handleLoadingError"><p>{{ error }}</p></base-dialog>
        <section>
            <base-card>
                <header>
                    <h2>Requests received</h2>
                </header>
                <div v-if="isLoading">
                    <base-spinner></base-spinner>
                </div>
                <ul v-else-if="hasRequests">
                    <request-item v-for="request in receivedRequests" :key="request.id" :email="request.userEmail"
                        :message="request.message"></request-item>
                </ul>
                <h3 v-else>You haven't received any requests yet</h3>
            </base-card>
        </section>
    </div>
</template>

<script>
import RequestItem from '@/components/requests/RequestItem.vue';

export default {
    data() {
        return {
            error: null,
            isLoading: false
        }
    },
    components: {
        RequestItem
    },
    computed: {
        receivedRequests() {
            return this.$store.getters['requests/requests']
        },
        hasRequests() {
            return this.$store.getters['requests/hasRequests']
        }
    },
    created() {
        this.loadRequests();
    },
    methods: {
        async loadRequests() {
            this.isLoading = true;
            this.error = null;

            try {
                await this.$store.dispatch('requests/loadRequests')
            } catch (err) {
                this.error = err.message || 'Something went wrong!';
            }

            this.isLoading = false;
        },
        handleLoadingError() {
            this.loadRequests();
        },
    }

}

</script>


<style scoped>
header {
    text-align: center;
}

ul {
    list-style: none;
    margin: 2rem auto;
    padding: 0;
    max-width: 30rem;
}

h3 {
    text-align: center;
}
</style>