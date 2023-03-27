export default {
    userId(state) {
        return state.userId;
    },
    token(state) {
        return state.token;
    },
    isAuthenticated(state) {
        return state.token
    },
    didAutoSignout(state) {
        return state.didAutoSignout;
    }
}
