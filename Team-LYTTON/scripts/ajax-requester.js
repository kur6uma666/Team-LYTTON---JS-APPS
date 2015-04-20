var app = app || {};

app.requester = (function(){
    function Requester(){
        this.get = getRequest;
        this.post = postRequest;
        this.put = putRequest;
        this.delete = deleteRequest;
    }
    function makeRequest(method, url, data, success, error) {
        $.ajax({
            method: method,
            headers: {
                'X-Parse-Application-Id' : 'gBxtJ8j1z5sRZhOgtAstvprePygEIvYTxY4VNQOY',
                'X-Parse-REST-API-Key' : 'CLU5dIerpE1k9zX06HiR3RxJQA3Vob2NgJarCl4z'
            },
            url : url,
            contentType: 'application/json',
            data : JSON.stringify(data),
            success: success,
            error: error
        })
    }

    function getRequest(url, success, error) {
        makeRequest('GET', url, null, success, error);
    }

    function postRequest(url, data, success, error) {
        makeRequest('POST', url, data, success, error);
    }

    function putRequest(url, data, success, error) {
        makeRequest('PUT', url, data, success, error);
    }

    function deleteRequest(url, success, error) {
        makeRequest('DELETE', url, null, success, error);
    }

    return {
        get: function () {
            return new Requester();
        }
    }
}());
