<template>
  <div class="contact-list">
    <h2>連絡先一覧</h2>
    <div v-if="contacts.length === 0" class="empty-message">
      連絡先がありません。新しい連絡先を追加してください。
    </div>
    <ul v-else class="contacts">
      <li v-for="contact in contacts" :key="contact.id">
        <contact-item 
          :contact="contact" 
          @edit="$emit('edit', contact)"
          @delete="$emit('delete', contact.id)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import ContactItem from './ContactItem.vue';

export default {
  name: 'ContactList',
  components: {
    ContactItem
  },
  props: {
    contacts: {
      type: Array,
      required: true
    }
  },
  emits: ['edit', 'delete']
}
</script>

<style scoped>
.contact-list {
  margin: 20px 0;
}

.contacts {
  list-style: none;
  padding: 0;
}

.empty-message {
  text-align: center;
  color: #666;
  margin: 20px 0;
}
</style> 