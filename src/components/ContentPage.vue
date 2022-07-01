<template>
  <div class="about">
    <template>
      <v-card class="mx-auto my-12" max-width="674">
        <template slot="progress">
          <v-img height="150px" width="290px" src="../assets/images/uerm_orig.png"></v-img>
          <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
        </template>
        <v-card-title>University of the East</v-card-title>
        <v-card-text>
          <v-row class="mx-0">
            <v-rating :value="4.5" color="amber" dense half-increments readonly size="14"></v-rating>
            <div class="grey--text ms-4">
              4.5 (413)
            </div>
          </v-row>
          <div class="my-4 text-subtitle-1">
            PHP • Institution
          </div>
          <div>Elementary, Highschool and College</div>
        </v-card-text>
        <v-divider class="mx-4"></v-divider>
        <v-card-title>Enroll Today</v-card-title>
        <v-card-text>
          <v-chip-group active-class="deep-purple accent-4 white--text" column>
            <v-chip>5:30PM</v-chip>
            <v-chip>7:30PM</v-chip>
            <v-chip>8:00PM</v-chip>
            <v-chip>9:00PM</v-chip>
          </v-chip-group>
        </v-card-text>
        <v-card-actions>
          <v-btn color="deep-purple lighten-2">
            Reserve
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </div>
</template>
