var app = app || {};
app._model = app._model || {};

app._model.post = (function () {
    function Post(baseUrl, ajaxRequester) {
        this._requester = ajaxRequester;
        this._posts = {
            posts: []
        }
    }

    Post.prototype.getAuthor = function () {
        var defer = Q.defer();
        this._requester.get('sessions/me')
            .then(function (sessionData) {
                defer.resolve(sessionData.user);
            }, function (error) {
                defer.reject(error.responseText);
            });
        return defer.promise;
    };

    Post.prototype.createPost = function (data) {
        var defer = Q.defer();
        var _this = this;
        this.getAuthor()
            .then(function (author) {
                data.author = author;
                _this._requester.post('classes/Post', data)
                    .then(function(_data){
                        defer.resolve(_data);
                    });
            }, function (error) {
                defer.reject(error);
            });
        return defer.promise;
    };

    Post.prototype.getPosts = function () {
        var defer = Q.defer();
        var _this = this;
        this._posts['posts'].length = 0;

        this._requester.get('classes/Post?include=author&order=createdAt')
            .then(function (data) {
                data['results'].forEach(function (dataPost) {
                    var post = {
                        'objectId': dataPost.objectId,
                        'title': dataPost.title,
                        'content': dataPost.content,
                        'tags': dataPost.tags,
                        'author': dataPost.author.username
                    };

                    if(dataPost.headerImage){
                        post.image = dataPost.headerImage.url;
                    }
                    console.log(post);
                    _this._posts['posts'].push(post);
                });

                defer.resolve(_this._posts);
            }, function (error) {
                defer.reject(error);
            });

        return defer.promise;
    };

    return {
        get: function (baseUrl, ajaxRequester) {
            return new Post(baseUrl, ajaxRequester);
        }
    }
}());
