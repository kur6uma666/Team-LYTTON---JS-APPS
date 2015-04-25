var app = app || {};

app.requester = (function () {
    function Requester(baseUrl) {
        this._baseUrl = baseUrl;
    }

    //Requester.prototype.upload = function (serviceUrl) {
    //    var headers = getHeaders();
    //    var file = 'file.type';
    //
    //    return makeRequest()
    //
    //};

    Requester.prototype.get = function (serviceUrl) {
        var headers = getHeaders();
        var url = this._baseUrl + serviceUrl;

        return makeRequest('GET', headers, url);
    };

    Requester.prototype.post = function (serviceUrl, data) {
        var headers = getHeaders();
        var url = this._baseUrl + serviceUrl;

        return makeRequest('POST', headers, url, data);
    };

    Requester.prototype.delete = function (serviceUrl, id) {
        var headers = getHeaders();
        var url = this._baseUrl + serviceUrl + id;

        return makeRequest('DELETE', headers, url);
    };

    Requester.prototype.put = function (serviceUrl, id, data) {
        var headers = getHeaders();
        var url = this._baseUrl + serviceUrl + id;

        return makeRequest('PUT', headers, url, data);
    };

    function makeRequest(method, headers, url, data) {
        var defer = Q.defer();
        $.ajax({
            method: method,
            headers: headers,
            url: url,
            contentType: 'application/json',
            data: JSON.stringify(data),
            processData: false,
            success: function (data) {
                defer.resolve(data);
            },
            error: function (error) {
                defer.reject(error);
            }
        });

        return defer.promise;
    }

    function getHeaders() {
        var PARSE_APP_ID = 'gBxtJ8j1z5sRZhOgtAstvprePygEIvYTxY4VNQOY';
        var PARSE_REST_API_KEY = 'CLU5dIerpE1k9zX06HiR3RxJQA3Vob2NgJarCl4z';

        var headers = {
            'X-Parse-Application-Id': PARSE_APP_ID,
            'X-Parse-REST-API-Key': PARSE_REST_API_KEY,
            'Content-Type': 'application/json'
        };

        if (sessionStorage['logged-in']) {
            headers['X-Parse-Session-Token'] = sessionStorage['logged-in'];
        }

        return headers;
    }

    return {
        get: function (baseUrl) {
            return new Requester(baseUrl);
        }
    }
}());
