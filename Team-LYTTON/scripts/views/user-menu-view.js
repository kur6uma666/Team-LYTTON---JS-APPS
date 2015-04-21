var app = app || {};

app.userMenuView = (function(){
    function UserMenuView(selector, data) {
        var deffer = Q.defer();

        $.get('templates/user-menu.html', function(template) {
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
            return UserMenuView(selector, data);
        }
    }
}());
