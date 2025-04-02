import { createStore } from 'vuex'

export default createStore({
  state: {
    contacts: []
  },
  getters: {
    getAllContacts(state) {
      return state.contacts
    }
  },
  mutations: {
    setContacts(state, contacts) {
      state.contacts = contacts
    },
    addContact(state, contact) {
      state.contacts.push(contact)
    },
    updateContact(state, updatedContact) {
      const index = state.contacts.findIndex(c => c.id === updatedContact.id)
      if (index !== -1) {
        state.contacts.splice(index, 1, updatedContact)
      }
    },
    deleteContact(state, contactId) {
      state.contacts = state.contacts.filter(c => c.id !== contactId)
    }
  },
  actions: {
    loadContacts({ commit }) {
      const savedContacts = localStorage.getItem('contacts')
      if (savedContacts) {
        commit('setContacts', JSON.parse(savedContacts))
      }
    },
    saveContacts({ state }) {
      localStorage.setItem('contacts', JSON.stringify(state.contacts))
    },
    addContact({ commit, dispatch }, contact) {
      const newContact = {
        ...contact,
        id: Date.now() // 簡易的なID生成
      }
      commit('addContact', newContact)
      dispatch('saveContacts')
    },
    updateContact({ commit, dispatch }, contact) {
      commit('updateContact', contact)
      dispatch('saveContacts')
    },
    deleteContact({ commit, dispatch }, contactId) {
      commit('deleteContact', contactId)
      dispatch('saveContacts')
    }
  }
})
