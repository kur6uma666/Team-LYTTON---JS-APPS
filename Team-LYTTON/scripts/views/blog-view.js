var app = app || {};

app.blogView = (function(){
    function BlogView(selector, data) {
        var defer = Q.defer();
        $.get('templates/blog-view.html', function(template) {
            console.log(data);
            var temp = Handlebars.compile(template);
            var html = temp(data);
            $(selector).append(html);
        }).success(function(_data) {
            defer.resolve(_data);
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
