var app = app || {};

app.controller = (function () {

    function Controller(models) {
        this.models = models;
    }

    Controller.prototype.loadMenu = function (selector) {
        var _this = this;
        if (sessionStorage['logged-in']) {
            app.userMenuView.load(selector)
                .then(function () {
                    _this.attachLogoutEvents('#logoutButton');
                });
        } else {
            app.menuView.load(selector);
        }
    };

    Controller.prototype.getLoginPage = function (selector) {
        var _this = this;
        app.loginView.load(selector)
            .then(function () {
                _this.attachLoginEvents('#loginButton');
            })
    };

    Controller.prototype.attachLoginEvents = function (selector) {
        var _this = this;
        $(selector).click(function () {
            var username = ($("input[id=username]").val());
            var password = ($("input[id=password]").val());
            _this.models.users.logIn(username, password)
                .then(function (loginData) {
                    sessionStorage['logged-in'] = loginData.sessionToken;
                    sessionStorage['id'] = loginData.objectId;
                    window.location.replace('#/');
                    Noty.success('Welcome!');
                },
                function (errorData) {
                    Noty.error(JSON.parse(errorData.responseText).error);
                });
        });
    };

    Controller.prototype.attachLogoutEvents = function (selector) {
        var _this = this;
        $(selector).click(function () {
            _this.models.users.logOut()
                .then(function () {
                    sessionStorage.clear();
                    _this.loadMenu('nav');
                    window.location.replace('#/');
                    Noty.success('Goodbye!');

                },
                function (errorData) {
                    Noty.error(JSON.parse(errorData.responseText).error);
                });

        });
    };

    Controller.prototype.getProfilePage = function (selector) {
        var _this = this;
        app.profileView.load(selector)
            .then(function () {
                _this.attachProfilePageEvents('#editButton');
            })
    };

    Controller.prototype.attachProfilePageEvents = function (selector) {
        var _this = this;

        $(selector).click(function (event) {
            var data = {
                username: $("input[id=username]").val(),
                password: $("input[id=password]").val(),
                email: $("input[id=email]").val()
            };
            $.ajax({
                method: 'PUT',
                headers: {
                    'X-Parse-Application-Id': 'gBxtJ8j1z5sRZhOgtAstvprePygEIvYTxY4VNQOY',
                    'X-Parse-REST-API-Key': 'CLU5dIerpE1k9zX06HiR3RxJQA3Vob2NgJarCl4z',
                    'X-Parse-Session-Token': sessionStorage['logged-in'],
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(data),
                url: 'https://www.parse.com/apps/1/classes/User/' + sessionStorage['id']
            }).done(function (data) {
                console.log(data);
            }).fail(function (error) {
                console.log(error.responseText);
            });

            //todo IT SHOULD BE LIKE THIS!!!!
//            _this.models.users.updateUser(data)
//                 .then(function(data) {
//                    console.log(data);
//                }, function(error) {
//                    console.log(error.responseText);
//                })
        });

    };

    Controller.prototype.getRegisterPage = function (selector) {
        var _this = this;
        app.registerView.load(selector)
            .then(function (data) {
                _this.attachRegisterEvents('#registerButton')
            }, function (error) {
                console.log(error.responseText);
            })
    };

    Controller.prototype.attachRegisterEvents = function (selector) {
        var _this = this;
        $(selector).click(function (event) {
            var data = {
                username: $("input[id=username]").val(),
                password: $("input[id=password]").val(),
                email: $("input[id=email]").val()

            };
            _this.models.users.register(data)
                .then(function (registerData) {
                    Noty.success('Registration Successful');
                    sessionStorage['logged-in'] = registerData.sessionToken;
                    window.location.replace('#/');
                }, function (error) {
                    Noty.error(JSON.parse(error.responseText).error);
                })
        });
    };

    Controller.prototype.getHomePage = function (selector) {
        app.homeView.load(selector);
    };

    Controller.prototype.getBlogPage = function (selector) {
        this.models.users.getUsers()
            .then(function (data) {
                if(sessionStorage['logged-in']){
                    app.blogView.load(selector, data);
                }
                else{
                    //TODO
                }
            }, function (error) {
                console.log(error.responseText);
            })
    };

    return {
        get: function (model) {
            return new Controller(model);
        }
    }

})();