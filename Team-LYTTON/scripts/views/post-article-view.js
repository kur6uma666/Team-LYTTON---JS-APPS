var app = app || {};

app.postArticle = (function(){
    function PostArticle(selector, data) {
        var deffer = Q.defer();

        $.get('templates/post-article.html', function(template) {
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
            return PostArticle(selector, data);
        }
    }
})();