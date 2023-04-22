import Vuex from "vuex"
import Vue from "vue"
import roles from "./roles"

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        perPage: 5,
        currentPage: 1,

    },

    mutations: {
        setCurrentPage(state, page) {
            state.currentPage = page
        },
        setPerPage(state, count) {
            state.perPage = count
        }
    },
    actions: {
        changePage({ commit }, page) {
            commit('setCurrentPage', page)
        },
        changeRange({ commit }, count) {
            commit('setPerPage', count)
        }
    },
    modules: {
        roles,
    }
})