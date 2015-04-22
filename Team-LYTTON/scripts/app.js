var app = app || {};
(function () {
    var baseURL = 'https://api.parse.com/1/';
    var ajaxRequester = app.requester.get(baseURL);
    var models = app.model.get(baseURL, ajaxRequester);
    var controller = app.controller.get(models);

    app.router = Sammy(function () {
        var selector = '#wrapper';
        var menuSelector = 'nav';

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

        this.get('#/userProfile', function () {
            controller.loadMenu(menuSelector);
            controller.getProfilePage(selector);
        });

    });

    app.router.run('#/');
})();