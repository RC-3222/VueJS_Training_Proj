let signoutTimer = null;

function resetLocalStorageData() {
    localStorage.removeItem('userId')
    localStorage.removeItem('token')
    localStorage.removeItem('tokenExpiration')
}

function updateLocalStorageData(userId, token, tokenExpiration) {
    localStorage.setItem('userId', userId)
    localStorage.setItem('token', token)
    localStorage.setItem('tokenExpiration', tokenExpiration)
}

function getLocalStorageData() {
    return {
        token:localStorage.getItem('token'),
        userId:localStorage.getItem('userId'),
        tokenExpiration:+localStorage.getItem('tokenExpiration'),
    }
}


export default {
    async auth(context, payload) {
        const baseUrl = (payload.mode === 'signin' ? 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' : 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' )

        const response = await fetch(`${baseUrl}${process.env.VUE_APP_API_KEY}`, {
            method: 'POST',
            body: JSON.stringify({
                email:payload.email,
                password:payload.password,
                returnSecureToken:true
            })
        });

        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.error.message || 'Failed to authenticate')
            throw error
        }

        const currTime = new Date().getTime();
        const tokenExpiration = +responseData.expiresIn * 1000 + currTime;

        context.commit('setUser',{
            token: responseData.idToken,
            userId: responseData.localId,
        })
        
        updateLocalStorageData(responseData.localId, responseData.idToken, tokenExpiration)

        signoutTimer = setTimeout(()=>{
            context.dispatch('autoSignout')
        }, tokenExpiration - currTime)
    },

    signout(context) {
        clearTimeout(signoutTimer)
        context.commit('resetUser');
        resetLocalStorageData()
    },

    trySignin(context) {
        const {token, userId, tokenExpiration} = getLocalStorageData()
        const currTime = new Date().getTime()

        if (tokenExpiration < currTime) {
            resetLocalStorageData()
            return;
        }

        signoutTimer = setTimeout(()=>{
            context.dispatch('autoSignout')
        }, tokenExpiration - currTime)

        if (token && userId) {
            context.commit('setUser', {
                token,
                userId,
            })
        }
    },

    autoSignout(context) {
        context.dispatch('signout')
        context.commit('didAutoSignout')
    }
}
