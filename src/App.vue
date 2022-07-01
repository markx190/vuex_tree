<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img alt="Vuetify Logo" class="shrink mr-2" contain src="./assets/images/uerm_orig.png"
          transition="scale-transition" width="40" />
        <!-- <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        /> -->
        <router-link to="/" style="color:bisque; text-decoration: none;">UERM</router-link>
      </div>
      <v-spacer></v-spacer>
      <v-btn text>
        <span class="mr-2">
          <router-link to="/about" style="color:bisque">About</router-link>
        </span>
      </v-btn>
      <v-btn text>
        <span class="mr-2">
          <router-link to="/contents" style="color:bisque">Contents</router-link>
        </span>
        <!-- <v-icon>mdi-open-in-new</v-icon> -->
      </v-btn>
      <!-- <v-btn text>
        <span class="mr-2">
          <router-link to="/register" style="color:bisque">Sign Up</router-link>
        </span>
      </v-btn>
      <v-btn text>
        <span class="mr-2">
          <router-link to="/login" style="color:bisque">Sign In</router-link>
        </span>

      </v-btn> -->
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
// import FooterView from '..@/views/FooterView.vue'

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
