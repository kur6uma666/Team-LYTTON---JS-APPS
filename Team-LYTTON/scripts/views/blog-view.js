var app = app || {};

app.blogView = (function(){
    function BlogView(selector, data) {
        var deffer = Q.defer();

        $.get('templates/blog.html', function(template) {
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
            return BlogView(selector, data);
        }
    }
})();