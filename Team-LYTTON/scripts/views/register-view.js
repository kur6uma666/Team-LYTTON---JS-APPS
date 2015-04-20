var app = app || {};

app.registerView = (function(){
    function RegisterView(selector) {
        var defer = Q.defer();

        $.get('templates/register.html', function(template) {
            var output = Mustache.render(template);
            $(selector).html(output);

        }).success(function(data) {
            defer.resolve(data);
        }).error(function (error) {
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
