var app = app || {};

app.registerView = (function(){
    function RegisterView(selector) {
        var defer = Q.defer();

        $.get('templates/register.html', function(template) {
            var output = Mustache.render(template);
            $(selector).html(output);

        }).done(function(data) {
            defer.resolve(data);
        }).fail(function (error) {
            defer.reject(error);
        });

        return defer.promise;
    }

    return {
        load: function (selector, data) {
            return RegisterView(selector, data);
        }
    }
})();