<template>
  <div class="contact-form">
    <h2>{{ isEdit ? '連絡先を編集' : '新しい連絡先' }}</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">氏名</label>
        <input 
          type="text" 
          id="name" 
          v-model="formData.name" 
          required
          placeholder="山田 太郎"
        />
      </div>
      
      <div class="form-group">
        <label for="phone">電話番号</label>
        <input 
          type="tel" 
          id="phone" 
          v-model="formData.phone" 
          required
          placeholder="090-1234-5678"
        />
      </div>
      
      <div class="form-group">
        <label for="email">メールアドレス</label>
        <input 
          type="email" 
          id="email" 
          v-model="formData.email" 
          required
          placeholder="example@example.com"
        />
      </div>
      
      <div class="button-group">
        <button type="submit" class="btn-primary">{{ isEdit ? '更新' : '追加' }}</button>
        <button type="button" class="btn-secondary" @click="$emit('cancel')">キャンセル</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ContactForm',
  props: {
    contact: {
      type: Object,
      default: () => ({
        id: null,
        name: '',
        phone: '',
        email: ''
      })
    }
  },
  emits: ['submit', 'cancel'],
  data() {
    return {
      formData: {
        id: this.contact.id,
        name: this.contact.name,
        phone: this.contact.phone,
        email: this.contact.email
      }
    }
  },
  computed: {
    isEdit() {
      return !!this.contact.id;
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', { ...this.formData });
    }
  },
  watch: {
    contact: {
      handler(newContact) {
        this.formData = { ...newContact };
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.contact-form {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.btn-primary {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-secondary {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
}
</style> 