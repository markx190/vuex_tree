<template>
  <div v-if="currentContent" class="edit-form py-3">
  <v-btn color="secondary" small @click="goToContent" midi-arrow-left>
        Back
      </v-btn>
    <p class="headline">Edit Content</p>
    <v-form ref="form" lazy-validation>
      <v-text-field v-model="currentContent.title" :rules="[(v) => !!v || 'Title is required']" label="Title" required>
      </v-text-field>
      <v-text-field v-model="currentContent.description" :rules="[(v) => !!v || 'Description is required']"
        label="Description" required></v-text-field>
      <label><strong>Status:</strong></label>
      {{ currentContent.published ? "Published" : "Pending" }}
      <v-divider class="my-5"></v-divider>
      <v-btn v-if="currentContent.published" @click="updatePublished(false)" color="primary" small class="mr-2">
        UnPublish
      </v-btn>
      <v-btn v-else @click="updatePublished(true)" color="primary" small class="mr-2">
        Publish
      </v-btn>
      <v-btn color="error" small class="mr-2" @click="deleteContent">
        Delete
      </v-btn>
      <v-btn color="success" small @click="updateContent">
        Update
      </v-btn>
    </v-form>
    <p class="mt-3">{{ message }}</p>
  </div>
  <div v-else>
    <p>Please click on a Content...</p>
  </div>
</template>
<script>
import ContentDataService from "../services/ContentDataService";
export default {
  name: "content-item",
  data() {
    return {
      currentContent: null,
      message: "",
    };
  },
  methods: {
    getContent(id) {
      ContentDataService.get(id)
        .then((response) => {
          this.currentContent = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updatePublished(status) {
      var data = {
        id: this.currentContent.id,
        title: this.currentContent.title,
        description: this.currentContent.description,
        published: status,
      };
      ContentDataService.update(this.currentContent.id, data)
        .then((response) => {
          this.currentContent.published = status;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updateContent() {
      ContentDataService.update(this.currentContent.id, this.currentContent)
        .then((response) => {
          console.log(response.data);
          this.message = "The Content was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteContent() {
      ContentDataService.delete(this.currentContent.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "contents" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    goToContent(){
    this.$router.push('/contents'); 
      }
  },
  mounted() {
    this.message = "";
    this.getContent(this.$route.params.id);
  },
};
</script>
<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>