var app = app || {};

app.blogView = (function(){
    function BlogView(selector, data) {
        var defer = Q.defer();
        $.get('templates/blog-view.html', function(template) {
            var temp = Handlebars.compile(template);
            var html = temp(data);
            $(selector).append(html);
        }).success(function(data) {
            defer.resolve(data);
        }).error(function(error) {
            defer.reject(error);
        });

        return defer.promise;
    }

    return {
        load: function (selector, data) {
            return BlogView(selector, data);
        }
    }
}());
