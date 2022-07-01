<template>
  <v-col cols="12" md="12">
    <v-data-table :headers="headers" :items="contents" :search="search" enaable-pagination :hide-default-footer="false"
      class="elevation-1" :loading="loading" loading-text="Loading... Please wait">
      <template v-slot:top>
        <!-- <v-toolbar-title>CONTENTS</v-toolbar-title> -->
        <v-snackbar v-model="snackBar" :timeout="timeOut">
          {{ text }}
          <template v-slot:action="{ attrs }">
            <v-btn color="blue" text v-bind="attrs" @click="snackBar = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>
        <v-col cols="12" md="12">
          <v-dialog v-model="dialog" max-width="800px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                <v-icon small class="mr-2">
                  mdi-plus
                </v-icon>
                New Content
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h6">Add New Content</span>
              </v-card-title>
              <v-card-text>
                <label style="color: red;">{{ formMessage }}</label>
                <v-container>
                  <v-row>
                    <div>
                      <v-form ref="form" lazy-validation>
                        <v-text-field v-model="inputContent.title" :rules="[(v) => !!v || 'Title is required']"
                          label="Title" @click="resetInput" required>
                        </v-text-field>
                        <v-text-field v-model="inputContent.description"
                          :rules="[(v) => !!v || 'Description is required']" label="Description" @click="resetInput"
                          required>
                        </v-text-field>
                      </v-form>
                    </div>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="saveContent">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details>
          </v-text-field>
        </v-col>
        <!-- edit content -->
        <v-dialog v-model="editDialog" max-width="800px">
          <v-card>
            <v-card-title>
              <span class="text-h6">Edit Content</span>
            </v-card-title>
            <v-card-text>
              <label style="color: red;">{{ formMessage }}</label>
              <v-container>
                <v-row>
                  <div>
                    <v-form ref="form" lazy-validation>
                      <v-text-field v-model="currentContent.title" :rules="[(v) => !!v || 'Title is required']"
                        label="Title" @click="resetInput" required>
                      </v-text-field>
                      <v-text-field v-model="currentContent.description"
                        :rules="[(v) => !!v || 'Description is required']" label="Description" @click="resetInput"
                        required>
                      </v-text-field>
                      {{ currentContent.published == true ? "Published" : "Pending" }}
                      <v-divider class="my-3"></v-divider>
                      <v-checkbox v-if="currentContent.published" v-model="currentContent.published" @click="updateStatus(false)"></v-checkbox>
                      <v-checkbox v-else v-model="currentContent.published" @click="updateStatus(true)"></v-checkbox>

                    </v-form>
                  </div>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeEditDialog">
                Cancel
              </v-btn>
              <v-btn color="blue darken-1" text @click="saveEditContent">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- edit dialgo -->
        <v-dialog v-model="dialogDelete" max-width="800px">
          <v-card>
            <v-card-title class="text-h6">Are you sure you want to delete this content?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDeleteDialog">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm(inputContent.id)">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
      editDialog: false,
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
        description: ""
      },
    }
  },

  computed: {
    ...mapGetters([
      'submitResponse',
      'contents',
      'inputContent',
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
      var data = {
        title: this.inputContent.title,
        description: this.inputContent.description,
        published: this.inputContent.published
      };

      await this.$store.dispatch('saveContent', data)
      console.log(this.submitResponse)
      this.submitResponse == 'form submitted' ? (this.close(), this.snackBar = true, this.text = 'Content was Submitted') : this.formMessage = 'Please complete the following'
    },

    async editContent(content) {
      console.log(content.published)
      this.currentContent = {
        id: content.id,
        title: content.title,
        description: content.description
      }
      this.editDialog = true
    },

    async saveEditContent() {
      console.log('c: ', this.currentContent.published)
      let data = {
        id: this.currentContent.id,
        title: this.currentContent.title,
        description: this.currentContent.description,
        published: this.currentContent.published
      }
      await this.$store.dispatch('saveEditContent', data)
      console.log('submit: ', this.submitResponse)
      this.submitResponse == 'form submitted' ? (this.closeEditDialog(), this.snackBar = true, this.text = 'Content was Updated') : this.formMessage = 'Please complete the following'

      setTimeout(() => {
        this.submitResponse == 'form submitted' ? (window.location.reload()) : null
      }, 2000)

      this.currentContent = {
        id: 0,
        title: "",
        description: "",
        published: ""
      }
      this.editDialog = false;
    },

    async deleteContent(content) {
      console.log('delete idx: ', content.id)
      this.currentContent = {
        id: content.id
      }
      // await this.$store.dispatch('deleteContent', this.currentContent.id)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {

      await this.$store.dispatch('deleteItemConfirm', this.currentContent.id)
      this.submitResponse == 'form submitted' ? (this.closeDeleteDialog(), this.snackBar = true, this.text = 'Content was Deleted') : ''

      setTimeout(() => {
        this.submitResponse == 'form submitted' ? (window.location.reload()) : null
      }, 2000)

    },

    async updateStatus(cStatus) {
      console.log('statusX: ', cStatus)
      var data = {
        id: this.currentContent.id,
        title: this.currentContent.title,
        description: this.currentContent.description,
        published: cStatus ? 'true' : 'false'
      }
       await this.$store.dispatch('updateContentStatus', data)

    },

    close() {
      this.dialog = false
    },
    closeEditDialog() {
      this.editDialog = false
    },
    closeDeleteDialog() {
      this.dialogDelete = false
    },
    resetInput() {
      this.formMessage = ''
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    editDialog(val) {
      val || this.closeEditDialog()
    },
    dialogDelete(val) {
      val || this.closeDeleteDialog()
    },
  }

};
</script>