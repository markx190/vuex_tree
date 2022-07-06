<template>
  <v-col cols="12" md="12">
    <template>
      <v-btn color="primary" dark class="mb-2" @click="openForm()">
        <v-icon small class="mr-2">
          mdi-plus
        </v-icon>
        New Content
      </v-btn>
    </template>
    <v-data-table :headers="headers" :items="contents" :search="search" enaable-pagination :hide-default-footer="false"
      class="elevation-1" :loading="loading" loading-text="Loading... Please wait">
      <template v-slot:top>
        <v-snackbar v-model="snackBar" :timeout="timeOut">
          {{ text }}
          <template v-slot:action="{ attrs }">
            <v-btn color="blue" text v-bind="attrs" @click="snackBar = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>
        <v-col cols="12" md="12">
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details
            @clickStatus="updateStatus(false)">
          </v-text-field>
        </v-col>
        <!-- add/edit dialgo -->
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editContent(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteContent(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <template>
      <!-- add/edit content -->
      <v-dialog v-model="dialog" max-width="800px">
        <v-card>
          <v-card-title>
            <span class="text-h6">{{ form }}</span>
          </v-card-title>
          <v-card-text>
            <label style="color: red;">{{ formMessage }}</label>
            <v-container>
              <div>
                <v-form ref="form" @submit="submitForm" v-model="valid" lazy-validation>
                  <v-text-field v-model="currentContent.title" :counter="10" :rules="nameRules" label="Name" required>
                  </v-text-field>
                  <v-text-field v-model="currentContent.description" :counter="10" :rules="nameRules" label="Name"
                    required></v-text-field>
                  <v-checkbox v-if="form == 'Edit Content' || currentContent.published" v-model="checkBox" 
                     :label="`Status: ${checkBox ? 'Published' : 'Pending'}`" >
                  </v-checkbox>
                  <v-btn color="success" ref="submit" class="mr-4" type="submit">
                    Submit
                  </v-btn>
                </v-form>
              </div>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDialog">
              Cancel
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <template>
      <v-dialog v-model="dialogDelete" max-width="800px">
        <v-card>
          <v-card-title class="text-h6">Are you sure you want to delete this content?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDeleteDialog">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="deleteItemConfirm(currentContent.id)">OK</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </v-col>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      search: '',
      title: '',
      dialog: false,
      dialogDelete: false,
      snackBar: false,
      timeOut: 2000,
      text: '',
      formMessage: '',
      checkBoxText: '',
      checkBox: false,
      loading: false,
      currentContent: {
        id: 0,
        title: "",
        description: "",
        published: null
      },
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Content Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      select: null,
      checkbox: false,
      form: "",
      formAction: ""
    }
  },

  computed: {
    ...mapGetters([
      'submitResponse',
      'contents',
      'showEditDialog',
      'statCon',
      'headers',
      'contentStatus'
    ]),

  },
  mounted() {
    this.getContents()
  },

  methods: {
    async getContents() {
      this.loading = true;
      await this.$store.dispatch('getContents');
      this.loading = false;
    },

    async saveContent() {
      let data = {
        id: this.currentContent.id,
        title: this.currentContent.title,
        description: this.currentContent.description
      }

      const result = await this.$store.dispatch('saveContent', data)
      console.log('result :', result)
      console.log(this.submitResponse)
      this.submitResponse == 'form submitted' ? (this.closeDialog(), this.snackBar = true, this.text = 'Content was Submitted') : this.formMessage = this.submitResponse
      this.getContents();
    },

    async editContent(content) {
      console.log('idx: ', content.published)
    
      this.form = "Edit Content"
      this.formAction = "saveEditContent"
      this.currentContent = {
        id: content.id,
        title: content.title,
        description: content.description,
        published: content.published ? this.checkBox == true : false
      }
      this.dialog = true
    },

    openForm() {
      this.dialog = true
      this.form = "Add New Content"
    },
    resetForm() {
      this.$refs.form.reset()
      this.formMessage = ''
    },

    async saveEditContent() {
      console.log('c: ', this.currentContent.published)
      let data = {
        id: this.currentContent.id,
        title: this.currentContent.title,
        description: this.currentContent.description,
        published: this.checkBox
      }
      const result = await this.$store.dispatch('saveEditContent', data)
      console.log('result: ', result)
      this.submitResponse == 'form submitted' ? (this.closeDialog(), this.snackBar = true, this.text = 'Content was Updated') : this.formMessage = this.submitResponse

      this.currentContent = {
        id: 0,
        title: "",
        description: "",
        published: ""
      }
      this.dialog = false;
      this.resetForm()
      this.getContents()
    },

    async deleteContent(content) {
      console.log('delete idx: ', content.id)
      this.currentContent = {
        id: content.id
      }
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      
      await this.$store.dispatch('deleteItemConfirm', this.currentContent.id)
      this.submitResponse == 'form submitted' ? (this.closeDeleteDialog(), this.snackBar = true, this.text = 'Content was Deleted') : ''
     this.getContents()

    },

    closeDialog() {
      this.dialog = false
      this.resetForm()
    },

    closeDeleteDialog() {
      this.dialogDelete = false
    },

    submitForm() {
      this.form == 'Add New Content' ? this.saveContent() : this.saveEditContent()
    }

  },

  watch: {
    dialog(val) {
      val || this.resetForm()
    }
  }

};
</script>