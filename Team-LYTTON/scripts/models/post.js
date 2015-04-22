var app = app || {};
app._model = app._model || {};

app._model.post = (function () {
    function Post(baseUrl, ajaxRequester) {
        this._requester = ajaxRequester;
        this._posts = {
            posts: []
        }
    }

    return {
        get: function (baseUrl, ajaxRequester) {
            return new Post(baseUrl, ajaxRequester);
        }
    }
}());
