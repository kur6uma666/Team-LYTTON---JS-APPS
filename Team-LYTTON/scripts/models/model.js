var app = app || {};

app.model = function () {
    function Model(baseURL, ajaxRequester) {
        this.user = app._model.user.get(baseURL, ajaxRequester);
        this.post = app._model.post.get(baseURL, ajaxRequester);
        this.comment = app._model.comment.get(baseURL, ajaxRequester);
        this.sidebar = app._model.sidebar.get(ajaxRequester);
        this.tag = app._model.tag.get(ajaxRequester);
    }

    return {
        get: function (baseURL, ajaxRequester) {
            return new Model(baseURL, ajaxRequester);
        }
    }
}();
