import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const requests = {
    namespaced:true,
    state() {
        return {
            requests:[]
        }

    },
    mutations,
    actions,
    getters
}

export default requests;