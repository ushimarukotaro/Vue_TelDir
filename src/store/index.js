import { createStore } from 'vuex'

export default createStore({
  state: {
    contacts: [],
    nextId: 1
  },
  mutations: {
    ADD_CONTACT(state, contact) {
      contact.id = state.nextId++;
      state.contacts.push(contact);
    },
    UPDATE_CONTACT(state, updatedContact) {
      const index = state.contacts.findIndex(contact => contact.id === updatedContact.id);
      if (index !== -1) {
        state.contacts.splice(index, 1, updatedContact);
      }
    },
    DELETE_CONTACT(state, contactId) {
      state.contacts = state.contacts.filter(contact => contact.id !== contactId);
    }
  },
  actions: {
    addContact({ commit }, contact) {
      commit('ADD_CONTACT', contact);
    },
    updateContact({ commit }, contact) {
      commit('UPDATE_CONTACT', contact);
    },
    deleteContact({ commit }, contactId) {
      commit('DELETE_CONTACT', contactId);
    }
  },
  getters: {
    allContacts: state => state.contacts
  }
}) 