var app = app || {};
(function () {
    var model = app.userModel.get('https://api.parse.com/1/');
    var controller = app.controller.get(model);

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
            controller.getBlogPage(selector);
        });

    });
    app.router.run('#/');
})();