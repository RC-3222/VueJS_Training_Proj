export default {
    coaches(state) {
      return state.coaches;
    },
    hasCoaches(state) {
      return state.coaches?.length > 0;
    },
    isCoach(state, getters, rootState, rootGetters) {
      if (!rootGetters.isAuthenticated) return false;

      const coaches = getters.coaches;
      const userId = rootGetters.userId;
      return coaches.some(coach => coach.id === userId);
    },
    selectedCoach(state) {
      return state.selectedCoach
    },
    shouldUpdate(state) {

      const { lastFetch } = state;
      
      return (!lastFetch || ((new Date().getTime() - lastFetch)/1000)>60)
    }
  };