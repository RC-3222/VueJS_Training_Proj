import actions from './actions'
import getters from './getters'
import mutations from './mutations'

// import { coachesData } from '@/mock-data'

const coaches = {
    namespaced:true,
    state() {
        return {
            lastFetch: null,
            coaches:[],
            selectedCoach:null,
        }
    },
    mutations,
    actions,
    getters
}

export default coaches;