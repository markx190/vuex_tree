import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
// import { search } from 'core-js/fn/symbol';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiURL: 'http://localhost:8080/api',
    submitResponse: null,
    statCon: {},
    currentIndex: -1,
    contents: [],
    title: '',
    headers: [
      { text: "Title", align: "start", filterable: true, sortable: false, value: "title" },
      { text: "Description", value: "description", sortable: false },
      { text: "Status", value: "published", sortable: false },
      { text: "Actions", value: "actions", sortable: false }
    ],
    dialog: false,
    editDialog: false,
    showEditDialog: '',
    dialogDelete: false,
    inputContent: {
      id: null,
      title: "",
      description: "",
      published: ""
    },
    submitted: false,
    snackBar: false,
    text: '',
    timeOut: 2000,
    formMessage: '',
    status: {
      published: 1,
      pending: 0
    },
    contentStatus: null
  },

  getters: {
    contents(state) {
      return state.contents
    },
    statCon(state) {
      return state.statCon
    },
    headers(state) {
      return state.headers
    },
    search(state) {
      return state.search
    },
    tableLoading(state) {
      return state.tableLoading
    },
    formMessage(state) {
      return state.formMessage
    },
    inputContent(state) {
      return state.inputContent
    },
    currentContent(state) {
      return state.currentContent
    },
    title(state) {
      return state.title
    },
    dialog(state) {
      return state.dialog
    },
    showEditDialog(state) {
      return state.showEditDialog
    },
    text(state) {
      return state.text
    },
    submitResponse(state) {
      return state.submitResponse
    },
    contentStatus(state) {
      return state.contentStatus
    }
  },

  mutations: {
    addContent(state, payload) {
      state.contents.push(payload);
    },
    setContents(state, contents) {
      state.contents = contents
    },
    statCon(state, statCon) {
      state.statCon = statCon
    },
    setCurrentContent(state, currentContent) {
      state.currentContent = currentContent
    },
    setContentStatus(state, contentStatus) {
      state.contentStatus = contentStatus
    },
    setInputContent(state, inputContent) {
      state.inputContent = inputContent
    },
    setSnackBar(state, snackbar) {
      state.snackbar = snackbar
    },
    setSnackBarText(state, text) {
      state.text = text
    },
    setShowEditDialog(state, showEditDialog) {
      state.showEditDialog = showEditDialog
    },
    setSubmitResponse(state, submitResponse) {
      state.submitResponse = submitResponse
    },
    updateContent(state, payload) {
      for (const i in state.contents) {
        if (state.contents[i].id === payload.id) {
          state.contents[i] = payload;
          break;
        }
      }
    }
  },

  actions: {
    async getContents(context) {
      await new Promise((res) => setTimeout(() => res(), 2000));
      try {
        const response = await axios.get(`${this.state.apiURL}/list`);
        for (const item of response.data) {
          item.published = item.published ? 'Published' : 'Pending'
        }
        context.commit('setContents', response.data)
      } catch (err) {
        console.log(err);
      }

    },

    async saveContent(context, payload) {
      console.log('save data: ', payload)
      await axios.post(`${this.state.apiURL}/list`, payload)
        .then((response) => {
          context.commit('setSubmitResponse', 'form submitted');
          let res = response.status
          // context.commit("addContent", payload);
          context.commit("addContent", response.data)
          console.log('response: ', res)
          this.state.currentContent.published = payload.published ? 'Published' : 'Pending'
        })
        .catch((e) => {
          console.log(e.message);
          this.formMessage = 'Please Complete the Details';
        });
    },

    editContent(context, payload) {
      Promise.all([
        axios.get(`${this.state.apiURL}/list/${payload.id}`),
      ])
        .then(response => {
          context.commit('setCurrentContent', response[0].data)
        })
        .catch(error => {
          console.log(error);
        });
    },

    async saveEditContent(context, payload) {
      // payload.published = payload.published === 'Published' ? true : false;
      await axios.put(`${this.state.apiURL}/list/${payload.id}`, payload)
        .then((response) => {
          console.log('response: ', response)
          context.commit("updateContent", response.data);
          context.commit('setSubmitResponse', 'form submitted')
        })
        .catch((e) => {
          console.log(e.message);
          this.formMessage = 'Please Complete the Details';
        });
    },

    async deleteContent(context, id) {
      await axios.get(`${this.state.apiURL}/list/${id}`)
        .then(response => {
          context.commit('setCurrentContent', response.data)
          console.log('data: ', response.data)
        })
        .catch(error => {
          console.log(error);
        });
    },

    async deleteItemConfirm(context, payload) {
      await axios.delete(`${this.state.apiURL}/list/${payload}`)
        .then((response) => {
          console.log('response: ', response)
          context.commit('setSubmitResponse', 'form submitted')
        })
        .catch((e) => {
          console.log(e.message);
        });
    },

    async updateContentStatus(context, payload) {
      console.log('payload: ', payload.published)
      await axios.put(`${this.state.apiURL}/list/${payload.id}`, payload)
        .then((response) => {
          console.log('response: ', response)
        })
        .catch((e) => {
          console.log(e.message);
        });
    }

  },

  modules: {
  }
});
