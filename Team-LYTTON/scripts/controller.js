var app = app || {};

app.controller = (function () {

    function Controller(model) {
        this.model = model;
    }

    Controller.prototype.getLoginPage = function(selector) {
        var _this = this;
        app.loginView.load(selector)
            .then(function () {
                _this.attachLoginEvents('#loginButton');
            })
    };

    Controller.prototype.attachLoginEvents = function(selector) {
        var _this = this;
        $(selector).click(function(event) {
            var username = ($("input[id=username]").val());
            var password =  ($("input[id=password]").val());
            _this.model.logIn(username, password)
                .then(function (loginData) {
                    sessionStorage['logged-in'] = loginData.sessionToken;
                    window.location.replace('#/');
                },
                function (errorData) {
                    console.log(errorData);
                });
        });
    };

    Controller.prototype.getRegisterPage = function(selector) {
        app.registerView.load(selector);
    };

    Controller.prototype.getHomePage = function(selector) {
        app.homeView.load(selector);
    };

    Controller.prototype.getBlogPage = function (selector) {
        this.model.getUsers()
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