export default {
    OPEN_MASK({commit},msg){
        commit('OPEN_MASK',msg)
    },
    RECORD_USERINFO({commit},msg){
        commit('RECORD_USERINFO',msg)
    },
    GET_USERINFO({commit}){
         commit('GET_USERINFO')
    }
}