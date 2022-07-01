<template>
<v-dialog v-model="dialog" max-width="800px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
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
                      <v-text-field v-model="inputContent.title" @click="resetTitle"
                        :rules="[(v) => !!v || 'Title is required']" label="Title" required>
                      </v-text-field>
                      <v-text-field v-model="inputContent.description" @click="resetDescription"
                        :rules="[(v) => !!v || 'Description is required']" label="Description" required></v-text-field>
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