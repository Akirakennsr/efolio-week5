<template>
  <pre>{{ jsondata }}</pre>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      jsondata: null,
      errorMsg: '',
    }
  },
  mounted() {
    this.getBookCountAPI();
  },  
  methods: {
    async getBookCountAPI() {
      try {
        const response = await axios.get('https://countbooks-qxu2guc3ya-uc.a.run.app')
        this.jsondata = response.data;
        this.errorMsg = '';
      } catch (error) {
        console.error('Error fetching book count:', error);
        this.errorMsg = error;
        this.count = null;
      }
    }
  }
}
</script>