var app = app || {};

app.registerView = (function(){
    function RegisterView(selector, data) {
        var deffer = Q.defer();

        $.get('templates/register.html', function(template) {
            var output = Mustache.render(template);
            $(selector).html(output);

        }).success(function(data) {
            deffer.resolve(data);
        }).error(function (error) {
            deffer.reject(error);
        });

        return deffer.promise;
    }

    return {
        load: function (selector, data) {
            return RegisterView(selector, data);
        }
    }
})();
