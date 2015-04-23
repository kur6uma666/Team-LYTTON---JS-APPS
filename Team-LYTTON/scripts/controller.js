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
                    window.location.replace('#/');
                    _this.loadMenu('nav');
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
            _this.model.user.updateUser(sessionStorage['id'], data)
                 .then(function (data) {
                    sessionStorage.clear();
                    window.location.replace('#/');
                    Noty.success('Profile edited successfully.');
                }, function(error) {
                    Noty.error(JSON.parse(error.responseText).error);
                });
        });

        $('#deleteProfileButton').click(function () {
            _this.model.user.deleteUser(sessionStorage['id'])
                 .then(function () {
                    sessionStorage.clear();
                    window.location.replace('#/');
                    _this.loadMenu('nav');
                    Noty.success('Profile deleted successfully.');
                }, function (error) {
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
                    sessionStorage['id'] = registerData.objectId;
                    window.location.replace('#/');
                }, function (error) {
                    Noty.error(JSON.parse(error.responseText).error);
                })
        });
    };

    Controller.prototype.getBlogPage = function (selector) {
        $(selector).empty();
        var _this = this;
        app.postArticle.load(selector)
            .then(function () {
                _this.attachBlogEvents('#postArticle')
            }, function (error) {
                console.log(error.responseText);
            });
        _this.model.post.getPosts()
            .then(function(data) {
                app.blogView.load('#posts',data);

            },function(error) {
                Noty.error(JSON.parse(error.responseText).error);
            })
    };

    Controller.prototype.attachBlogEvents = function(selector) {
        var _this = this;
        $(selector).click(function() {
            var _data = {
                title: $("input[id=title]").val(),
                content: $("textarea[id=content]").val(),
                tags: $("input[id=tags]").val().split(', ')
            };

            _this.model.post.createPost(_data)
                .then(function(data) {
                    $(selector).empty();
                    _this.model.post.getPosts()
                        .then(function(data) {
                            Noty.success('Article posted successfully');
                            app.blogView.load('#posts',data);
                        },function(error) {
                            Noty.error(JSON.parse(error.responseText).error);
                        })

            },function(error) {
                console.log(error.responseText);
            })
        })
    };

    Controller.prototype.getHomePage = function (selector) {
        app.homeView.load(selector);
    };

    Controller.prototype.getSidebar = function(selector){
        $(selector).empty();

        this.model.sidebar.getLatestPosts()
            .then(function(data){
                app.sidebarView.load(selector, data);
            }, function(error){
                console.log(error.responseText);
            });
    };

    return {
        get: function (model) {
            return new Controller(model);
        }
    }

})();