<template>
    <header>
        <base-dialog title="Action Confirmation" :show="needToConfirmSignOut" fixed>
            <p>Are you sure you want to sign out?</p>
            <div class="dialog-actions"><base-button @click="cancelSignOut">No</base-button><base-button @click="signOut">Yes</base-button></div>
        </base-dialog>
        <nav>
            <h1><router-link to="/">Find a Coach</router-link></h1>
            <ul>
                <li><router-link to="/coaches">All Coaches</router-link></li>
                <li><router-link to="/requests" v-if="isCoach">Requests</router-link></li>
                <li><base-button v-if="!isLoggedIn && !isAlreadyOnAuthPage" @click="signIn">Sign In</base-button></li>
                <li><base-button v-if="isLoggedIn" @click="preSignOut">Sign Out</base-button></li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {
    data() {
        return {
            needToConfirmSignOut:false
        }
    },
    computed: {
        isLoggedIn() {
            return this.$store.getters.isAuthenticated
        },
        isCoach() {
            return this.$store.getters['coaches/isCoach']
        },
        isAlreadyOnAuthPage() {
            return this.$route.fullPath.includes('auth')
        }
    },
    methods: {
        signIn() {
            this.$router.push('/auth')
        },
        preSignOut() {
            this.needToConfirmSignOut = true;
        },
        signOut() {
            this.needToConfirmSignOut = false;
            this.$store.dispatch('signout')
            if (!this.$route.fullPath.endsWith('coaches')) this.$router.push('/coaches');
        },
        cancelSignOut() {
            this.needToConfirmSignOut = false;
        }
    }
}
</script>

<style lang="scss" scoped>
header {
    width: 100%;
    height: 5rem;
    background-color: #3d008d;
    display: flex;
    justify-content: center;
    align-items: center;

    a {
        text-decoration: none;
        color: #f391e3;
        display: inline-block;
        padding: 0.75rem 1.5rem;
        border: 1px solid transparent;

        &:hover,
        &:active,
        &.router-link-active {
            border: 1px solid #f391e3;
        }
    }

    button {
        color: #f391e3;
        background-color: transparent;
        border-color:currentColor;
        &:active,
        &:hover {
            background-color: #44009c;
            border-color:currentColor;
        }
    }

    h1 {
        margin: 0;

        a {
            color: white;
            margin: 0;

            &:hover,
            &:active,
            &.router-link-active {
                border-color: transparent;
            }
        }
    }

    nav {
        width: 90%;
        margin: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;

        li {
            margin: 0 0.5rem;
        }
    }

    .dialog-actions {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 3rem;
    }
}
</style>