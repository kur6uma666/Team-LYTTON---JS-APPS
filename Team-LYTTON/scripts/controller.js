var app = app || {};

app.controller = (function () {

    function Controller(model) {
        this.model = model;
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
            _this.model.user.logIn(username, password)
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
            _this.model.user.logOut()
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
            }, function(error) {
                console.log(error.responseText);
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
            _this.model.user.updateUser(data)
                 .then(function(data) {
                    window.location.replace('#/');
                    Noty.success('Profile edited successfully.');
                }, function(error) {
                    Noty.error(JSON.parse(error.responseText).error);
                });

        });

    };

    Controller.prototype.getRegisterPage = function (selector) {
        var _this = this;
        app.registerView.load(selector)
            .then(function () {
                _this.attachRegisterEvents('#registerButton')
            }, function (error) {
                console.log(error.responseText);
            })
    };

    Controller.prototype.attachRegisterEvents = function (selector) {
        var _this = this;
        $(selector).click(function () {
            var data = {
                username: $("input[id=username]").val(),
                password: $("input[id=password]").val(),
                email: $("input[id=email]").val()

            };
            _this.model.user.register(data)
                .then(function (registerData) {
                    Noty.success('Registration Successful');
                    sessionStorage['logged-in'] = registerData.sessionToken;
                    window.location.replace('#/');
                }, function (error) {
                    Noty.error(JSON.parse(error.responseText).error);
                })
        });
    };

    Controller.prototype.getBlogPage = function (selector) {
        var _this = this;
        app.blogView.load(selector)
            .then(function () {
                _this.attachBlogEvents('#postArticle')
            }, function (error) {
                console.log(error.responseText);
            })
    };

    Controller.prototype.attachBlogEvents = function(selector) {
        $(selector).click(function() {
            var data = {
                title: $("input[id=title]").val(),
                content: $("textarea[id=content]").val()
                //todo author(pointer to the user)
                //todo tags(array)
            };
            ////todo EXTRACT/MOVE THIS INTO post.js(in models folder, using promises)
            $.ajax({
                method: 'POST',
                headers: {
                    'X-Parse-Application-Id': 'gBxtJ8j1z5sRZhOgtAstvprePygEIvYTxY4VNQOY',
                    'X-Parse-REST-API-Key': 'CLU5dIerpE1k9zX06HiR3RxJQA3Vob2NgJarCl4z',
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(data),
                url: 'https://www.parse.com/1/classes/Post'
            }).done(function(data) {
                ////todo show the article/post
            }).fail(function(error) {
                console.log(error.responseText);
            })
        })
    };

    Controller.prototype.getHomePage = function (selector) {
        app.homeView.load(selector);
    };

    return {
        get: function (model) {
            return new Controller(model);
        }
    }

})();