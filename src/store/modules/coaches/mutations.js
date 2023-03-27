export default {
    registerCoach(state, payload) {
      state.coaches.push(payload);
    },
    setCoaches(state, payload) {
      state.coaches = payload;
    },
    setSelectedCoach(state, payload) {
      state.selectedCoach = payload;
    },
    setTimestamp(state) {
        state.lastFetch = new Date().getTime();
    },
  };