<template>
  <div class="contact-item">
    <div class="contact-info">
      <h3>{{ contact.name }}</h3>
      <div class="contact-details">
        <p><font-awesome-icon icon="phone" /> {{ contact.phone }}</p>
        <p><font-awesome-icon icon="envelope" /> {{ contact.email }}</p>
      </div>
    </div>
    <div class="contact-actions">
      <button @click="$emit('edit')" class="btn-edit" title="編集">
        <font-awesome-icon icon="edit" />
      </button>
      <button @click="confirmDelete" class="btn-delete" title="削除">
        <font-awesome-icon icon="trash" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactItem',
  props: {
    contact: {
      type: Object,
      required: true
    }
  },
  emits: ['edit', 'delete'],
  methods: {
    confirmDelete() {
      if (confirm(`${this.contact.name}の連絡先を削除してもよろしいですか？`)) {
        this.$emit('delete');
      }
    }
  }
}
</script>

<style scoped>
.contact-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 4px;
  margin-bottom: 10px;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.contact-info {
  flex: 1;
}

.contact-info h3 {
  margin: 0 0 5px;
  font-size: 18px;
}

.contact-details {
  color: #666;
}

.contact-details p {
  margin: 5px 0;
  display: flex;
  align-items: center;
}

.contact-details svg {
  margin-right: 8px;
  width: 16px;
}

.contact-actions {
  display: flex;
  gap: 8px;
}

.btn-edit, .btn-delete {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  padding: 5px 8px;
  border-radius: 4px;
}

.btn-edit {
  color: #2196F3;
}

.btn-delete {
  color: #F44336;
}

.btn-edit:hover, .btn-delete:hover {
  background-color: #f5f5f5;
}
</style> 