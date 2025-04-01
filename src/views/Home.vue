<template>
  <div class="home">
    <h1>電話帳アプリ</h1>
    
    <div class="actions">
      <button 
        v-if="!showForm" 
        @click="startAddContact" 
        class="btn-add"
      >
        <font-awesome-icon icon="plus" /> 新しい連絡先を追加
      </button>
    </div>

    <contact-form 
      v-if="showForm" 
      :contact="currentContact"
      @submit="saveContact"
      @cancel="cancelEdit"
    />

    <contact-list 
      :contacts="contacts"
      @edit="startEditContact"
      @delete="deleteContact"
    />
  </div>
</template>

<script>
import ContactList from '@/components/ContactList.vue';
import ContactForm from '@/components/ContactForm.vue';
import { useStore } from 'vuex';
import { computed, ref, reactive } from 'vue';

export default {
  name: 'HomeView',
  components: {
    ContactList,
    ContactForm
  },
  setup() {
    const store = useStore();
    const showForm = ref(false);
    const currentContact = reactive({
      id: null,
      name: '',
      phone: '',
      email: ''
    });
    
    const contacts = computed(() => store.getters.allContacts);
    
    const startAddContact = () => {
      Object.assign(currentContact, {
        id: null,
        name: '',
        phone: '',
        email: ''
      });
      showForm.value = true;
    };
    
    const startEditContact = (contact) => {
      Object.assign(currentContact, contact);
      showForm.value = true;
    };
    
    const saveContact = (contact) => {
      if (contact.id) {
        // 編集の場合
        store.dispatch('updateContact', contact);
      } else {
        // 新規追加の場合
        store.dispatch('addContact', contact);
      }
      
      showForm.value = false;
    };
    
    const deleteContact = (id) => {
      store.dispatch('deleteContact', id);
    };
    
    const cancelEdit = () => {
      showForm.value = false;
    };
    
    return {
      contacts,
      showForm,
      currentContact,
      startAddContact,
      startEditContact,
      saveContact,
      deleteContact,
      cancelEdit
    };
  }
}
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.actions {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.btn-add {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
}
</style> 