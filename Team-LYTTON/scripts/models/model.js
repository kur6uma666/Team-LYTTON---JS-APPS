var app = app || {};

app.model = (function(){
   function Model(baseURL, ajaxRequester){
       this.user = app._model.user.get(baseURL, ajaxRequester);
       this.post = app._model.post.get(baseURL, ajaxRequester);
       this.comment = app._model.comment.get(baseURL, ajaxRequester);
   }

   return{
       get: function(baseURL, ajaxRequester){
           return new Model(baseURL, ajaxRequester);
       }
   }
}());
