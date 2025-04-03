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
                <label for="groupName" class="form-label">グループ名</label>
                <input
                  id="groupName"
                  v-model="form.name"
                  type="text"
                  class="form-control"
                >
                <div v-if="error" class="text-danger">{{ error }}</div>
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
  name: 'GroupForm',
  props: {
    mode: {
      type: String,
      default: 'add',
      validator: value => ['add', 'edit'].includes(value)
    },
    groupId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      form: {
        name: ''
      },
      error: ''
    }
  },
  computed: {
    ...mapGetters({
      getGroupById: 'getGroupById'
    }),
    formTitle() {
      return this.mode === 'add' ? 'グループ作成' : 'グループ編集'
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
      this.error = ''

      if (!this.form.name) {
        this.error = 'グループ名を入力してください'
        return false
      }

      return true
    },
    submitForm() {
      if (!this.validate()) {
        return
      }

      if (this.mode === 'add') {
        this.$store.dispatch('addGroup', { ...this.form })
        this.showToast('グループを追加しました')
      } else {
        this.$store.dispatch('updateGroup', {
          id: Number(this.groupId),
          ...this.form
        })
        this.showToast('グループを更新しました')
      }

      this.closeForm()
    }
  },
  created() {
    if (this.mode === 'edit' && this.groupId) {
      const numericId = Number(this.groupId)
      const group = this.getGroupById(numericId)
      if (group) {
        this.form = { ...group }
      } else {
        this.$store.dispatch('loadGroups').then(() => {
          const group = this.getGroupById(numericId)
          if (group) {
            this.form = { ...group }
          }
        })
      }
    }
  }
}
</script> 