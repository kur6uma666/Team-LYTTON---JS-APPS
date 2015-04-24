var app = app || {};

app.commentView = (function () {
    function CommentView(selectors, data) {
        var defer = Q.defer();
        $.get('templates/comment-view.html', function (template) {
            for (var j = selectors.length - 1; j >= 0; j--) {
                var selector = selectors[j].parentElement.parentElement;
                var output = '';
                for (var i = data['results'].length - 1; i >= 0; i--) {
                    if (data['results'][i].postId === selector['id']) {
                        output += Mustache.to_html(template, data['results'][i]);
                    }
                }
                $(selector).append(output);
            }
            
        }).success(function (data) {
            defer.resolve(data);
        }).error(function (error) {
            defer.reject(error);
        });
        return defer.promise;
    }

    return {
        load: function (selectors, data) {
            return CommentView(selectors, data);
        }
    }
}());

