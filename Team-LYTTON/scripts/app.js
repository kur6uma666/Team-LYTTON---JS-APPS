var app = app || {};
(function () {

    app.router = Sammy(function () {
        var selector = '#wrapper';

        this.get('#/', function () {
            $(selector).html('main');
        });

        this.get('#/login', function () {
            $(selector).html('login');
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



