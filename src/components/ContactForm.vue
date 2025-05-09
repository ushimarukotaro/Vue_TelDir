<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <div class="card">
          <div class="card-header">
            <h3>{{ formTitle }}</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="submitForm">
              <div class="mb-3">
                <label for="name" class="form-label">氏名</label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  class="form-control"
                >
                <div v-if="errors.name" class="text-danger">{{ errors.name }}</div>
              </div>

              <div class="mb-3">
                <label for="phone" class="form-label">電話番号</label>
                <input
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  class="form-control"
                >
                <div v-if="errors.phone" class="text-danger">{{ errors.phone }}</div>
              </div>

              <div class="mb-3">
                <label for="email" class="form-label">メールアドレス</label>
                <input
                  id="email"
                  v-model="form.email"
                  type="text"
                  class="form-control"
                >
                <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
              </div>

              <div class="mb-3">
                <label for="group" class="form-label">グループ</label>
                <select
                  id="group"
                  v-model="form.groupId"
                  class="form-select"
                >
                  <option :value="null">選択なし</option>
                  <option v-for="group in groups" :key="group.id" :value="group.id">
                    {{ group.name }}
                  </option>
                </select>
              </div>

              <div class="d-flex justify-content-between">
                <button type="button" class="btn btn-secondary" @click="closeForm">キャンセル</button>
                <button type="submit" class="btn btn-primary">保存</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { useToast } from '../composables/useToast'

export default {
  name: 'ContactForm',
  props: {
    mode: {
      type: String,
      default: 'add',
      validator: value => ['add', 'edit'].includes(value)
    },
    contactId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      form: {
        name: '',
        phone: '',
        email: '',
        groupId: null
      },
      errors: {
        name: '',
        phone: '',
        email: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      groups: 'getAllGroups',
      getContactById: 'getContactById'
    }),
    formTitle() {
      return this.mode === 'add' ? '連絡先登録' : '連絡先編集'
    }
  },
  setup() {
    const { showToast } = useToast()
    return { showToast }
  },
  methods: {
    closeForm() {
      this.$router.push('/')
    },
    validate() {
      let isValid = true
      this.errors = {
        name: '',
        phone: '',
        email: ''
      }

      if (!this.form.name) {
        this.errors.name = '氏名を入力してください'
        isValid = false
      }

      if (!this.form.phone) {
        this.errors.phone = '電話番号を入力してください'
        isValid = false
      } else if (!/^\d{2,4}-\d{2,4}-\d{3,4}$/.test(this.form.phone)) {
        this.errors.phone = '電話番号の形式が正しくありません（例：090-1234-5678）'
        isValid = false
      }

      if (!this.form.email) {
        this.errors.email = 'メールアドレスを入力してください'
        isValid = false
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email)) {
        this.errors.email = 'メールアドレスの形式が正しくありません'
        isValid = false
      }

      return isValid
    },
    async submitForm() {
      if (!this.validate()) {
        return
      }

      if (this.mode === 'add') {
        await this.$store.dispatch('addContact', { ...this.form })
        this.showToast('連絡先を追加しました')
      } else {
        await this.$store.dispatch('updateContact', {
          id: this.contactId,
          ...this.form
        })
        this.showToast('連絡先を更新しました')
      }

      this.$router.push('/')
    }
  },
  created() {
    if (this.mode === 'edit' && this.contactId) {
      const numericId = Number(this.contactId)
      const contact = this.getContactById(numericId)
      if (contact) {
        this.form = { ...contact }
      } else {
        this.$store.dispatch('loadContacts').then(() => {
          const contact = this.getContactById(numericId)
          if (contact) {
            this.form = { ...contact }
          }
        })
      }
    }
    this.$store.dispatch('loadGroups')
  }
}
</script>
