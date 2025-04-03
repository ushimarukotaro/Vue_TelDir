import { createStore } from 'vuex'

export default createStore({
  state: {
    contacts: [],
    groups: []
  },
  getters: {
    getAllContacts(state) {
      return state.contacts
    },
    getAllGroups(state) {
      return state.groups
    },
    getContactsByGroup: (state) => (groupId) => {
      return state.contacts.filter(contact => contact.groupId === groupId)
    },
    getContactById: state => id => {
      return state.contacts.find(contact => contact.id === id)
    },
    getGroupById: state => id => {
      return state.groups.find(group => group.id === id)
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
    },
    setGroups(state, groups) {
      state.groups = groups
    },
    addGroup(state, group) {
      state.groups.push(group)
    },
    updateGroup(state, updatedGroup) {
      const index = state.groups.findIndex(g => g.id === updatedGroup.id)
      if (index !== -1) {
        state.groups.splice(index, 1, updatedGroup)
      }
    },
    deleteGroup(state, groupId) {
      state.groups = state.groups.filter(g => g.id !== groupId)
    }
  },
  actions: {
    loadContacts({ commit }) {
      return new Promise((resolve) => {
        const savedContacts = localStorage.getItem('contacts')
        if (savedContacts) {
          commit('setContacts', JSON.parse(savedContacts))
        }
        resolve()
      })
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
      return newContact
    },
    updateContact({ commit, dispatch }, contact) {
      commit('updateContact', contact)
      dispatch('saveContacts')
    },
    deleteContact({ commit, dispatch }, contactId) {
      commit('deleteContact', contactId)
      dispatch('saveContacts')
    },
    loadGroups({ commit }) {
      return new Promise((resolve) => {
        const savedGroups = localStorage.getItem('groups')
        if (savedGroups) {
          commit('setGroups', JSON.parse(savedGroups))
        }
        resolve()
      })
    },
    saveGroups({ state }) {
      localStorage.setItem('groups', JSON.stringify(state.groups))
    },
    addGroup({ commit, dispatch }, group) {
      const newGroup = {
        ...group,
        id: Date.now()
      }
      commit('addGroup', newGroup)
      dispatch('saveGroups')
      return newGroup
    },
    updateGroup({ commit, dispatch }, group) {
      commit('updateGroup', group)
      dispatch('saveGroups')
    },
    deleteGroup({ commit, dispatch, state }, groupId) {
      // グループ削除時に所属する連絡先も更新
      const contactsToUpdate = state.contacts.filter(c => c.groupId === groupId)
      contactsToUpdate.forEach(contact => {
        dispatch('updateContact', { ...contact, groupId: null })
      })

      commit('deleteGroup', groupId)
      dispatch('saveGroups')
    },
    getContactById({ getters, state, dispatch }, id) {
      let contact = getters.getContactById(id)
      if (!contact && state.contacts.length === 0) {
        // まだ連絡先がロードされていない場合
        return dispatch('loadContacts').then(() => {
          return getters.getContactById(id) || null
        })
      }
      return contact || null
    },
    getGroupById({ getters, state, dispatch }, id) {
      let group = getters.getGroupById(id)
      if (!group && state.groups.length === 0) {
        return dispatch('loadGroups').then(() => {
          return getters.getGroupById(id) || null
        })
      }
      return group || null
    }
  }
})
