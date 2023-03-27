<template>
    <div>
        <base-dialog :show="isLoading" title="Authentification" fixed>
            <p>Authentification in progress</p>
            <base-spinner></base-spinner>
        </base-dialog>
        <base-dialog title="Error" :show="(!isLoading && error !== null)" @close="handleError"><p>{{ error }}</p></base-dialog>
        <base-card>
            <form @submit.prevent="submitForm">
                <div class="form-control">
                    <label for="email">E-Mail</label>
                    <input type="email" id="email" v-model.trim="email" />
                </div>
                <div class="form-control">
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model.trim="password" />
                </div>
                <p v-if="!formIsValid">Please enter valid email and password (> 6 characters long)</p>
                <base-button>{{ submitButtonCaption }}</base-button>
                <base-button type="button" mode="flat" @click="switchAuthMode">{{ switchModeButtonCaption }}</base-button>
            </form>
        </base-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isLoading:false,
            error:null,
            email:'',
            password: '',
            formIsValid: true,
            mode: 'signin',
        }
    },
    computed: {
        submitButtonCaption() {
            return (this.mode === 'signin' ? 'Sign in' : 'Sign up')
        },
        switchModeButtonCaption() {
            return (this.mode === 'signin' ? 'Sign up instead' : 'Sign in instead')
        },
    },
    methods: {
        handleError() {
            this.error = null;
        },
        async submitForm() {
            this.formIsValid = (this.email !== '' && this.email.includes('@') && this.password !== '') 
            if (!this.formIsValid) return;

            this.isLoading = true
            this.error = null
            
            try {
                await this.$store.dispatch('auth', {
                        mode:this.mode,
                        email:this.email,
                        password:this.password,
                })

                const redirectUrl = this.$route.query.redirect;

                this.$router.replace(`/${(redirectUrl || 'coaches')}`);
            } catch(err) {
                this.error = err.message || 'Something went wrong!'
            }
            this.isLoading = false;
        },
        switchAuthMode() {
            this.mode = (this.mode === 'signin') ? 'singup' : 'signin'
        }
    }
}

</script>

<style scoped>
form {
    margin: 1rem;
    padding: 1rem;
}

.form-control {
    margin: 0.5rem 0;
}
.form-control:last-of-type {
    margin-bottom: 1.5rem;
}

label {
    font-weight: bold;
    margin-bottom: 0.5rem;
    display: block;
}

input,
textarea {
    display: block;
    width: 100%;
    font: inherit;
    border: 1px solid #ccc;
    padding: 0.15rem;
}

input:focus,
textarea:focus {
    border-color: #3d008d;
    background-color: #faf6ff;
    outline: none;
}

.errors {
    font-weight: bold;
    color: red;
}

.actions {
    text-align: center;
}
</style>