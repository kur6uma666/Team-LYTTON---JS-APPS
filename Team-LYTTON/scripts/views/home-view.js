var app = app || {};

app.homeView = (function(){
    function HomeView(selector, data) {
        var deffer = Q.defer();

        $.get('templates/home.html', function(template) {
            var output = Mustache.render(template);
            $(selector).html(output);
        }).done(function(data) {
            deffer.resolve(data);
        }).fail(function(error) {
            deffer.reject(error);
        });

        return deffer.promise;
    }

    return {
        load: function (selector, data) {
            return HomeView(selector, data);
        }
    }
})();
