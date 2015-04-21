var app = app || {};

app.menuView = (function(){
    function MenuView(selector, data) {
        var deffer = Q.defer();

        $.get('templates/menu.html', function(template) {
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
            return MenuView(selector, data);
        }
    }
}());
