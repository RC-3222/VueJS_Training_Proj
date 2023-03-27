export default {
    setUser(state, payload) {
        state.token = payload.token;
        state.userId = payload.userId;
        state.tokenExpiration = payload.tokenExpiration;
        
        state.didAutoSignout = false;
    },
    resetUser(state) {
        state.token = null;
        state.userId = null;
        state.tokenExpiration = null;
    },
    didAutoSignout(state, status = true) {
        state.didAutoSignout = status
    }
}
