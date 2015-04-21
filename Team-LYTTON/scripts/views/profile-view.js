var app = app || {};

app.profileView = (function(){
    function ProfileView(selector, data) {
        var deffer = Q.defer();

        $.get('templates/profile-page.html', function(template) {
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
            return ProfileView(selector, data);
        }
    }
}());
