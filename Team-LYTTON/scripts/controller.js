var app = app || {};

app.controller = (function () {

    function Controller() {

    }

    Controller.prototype.getLoginPage = function(selector) {
        app.loginView.load(selector);
    };


    return {
        get: function() {
            return new Controller();
        }
    }
})();