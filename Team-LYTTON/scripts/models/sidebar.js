var app = app || {};
app._model = app._model || {};

app._model.sidebar = (function () {
    function Sidebar(ajaxRequester) {
        this._requester = ajaxRequester;
        this._latestPosts = {
            latestPosts: []
        };
        this._mostPopularTags = {
            mostPopularTags: []
        }
    }

    Sidebar.prototype.getLatestPosts = function(){
        var defer = Q.defer();
        var _this = this;
        this._latestPosts['latestPosts'].length = 0;

        this._requester.get('classes/Post?order=-createdAt&limit=5&keys=title')
            .then(function (data) {
                data['results'].forEach(function (dataPost) {
                    var post = {
                        'objectId': dataPost.objectId,
                        'title': dataPost.title.length > 25 ?
                                 dataPost.title.substring(0, 25) + '...' :
                                 dataPost.title
                    };
                    _this._latestPosts['latestPosts'].push(post);
                });

                defer.resolve(_this._latestPosts);
            }, function (error) {
                defer.reject(error);
            });

        return defer.promise;
    };

    Sidebar.prototype.getMostPopularTags = function(func, data){
        var defer = Q.defer();
        var _this = this;
        this._mostPopularTags['mostPopularTags'].length = 0;
        this._requester.post('functions/' + func, data)
            .then(function (_data) {
                _this._mostPopularTags['mostPopularTags'] = _data['result'];
                defer.resolve(_this._mostPopularTags);
            }, function (error) {
                defer.reject(error);
            });

        return defer.promise;
    };

    return {
        get: function (ajaxRequester) {
            return new Sidebar(ajaxRequester);
        }
    }
}());