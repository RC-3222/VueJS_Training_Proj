export default {
    async contactCoach(context, payload) {
        const newReqData = {
            userEmail: payload.email,
            message: payload.message,
        }

        const response = await fetch(`https://vue-proj-73e09-default-rtdb.europe-west1.firebasedatabase.app/requests/${payload.coachId}.json`, {
            method: 'POST',
            body: JSON.stringify(newReqData),
        })


        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message || 'Failed to register as a coach!')
        }

        context.commit('addRequest', {
            ...newReqData,
            id: responseData.name,
        })
    },
    async loadRequests(context) {
        const userId = context.rootGetters.userId;

        const response = await fetch(`https://vue-proj-73e09-default-rtdb.europe-west1.firebasedatabase.app/requests/${userId}.json?auth=${context.rootGetters.token}`)

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message || 'Failed to fetch!')
        }

        const requests = []

        for (const key in responseData) {

            const data = responseData[key];

            requests.push({
                id: key,
                ...data,
            })
        }

        context.commit('setRequests', requests);
    }
}
