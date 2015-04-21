var app = app || {};

app.dataModel = (function(){
   function DataModel(baseUrl, ajaxRequester){
       this.users = new UserModel(baseUrl, ajaxRequester);
       this.posts = new PostModel(baseUrl, ajaxRequester);
   }

   var UserModel = (function () {
       function UserModel(baseUrl, ajaxRequester) {
           this._requester = ajaxRequester;
           this.users = {
               users: []
           };
       }

       UserModel.prototype.logIn = function(username, password) {
           var defer = Q.defer();
           this._requester.get('login?username=' + username + '&password=' + password)
               .then(function(data) {
                   defer.resolve(data);
               }, function(error) {
                   defer.reject(error);
               });
           return defer.promise;
       };

       UserModel.prototype.logOut = function(){
           var defer = Q.defer();
           this._requester.post('logout')
               .then(function(data) {
                   defer.resolve(data);
               }, function(error) {
                   defer.reject(error);
               });
           return defer.promise;
       };

       UserModel.prototype.register = function(data) {
           var defer = Q.defer();
           this._requester.post('users', data)
               .then(function(data) {
                   defer.resolve(data);
               }, function(error) {
                   defer.reject(error);
               });
           return defer.promise;
       };

       UserModel.prototype.updateUser = function(data) {
           var defer = Q.defer();
           this._requester.put('users', data)
               .then(function(data) {
                    defer.resolve(data);
                }, function(error) {
                    defer.reject(error);
                });
           return defer.promise;
       };

       UserModel.prototype.getUsers = function () {
           var defer = Q.defer();
           var _this = this;
           this.users['users'].length = 0;

           this._requester.get('users')
               .then(function (data) {
                   data['results'].forEach(function(dataUser) {
                       var user = {
                           'objectId': dataUser.objectId,
                           'username': dataUser.username,
                           'password': dataUser.password,
                           'email': dataUser.email
                       };
                       _this.users['users'].push(user);
                   });

                   defer.resolve(_this.users);
               }, function (error) {
                   defer.reject(error);
               });

           return defer.promise;
       };


       return UserModel;
   }());

   var PostModel = (function(){
       function PostModel(baseUrl, ajaxRequester){
           this._requester = ajaxRequester;
           this._posts = {
               posts: []
           }
       }

       return PostModel;
   }());

   return{
       get: function(baseUrl, ajaxRequester){
           return new DataModel(baseUrl, ajaxRequester);
       }
   }
}());
