import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)

export default new Vuex.Store(
  {
    state: {
      version: 1, // increase the version when the structure of the storage changes
      words: [],
      studysets: studysetData,
      cards: cardData
    },
    mutations: {
      initStore(state) {
        let storeFromLocalStorage = localStorage.getItem("store");
        if (storeFromLocalStorage) {
          let jsonStorage = JSON.parse(storeFromLocalStorage);
          if (jsonStorage.version === state.version) {
            this.replaceState(
              Object.assign(state, jsonStorage)
            );
          } else {
            // if the version is different, do not restore because a cached store with a different structure can cause trouble
          }
        }
      },
      addPerson (state, person) {
        state.persons.push(person)
      },
      deletePerson (state, person) {
        state.persons = state.persons.filter(obj => obj.id !== person.id)
      }
    }
  }
);

// In the main.js file now import the store and init it:
import store from './vuex-local-store'
new Vue({
  store,
  el: '#app',
  render: h => h(App)
});

/** Use local storeage */
store.commit("initStore");
store.subscribe((_mutation, state) => {
  localStorage.setItem("store", JSON.stringify(state));
});
