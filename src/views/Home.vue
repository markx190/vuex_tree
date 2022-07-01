<template>
  <div class="home">
    <ContentPage msg="Welcome to Your Vue.js App" />
  </div>
  
</template>

<script>
// @ is an alias to /src
import ContentPage from '@/components/ContentPage.vue'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  components: {
    ContentPage
  }
}
</script>
