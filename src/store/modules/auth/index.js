import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const auth = {
    namespaced:false,
    state() {
        return {
            userId:null,
            token:null,
            didAutoSignout:false,
        }
    },
    mutations,
    actions,
    getters
}

export default auth;