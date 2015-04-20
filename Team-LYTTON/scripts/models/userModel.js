var app = app || {};

app.userModel = (function () {
    function UserModel(baseUrl) {
        this._requester = app.requester.get(baseUrl);
        this.users = {
            users: []
        };
    }

    UserModel.prototype.getUsers = function () {
        var defer = Q.defer();
        var _this = this;
        this.users['users'].length = 0;

        this._requester.get('classes/User/')
            .then(function (data) {
                data['results'].forEach(function(dataUser) {
                    var user = {
                        'objectId': dataUser.objectId,
                        'username': dataUser.username,
                        'password': dataUser.password,
                        'emailVerified': dataUser.emailVerified,
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


    return {
        get: function (baseUrl) {
            return new UserModel(baseUrl);
        }
    }
}());

