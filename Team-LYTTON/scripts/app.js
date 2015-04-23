var app = app || {};
(function () {
    var baseURL = 'https://api.parse.com/1/';
    var ajaxRequester = app.requester.get(baseURL);
    var models = app.model.get(baseURL, ajaxRequester);
    var controller = app.controller.get(models);

    app.router = Sammy(function () {
        var selector = '#wrapper';
        var menuSelector = 'nav';
        var sidebarSelector = '#sidebar';

        this.get('#/about', function () {
            controller.loadMenu(menuSelector);
            controller.getSidebar(sidebarSelector);
            controller.getHomePage(selector);
        });

        this.get('#/login', function () {
            controller.loadMenu(menuSelector);
            controller.getSidebar(sidebarSelector);
            controller.getLoginPage(selector);
        });

        this.get('#/register', function () {
            controller.loadMenu(menuSelector);
            controller.getSidebar(sidebarSelector);
            controller.getRegisterPage(selector);
        });

        this.get('#/blog', function () {
            controller.loadMenu(menuSelector);
            controller.getSidebar(sidebarSelector);
            controller.getBlogPage(selector);
        });

        this.get('#/userProfile', function () {
            controller.loadMenu(menuSelector);
            controller.getSidebar(sidebarSelector);
            controller.getProfilePage(selector);
        });

        this.get('#/post/:id', function () {
            controller.loadMenu(menuSelector);
            controller.getSidebar(sidebarSelector);
            controller.getPostPage(this.params['id'], selector);
        });

        this.get('#/user/:id', function () {
            controller.loadMenu(menuSelector);
            controller.getSidebar(sidebarSelector);
            controller.getUserPage(this.params['id'], selector);
        });
    });

    app.router.run('#/blog');
})();