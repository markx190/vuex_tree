<template>
  <div class="col-md-12">
    <div class="card card-container">
      <!-- <img id="profile-img" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" class="profile-img-card" /> -->
      <v-avatar size="90">
        <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="Profile">
      </v-avatar>
      <Form @submit="handleLogin" :validation-schema="schema">
        <div class="form-group">
          <!-- <label for="username">Username</label>
          <Field name="username" type="text" class="form-control" />
          <ErrorMessage name="username" class="error-feedback" /> -->
          <v-text-field v-model="username" :rules="[(v) => !!v || 'Username is required']" label="Username"
             required>
          </v-text-field>
        </div>
        <div class="form-group">
          <!-- <label for="password">Password</label>
          <Field name="password" type="password" class="form-control" />
          <ErrorMessage name="password" class="error-feedback" /> -->
          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Normal with hint text"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Login</span>
          </button>
        </div>
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>
<script>
// import { Form, Field, ErrorMessage } from "vee-validate";
// import * as yup from "yup";
export default {
  name: "Login-View",
  components: {
    // Form,
    // Field,
    // ErrorMessage,
  },
  data() {
    // const schema = yup.object().shape({
    //   username: yup.string().required("Username is required!"),
    //   password: yup.string().required("Password is required!"),
    // });
    return {
      loading: false,
      message: "",
      show1: false,
        password: 'Password',
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => (`The email and password you entered don't match`),
        },
      // schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleLogin(user) {
      this.loading = true;
      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$router.push("/profile");
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
};
</script>
