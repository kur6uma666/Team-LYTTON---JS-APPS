var app = app || {};

app.blogView = (function(){
    function BlogView(selector, data) {
        var defer = Q.defer();
        $.get('templates/blog-view.html', function(template) {
            $(selector).empty();
            var output = '';
            for (var i = data['posts'].length-1; i >= 0 ; i--) {
                output += Mustache.to_html(template, data['posts'][i]);
            }
            $(selector).append(output);
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
