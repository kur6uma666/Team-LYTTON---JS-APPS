var app = app || {};
(function () {

    var controller = app.controller.get();

    app.router = Sammy(function () {
        var selector = '#wrapper';

        this.get('#/', function () {
            $(selector).html('main');
        });

        this.get('#/login', function () {
            controller.getLoginPage(selector);
        });

        this.get('#/register', function () {
            $(selector).html('reg');
        });

        this.get('#/blog', function () {
            $(selector).html('blog');
        });

    });
    app.router.run('#/');
})();



