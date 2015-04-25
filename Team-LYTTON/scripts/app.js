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
            initLoad();
            controller.getHomePage(selector);
        });

        this.get('#/login', function () {
            initLoad();
            controller.getLoginPage(selector);
        });

        this.get('#/register', function () {
            initLoad();
            controller.getRegisterPage(selector);
        });

        this.get('#/blog', function () {
            initLoad();
            controller.getBlogPage(selector);
        });

        this.get('#/userProfile', function () {
            initLoad();
            controller.getProfilePage(selector);
        });

        this.get('#/post/:id', function () {
            initLoad();
            controller.getPostPage(this.params['id'], selector);
        });

        this.get('#/user/:id', function () {
            initLoad();
            controller.getUserPage(this.params['id'], selector);
        });

        this.get('#/tag/:id', function () {
            initLoad();
            controller.getTagPage(this.params['id'], selector);
        });

        //this.get('#/blog/page/', function () {
        //    window.location.replace('#/blog/page/1');
        //});
        //
        //this.get('#/blog/page/:page', function () {
        //    var page = this.params['page'];
        //    if(isNaN(page) || parseInt(page) != page || page < 1){
        //        window.location.replace('#/blog/page/1');
        //    } else {
        //        initLoad();
        //        controller.getBlogPage(selector, this.params['page']);
        //    }
        //});

        function initLoad(){
            controller.loadMenu(menuSelector);
            controller.getSidebar(sidebarSelector, 'mostPopularTags', 'Post', 5);
        }
    });

    app.router.run('#/blog');
})();