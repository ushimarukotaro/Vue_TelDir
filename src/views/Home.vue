<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-lg-12">
        <ContactList />
        <GroupList />
      </div>
    </div>

    <ContactForm
      v-if="showContactForm"
      :mode="formMode"
      :contact="selectedContact"
      @form-closed="showContactForm = false"
    />

    <GroupForm
      v-if="showGroupForm"
      :mode="groupFormMode"
      :group="selectedGroup"
      @form-closed="showGroupForm = false"
    />
  </div>
</template>

<script>
import ContactList from '@/components/ContactList.vue'
import ContactForm from '@/components/ContactForm.vue'
import GroupList from '@/components/GroupList.vue'
import GroupForm from '@/components/GroupForm.vue'

export default {
  name: 'HomeView',
  components: {
    ContactList,
    ContactForm,
    GroupList,
    GroupForm
  },
  data() {
    return {
      showContactForm: false,
      formMode: 'add',
      selectedContact: null,
      showGroupForm: false,
      groupFormMode: 'add',
      selectedGroup: null
    }
  },
  methods: {
    handleShowContactForm({ mode, contact = null }) {
      this.formMode = mode
      this.selectedContact = contact
      this.showContactForm = true
      this.showGroupForm = false
    },
    handleShowGroupForm({ mode, group = null }) {
      this.groupFormMode = mode
      this.selectedGroup = group
      this.showGroupForm = true
      this.showContactForm = false
    }
  }
}
</script>

<style>
.container {
  max-width: 1200px;
}
</style>
