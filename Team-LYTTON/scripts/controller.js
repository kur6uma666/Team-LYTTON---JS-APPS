var app = app || {};

app.controller = (function () {

    function Controller(models) {
        this.models = models;
    }

    Controller.prototype.loadMenu = function(selector) {
        var _this = this;
        if(sessionStorage['logged-in']) {
            app.userMenuView.load(selector)
                .then(function() {
                    _this.attachLogoutEvents('#logoutButton');
                });
        } else {
            app.menuView.load(selector);
        }
    };

    Controller.prototype.attachLogoutEvents = function(selector) {
        var _this = this;
        $(selector).click(function() {
            var token = sessionStorage['logged-in'];
            $.ajax({
               method: 'POST',
               headers: {
                   'X-Parse-Application-Id': 'gBxtJ8j1z5sRZhOgtAstvprePygEIvYTxY4VNQOY',
                   'X-Parse-REST-API-Key': 'CLU5dIerpE1k9zX06HiR3RxJQA3Vob2NgJarCl4z',
                   'X-Parse-Session-Token': token
               },
               url: 'https://api.parse.com/1/logout'

            }).done(function() {
                sessionStorage.clear();
                window.location.replace('#/');
                _this.loadMenu('#menu');
                Noty.success('Goodbye!');
            }).fail(function(error) {
                console.log(error.responseText);
            });

        });
    };

    Controller.prototype.getLoginPage = function(selector) {
        var _this = this;
        app.loginView.load(selector)
            .then(function () {
                _this.attachLoginEvents('#loginButton');
            })
    };


    Controller.prototype.attachLoginEvents = function(selector) {
        var _this = this;
        $(selector).click(function() {
            var username = ($("input[id=username]").val());
            var password =  ($("input[id=password]").val());
            _this.models.users.logIn(username, password)
                .then(function (loginData) {
                    sessionStorage['logged-in'] = loginData.sessionToken;
                    window.location.replace('#/');
                    Noty.success('Welcome!');
                },
                function (errorData) {
                    Noty.error('Login Failed!');
                });
        });
    };

    Controller.prototype.attachRegisterEvents = function(selector) {
        var _this = this;
        $(selector).click(function(event) {
            var data = {
                username:  $("input[id=username]").val(),
                password:  $("input[id=password]").val(),
                email: $("input[id=email]").val()
            };
            _this.models.users.register(data)
               .then(function(registerData) {
                    sessionStorage['logged-in'] = registerData.sessionToken;
                    window.location.replace('#/');
                }, function(error) {
                    console.log(error.responseText);
                })
        });
    };

    Controller.prototype.getRegisterPage = function(selector) {
        var _this = this;
        app.registerView.load(selector)
            .then(function(data) {
                _this.attachRegisterEvents('#registerButton')
            }, function(error) {
                console.log(error.responseText);
            })
    };

    Controller.prototype.getHomePage = function(selector) {
        app.homeView.load(selector);
    };

    Controller.prototype.getBlogPage = function (selector) {
        this.models.users.getUsers()
            .then(function (data) {
                app.blogView.load(selector, data);
            }, function (error) {
                console.log(error.responseText);
            })
    };

    return {
        get: function(model) {
            return new Controller(model);
        }
    }

})();