var app = app || {};
app._model = app._model || {};

app._model.post = (function () {
    function Post(baseUrl, ajaxRequester) {
        this._requester = ajaxRequester;
        this._posts = {
            posts: []
        }
    }

    Post.prototype.createPost = function(data){
        var defer = Q.defer();
        this._requester.post('classes/Post', data)
            .then(function (data) {
                defer.resolve(data);
            }, function (error) {
                defer.reject(error);
            });
        return defer.promise;
    };

    Post.prototype.getPosts = function(){
        var defer = Q.defer();
        var _this = this;
        this._posts['posts'].length = 0;

        this._requester.get('classes/Post')
            .then(function (data) {
                data['results'].forEach(function (dataPost) {
                    var post = {
                        'objectId': dataPost.objectId,
                        'title': dataPost.title,
                        'content': dataPost.content
                    };
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
