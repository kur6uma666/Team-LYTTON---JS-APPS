var app = app || {};

app.controller = (function () {

    function Controller() {

    }

    Controller.prototype.getLoginPage = function(selector) {
        app.loginView.load(selector);
    };

    Controller.prototype.getRegisterPage = function(selector) {
        app.registerView.load(selector);
    };

    Controller.prototype.getHomePage = function(selector) {
        app.homeView.load(selector);
    };

    return {
        get: function() {
            return new Controller();
        }
    }

})();