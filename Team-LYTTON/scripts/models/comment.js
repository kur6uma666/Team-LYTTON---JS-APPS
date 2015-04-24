var app = app || {};
app._model = app._model || {};

app._model.comment = (function () {
    function Comment(baseUrl, ajaxRequster) {
        this._requester = ajaxRequster;
        this._comments = {
            comments: []
        };
    }

    Comment.prototype.createComment = function (data) {
        var defer = Q.defer();

        this._requester.post('classes/Comment', data)
            .then(function (data) {
                defer.resolve(data);
            }, function (error) {
                defer.reject(error);
            });
        return defer.promise;
    };

    Comment.prototype.getComment = function (postId) {
        var defer = Q.defer();
        var _this = this;
        this._comments['comments'].length = 0;

        this._requester.get('classes/Comment')
            .then( function(data) {
                data['results'].forEach(function (comment) {
                    var comment = {
                        'objectId': comment.objectId,
                        'content': comment.content,
                        'author': comment.author
                        ////todo post: pointer
                    };
                    _this._comments['comments'].push(comment);
                });

                defer.resolve(data);
            }, function (error) {
                defer.reject(error);
            });

        return defer.promise;
    };

    return {
        get: function (baseUrl, ajaxRequester) {
            return new Comment(baseUrl, ajaxRequester);
        }
    }
})();