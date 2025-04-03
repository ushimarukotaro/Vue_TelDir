<template>
  <div class="card mt-4">
    <div class="card-header">
      <h3>グループ一覧</h3>
    </div>
    <div class="card-body">
      <button class="btn btn-primary mb-3" @click="showAddForm">
        <i class="bi bi-plus-circle me-1"></i>新規グループ</button>
        
        <div class="table-responsive">
          <table class="table table-sm table-hover">
            <thead>
              <tr>
                <th>選択</th>
                <th>グループ名</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="group in groups" :key="group.id">
                <td>
                  <input type="checkbox" v-model="selectedGroups" :value="group.id">
                </td>
                <td>{{ group.name }}</td>
                <td>
                  <button type="button" class="btn btn-sm" @click="editGroup(group)">
                    <i class="bi bi-pencil me-1"></i></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <button class="btn btn-danger" @click="deleteSelected" :disabled="!selectedGroups.length">
            <i class="bi bi-trash me-1"></i>削除</button>
          </div>
        </div>
      </template>
      
      <script>
      import { mapGetters } from 'vuex'
      
      export default {
        name: 'GroupList',
        data() {
          return {
            selectedGroups: []
          }
        },
        computed: {
          ...mapGetters({
            groups: 'getAllGroups'
          })
        },
        methods: {
          showAddForm() {
            this.$router.push('/group/add')
          },
          editGroup(group) {
            this.$router.push(`/group/edit/${group.id}`)
          },
          deleteSelected() {
            if (confirm('選択したグループを削除しますか？')) {
              this.selectedGroups.forEach(groupId => {
                this.$store.dispatch('deleteGroup', groupId)
              })
              this.selectedGroups = []
            }
          }
        },
        created() {
          this.$store.dispatch('loadGroups')
        }
      }
    </script> 