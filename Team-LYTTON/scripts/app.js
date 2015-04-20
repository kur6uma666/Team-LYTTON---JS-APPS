var app = app || {};
(function () {

    var controller = app.controller.get();

    app.router = Sammy(function () {
        var selector = '#wrapper';

        this.get('#/', function () {
            controller.getHomePage(selector);
        });

        this.get('#/login', function () {
            controller.getLoginPage(selector);
        });

        this.get('#/register', function () {
            controller.getRegisterPage(selector);
        });

        this.get('#/blog', function () {
            $(selector).html('blog');
        });

    });
    app.router.run('#/');
})();