<template>
  <div class="container mt-4">
    <div class="card">
      <div class="card-header">
        <h3>電話帳データ一覧</h3>
      </div>
      <div class="card-body">
        <div class="row mb-3">
          <div class="col-md-6">
            <div class="input-group">
              <input
              type="text"
              class="form-control"
              placeholder="名前または電話番号で検索"
              v-model="searchQuery"
              >
              <button class="btn btn-outline-secondary" type="button" @click="search"> <i class="bi bi-search me-1"></i></button>
              <button class="btn btn-outline-secondary" type="button" @click="clearSearch"> <i class="bi bi-x-circle me-1"></i></button>
            </div>
          </div>
          <div class="col-md-6">
            <div class="input-group">
              <label class="input-group-text">グループで絞り込み</label>
              <select class="form-select" v-model="selectedGroupId">
                <option :value="null">全て表示</option>
                <option v-for="group in groups" :key="group.id" :value="group.id">
                  {{ group.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <button class="btn btn-primary mb-3" @click="showAddForm">
          <i class="bi bi-plus-circle me-1"></i>新規作成
        </button>

        <table class="table table-sm table-hover" id="contact-table">
          <thead>
            <tr>
              <th>選択</th>
              <th>氏名</th>
              <th>電話番号</th>
              <th>メールアドレス</th>
              <th>グループ</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="contact in contacts" :key="contact.id">
              <td>
                <input type="checkbox" v-model="selectedContacts" :value="contact.id">
              </td>
              <td>{{ contact.name }}</td>
              <td>{{ contact.phone }}</td>
              <td>{{ contact.email }}</td>
              <td>{{ getGroupName(contact.groupId) }}</td>
              <td>
                <button type="button" class="btn btn-sm" @click="editContact(contact)">
                  <i class="bi bi-pencil me-1"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <button class="btn btn-danger" @click="deleteSelected" :disabled="!selectedContacts.length">
          <i class="bi bi-trash me-1"></i>削除
        </button>
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
      selectedContacts: [],
      searchQuery: '',
      filteredContacts: [],
      selectedGroupId: null
    }
  },
  computed: {
    ...mapGetters({
      allContacts: 'getAllContacts',
      groups: 'getAllGroups',
      getContactsByGroup: 'getContactsByGroup'
    }),
    contacts() {
      let result = this.allContacts

      // グループでフィルタリング
      if (this.selectedGroupId !== null) {
        result = this.getContactsByGroup(this.selectedGroupId)
      }

      // 検索でフィルタリング
      if (this.filteredContacts.length > 0) {
        const filteredIds = this.filteredContacts.map(c => c.id)
        result = result.filter(contact => filteredIds.includes(contact.id))
      }

      return result
    }
  },
  methods: {
    showAddForm() {
      this.$router.push('/contact/add')
    },
    editContact(contact) {
      this.$router.push(`/contact/edit/${contact.id}`)
    },
    deleteSelected() {
      if (confirm('選択した連絡先を削除しますか？')) {
        this.selectedContacts.forEach(contactId => {
          this.$store.dispatch('deleteContact', contactId)
        })
        this.selectedContacts = []
      }
    },
    search() {
      if (!this.searchQuery.trim()) {
        this.filteredContacts = []
        return
      }
      
      const query = this.searchQuery.toLowerCase()
      this.filteredContacts = this.allContacts.filter(contact => {
        return contact.name.toLowerCase().includes(query) ||
        contact.phone.includes(query) ||
        contact.email.toLowerCase().includes(query)
      })
    },
    clearSearch() {
      this.searchQuery = ''
      this.filteredContacts = []
    },
    getGroupName(groupId) {
      if (!groupId) return ''
      const group = this.groups.find(g => g.id === groupId)
      return group ? group.name : ''
    }
  },
  watch: {
    selectedGroupId() {
      // グループ選択が変わったら検索をリセット
      this.filteredContacts = []
      this.searchQuery = ''
    }
  },
  created() {
    this.$store.dispatch('loadContacts')
    this.$store.dispatch('loadGroups')
  }
}
</script>
