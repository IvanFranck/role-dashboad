
import data from "@/data";
export default {
    namespaced: true,
    state: {
        items: data,
        filteredItems: data,
        selected: [],
        filter: null,
        totalRows: 1,
    },

    mutations: {
        add(state, data) {
            //verify if the data did not exist in the table
            const index = state.items.findIndex(elt => {
                return JSON.stringify(data) === JSON.stringify(elt)
            })
            if (index !== -1) return;

            state.items.unshift({ ...data })
            state.filteredItems.unshift({ ...data })
        },

        delete(state, payload) {
            if (isNaN(Number(payload))) {
                const stringifiedPayload = payload.map(elt => JSON.stringify(elt))
                const newValue = state.items.filter(elt => !stringifiedPayload.includes(JSON.stringify(elt)))

                state.items = [...newValue]
                state.filteredItems = [...newValue]
            } else {
                state.items.splice(payload, 1)
                state.filteredItems.splice(payload, 1)
            }
        },

        update(state, payload) {
            const { index, ...data } = payload
            Object.assign(state.items[index], { ...data })
            Object.assign(state.filteredItems[index], { ...data })
        },
        setFilter(state, value) {
            state.filter = value
        },
        setFilteredItems(state, value) {
            state.filteredItems = [...value]
        },
        setSelectedRows(state, value) {
            state.selected = value
        },
    },
    actions: {
        addNewRole({ commit }, { role_name, role_permission }) {
            commit('add', { role_name, role_permission })
        },
        removeRole({ commit }, payload) {

            commit('delete', payload)
        },
        updateRole({ commit }, payload) {
            commit('update', payload)
        },
        updateFilter({ commit }, value) {
            commit('setFilter', value)
        },
        updateFilteredItems({ commit }, value) {
            commit('setFilteredItems', value)
        },
        updateSelectedRows({ commit }, value) {
            commit('setSelectedRows', value)
        }
    }


}