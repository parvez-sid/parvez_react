var axios = require("axios"),
    BASE_URL = process.env.REACT_APP_API_HOST,
    registerURL = "/users/signup",
    loginURL = "/users/login",
    addTaskURL = "/tasks/add",
    tasksURL = "/tasks/get_all",

    ApiHandler = {
        signUp : function(payload, callback) {
          axios.post(BASE_URL + registerURL, payload)
            .then(response => {
              return response;
            })
            .catch(function (error) {
              return error;
            })
            .then(callback);
        },
        
        signIn: function(payload, cb) {
          axios.post(BASE_URL + loginURL, payload)
            .then(res => {
              return res;
            })
            .catch(function(error) {
              return error;
            })
            .then(cb);
        },
        addTask : function(payload, callback) {
          axios.post(BASE_URL + addTaskURL, payload)
            .then(response => {
              return response;
            })
            .catch(function (error) {
              return error;
            })
            .then(callback);
        },
        getTasks : function(cb){
          axios.get(BASE_URL + tasksURL)
          .then(response => {
            return response;
          })
          .catch(function(error) {
            return error;
          })
          .then(cb);
        },
      };
    module.exports = ApiHandler;