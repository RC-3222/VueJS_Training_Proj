export default {
    async registerCoach(context, data) {
      const userId = context.rootGetters.userId;

      const coachData = {
        firstName: data.first,
        lastName: data.last,
        description: data.desc,
        hourlyRate: data.rate,
        areas: data.areas
      };
  
      const response = await fetch(`https://vue-proj-73e09-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json?auth=${context.rootGetters.token}`, {
        method:'PUT',
        body: JSON.stringify(coachData),
      })

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to register as a coach!')
      }
      
      context.commit('registerCoach', {
        ...coachData,
        id:userId
      });
    },
    async loadCoaches(context, forceRefresh = false) {
      if (!context.getters.shouldUpdate && !forceRefresh) return;

      const response = await fetch(`https://vue-proj-73e09-default-rtdb.europe-west1.firebasedatabase.app/coaches.json`)

      const responseData = await response.json();

      if (!response.ok) {
        // ...
        throw new Error(responseData.message || 'Failed to fetch!')
      }

      const coaches = []

      for (const key in responseData) {
        
        const data = responseData[key];

        coaches.push({
          id:key,
          ...data
        })
      }

      context.commit('setCoaches', coaches);
      context.commit('setTimestamp')
    },

    async loadSelectedCoach(context, id) {

      const response = await fetch(`https://vue-proj-73e09-default-rtdb.europe-west1.firebasedatabase.app/coaches/${id}.json`)

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to fetch!')
      }

      /*const coach = []

      coachData.push({
        // id:key,
        ...responseData
      })

      for (const key in responseData) {
        
        const data = responseData[key];

        coaches.push({
          id:key,
          ...data
        })
      }*/

      context.commit('setSelectedCoach', responseData);
    }
  };