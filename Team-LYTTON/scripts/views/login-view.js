var app = app || {};

app.loginView = (function(){
    function LoginView(selector, data) {
        $.get('templates/login.html', function(template) {
            var output = Mustache.render(template);
            $(selector).html(output);
        })
    }

    return {
        load: function (selector, data) {
            return LoginView(selector, data);
        }
    }
})();
