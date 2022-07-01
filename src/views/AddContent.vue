<template>
  <div class="submit-form mt-3">
    <p class="headline">Add Content</p>
    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <v-text-field v-model="content.title" :rules="[(v) => !!v || 'Title is required']" label="Title" required>
        </v-text-field>
        <v-text-field v-model="content.description" :rules="[(v) => !!v || 'Description is required']"
          label="Description" required></v-text-field>
      </v-form>
      <v-btn color="primary" class="mt-3" @click="saveContent">Submit</v-btn>
    </div>
    <div v-else>
      <v-card class="mx-auto">
        <v-card-title>
          Submitted successfully!
        </v-card-title>
        <v-card-subtitle>
          Click the button to add new Content.
        </v-card-subtitle>
        <v-card-actions>
          <v-btn color="success" @click="newContent">Add</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>
<script>
import ContentDataService from "../services/ContentDataService";
export default {
  name: "add-Content",
  data() {
    return {
      content: {
        id: null,
        title: "",
        description: "",
        published: false,
      },
      submitted: false,
    };
  },
  methods: {
    saveContent() {
      var data = {
        title: this.content.title,
        description: this.content.description,
      };
      ContentDataService.create(data)
        .then((response) => {
          this.content.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    newContent() {
      this.submitted = false;
      this.content = {};
    },
  },
};
</script>