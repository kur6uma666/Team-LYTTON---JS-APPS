var app = app || {};

app.loginView = (function(){
    function LoginView(selector, data) {
        var deffer = Q.defer();

        $.get('templates/login.html', function(template) {
            var output = Mustache.render(template);
            $(selector).html(output);

        }).done(function(data) {
            deffer.resolve(data);
        }).fail(function (error) {
            deffer.reject(error);
        });

        return deffer.promise;
    }

    return {
        load: function (selector, data) {
            return LoginView(selector, data);
        }
    }
}());
