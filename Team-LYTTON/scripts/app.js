var app = app || {};
(function () {
    var model = app.userModel.get('https://api.parse.com/1/');
    var controller = app.controller.get(model);

    app.router = Sammy(function () {
        var selector = '#wrapper';
        var menuSelector = '#menu';

        this.get('#/', function () {
            controller.loadMenu(menuSelector);
            controller.getHomePage(selector);
        });

        this.get('#/login', function () {
            controller.loadMenu(menuSelector);
            controller.getLoginPage(selector);
        });

        this.get('#/register', function () {
            controller.loadMenu(menuSelector);
            controller.getRegisterPage(selector);
        });

        this.get('#/blog', function () {
            controller.loadMenu(menuSelector);
            controller.getBlogPage(selector);
        });

    });
    app.router.run('#/');
})();