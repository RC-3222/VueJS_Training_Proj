export default {
    requests(state) {
        return state.requests;
    },
    
    // hasRequests(state, getters, rootState, rootGetters) {
    hasRequests(state) {
        return state.requests?.length > 0;
    }
}
