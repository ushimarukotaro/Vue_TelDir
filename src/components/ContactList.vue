<template>
  <div class="container mt-4">
    <div class="card">
      <div class="card-header">
        <h3>電話帳データ一覧</h3>
      </div>
      <div class="card-body">
        <button class="btn btn-primary mb-3" @click="showAddForm">新規作成</button>

        <table class="table table-sm  table-hover" id="contact-table">
          <thead>
            <tr>
              <th class="text-center">選択</th>
              <th class="text-center">氏名</th>
              <th class="text-center">電話番号</th>
              <th class="text-center">メールアドレス</th>
              <th class="text-center">編集</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="contact in contacts" :key="contact.id">
              <td class="text-center">
                <input type="checkbox" v-model="selectedContacts" :value="contact.id">
              </td>
              <td>{{ contact.name }}</td>
              <td>{{ contact.phone }}</td>
              <td>{{ contact.email }}</td>
              <td class="text-center">
                <button type="button" class="btn btn-secondary btn-sm" @click="editContact(contact)">編集</button>
              </td>
            </tr>
            <ContactItem
              v-for="contact in contacts"
              :key="contact.id"
              :contact="contact"
              :selected="selectedContacts.includes(contact.id)"
              @selection-changed="toggleSelection"
              @edit="editContact"
            />
          </tbody>
        </table>

        <button class="btn btn-danger" @click="deleteSelected" :disabled="!selectedContacts.length">削除</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ContactList',
  data() {
    return {
      selectedContacts: []
    }
  },
  computed: {
    ...mapGetters({
      contacts: 'getAllContacts'
    })
  },
  methods: {
    showAddForm() {
      this.$emit('show-form', { mode: 'add' })
    },
    editContact(contact) {
      this.$emit('show-form', { mode: 'edit', contact })
    },
    deleteSelected() {
      if (confirm('選択した連絡先を削除しますか？')) {
        this.selectedContacts.forEach(contactId => {
          this.$store.dispatch('deleteContact', contactId)
        })
        this.selectedContacts = []
      }
    }
  },
  created() {
    this.$store.dispatch('loadContacts')
  },
  toggleSelection(contactId) {
    const index = this.selectedContacts.indexOf(contactId)
    if (index === -1) {
      this.selectedContacts.push(contactId)
    } else {
      this.selectedContacts.splice(index, 1)
    }
  }
}
</script>
