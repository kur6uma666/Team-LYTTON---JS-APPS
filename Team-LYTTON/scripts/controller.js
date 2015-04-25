var app = app || {};

app.controller = (function () {

    function Controller(model) {
        this.model = model;
    }

    Controller.prototype.loadMenu = function (selector) {
        var _this = this;
        if (sessionStorage['logged-in']) {
            app.userMenuView.load(selector)
                .then(function () {
                    _this.attachLogoutEvents('#logout a');
                    _this.attachSearchEvents('#search');
                });
        } else {
            app.menuView.load(selector)
                .then(function () {
                    _this.attachSearchEvents('#search');
                });
        }
    };

    Controller.prototype.attachSearchEvents = function(selector){
        $(selector).click(function(){
            var tag = $('#search-input').val().trim();
            window.location.replace('#/tag/' + tag);
        });
    };

    Controller.prototype.getLoginPage = function (selector) {
        var _this = this;
        app.loginView.load(selector)
            .then(function () {
                _this.attachLoginEvents('#loginButton');
            })
    };

    Controller.prototype.attachLoginEvents = function (selector) {
        var _this = this;
        $(selector).click(function () {
            var username = ($("input[id=username]").val());
            var password = ($("input[id=password]").val());
            _this.model.user.logIn(username, password)
                .then(function (loginData) {
                    sessionStorage['logged-in'] = loginData.sessionToken;
                    sessionStorage['id'] = loginData.objectId;
                    window.location.replace('#/blog');
                    Noty.success('Welcome!');
                },
                function (errorData) {
                    Noty.error(JSON.parse(errorData.responseText).error);
                });
        });
    };

    Controller.prototype.attachLogoutEvents = function (selector) {
        var _this = this;
        $(selector).click(function () {
            _this.model.user.logOut()
                .then(function () {
                    sessionStorage.clear();
                    window.location.replace('#/blog');
                    _this.loadMenu('nav');
                    Noty.success('Goodbye!');
                },
                function (errorData) {
                    Noty.error(JSON.parse(errorData.responseText).error);
                });
        });
    };

    Controller.prototype.getProfilePage = function (selector) {
        var _this = this;
        app.profileView.load(selector)
            .then(function () {
                _this.attachProfilePageEvents('#editButton');
            }, function (error) {
                Noty.error(JSON.parse(error.responseText).error);
            })
    };

    Controller.prototype.attachProfilePageEvents = function (selector) {
        var _this = this;

        $(selector).click(function (event) {
            var userData = {
                username: $("input[id=username]").val(),
                password: $("input[id=password]").val(),
                email: $("input[id=email]").val(),
                firstName: $("input[id=firstName]").val(),
                middleName: $("input[id=middleName]").val(),
                lastName: $("input[id=lastName]").val(),
                gender: $("input[name=gender-radio]:checked").val(),
                picture: $('#picture').attr('data-picture-data')
            };

            _this.model.user.updateUser(sessionStorage['id'], userData)
                 .then(function (data) {
                    sessionStorage.clear();
                    window.location.replace('#/');
                    Noty.success('Profile edited successfully.');
                }, function(error) {
                    Noty.error('Error saving changes. Please try again.');
                });
        });

        $('#cancel-btn').click(function () {
            window.location.replace('#/');
            _this.loadMenu('nav');
        });

        $('#delete-btn').click(function () {
            _this.model.user.deleteUser(sessionStorage['id'])
                 .then(function () {
                    sessionStorage.clear();
                    window.location.replace('#/');
                    _this.loadMenu('nav');
                    Noty.success('Profile deleted successfully.');
                }, function (error) {
                   Noty.error(JSON.parse(error.responseText).error);
                });
        });
    };
	
	Controller.prototype.attachPictureUploadHandler = function (selector) {
        $(selector).on('click', '#upload-file-button', function() {
            $('#picture').click();
        });

        $(selector).on('change', '#picture', function() {
            var file = this.files[0];
            if (file.type.match(/image\/.*/)) {
                var reader = new FileReader();
                reader.onload = function() {
                    $('.picture-name').text(file.name);
                    $('.picture-preview').attr('src', reader.result);
                    $('#picture').attr('data-picture-data', reader.result);
                };
                reader.readAsDataURL(file);
            } else {
                Noty.error("Invalid file format.");
            }
        });
    };

    Controller.prototype.getRegisterPage = function (selector) {
        var _this = this;
        app.registerView.load(selector)
            .then(function () {
                _this.attachRegisterEvents('#registerButton')
            }, function (error) {
                Noty.error(JSON.parse(error.responseText).error);
            })
    };

    Controller.prototype.attachRegisterEvents = function (selector) {
        var _this = this;
        $(selector).click(function () {
            var data = {
                username: $("input[id=username]").val(),
                password: $("input[id=password]").val(),
                email: $("input[id=email]").val()

            };
            _this.model.user.register(data)
                .then(function (registerData) {
                    Noty.success('Registration Successful');
                    sessionStorage['logged-in'] = registerData.sessionToken;
                    sessionStorage['id'] = registerData.objectId;
                    window.location.replace('#/');
                }, function (error) {
                    Noty.error(JSON.parse(error.responseText).error);
                })
        });
    };

    Controller.prototype.getBlogPage = function (selector) {
        $(selector).empty();
        var _this = this;
        app.postArticle.load(selector)
            .then(function () {
                _this.attachBlogEvents('#postArticle')
            }, function (error) {
                console.log(error.responseText);
            });
        _this.model.post.getPosts()
            .then(function (data) {
                app.blogView.load('#posts', data);
                _this.model.comment.getComment()
                    .then(function (commentsData) {
                        var articles = $('.postCommentButton');
                        app.commentView.load(articles, commentsData);
                        _this.attachCommentEvents('.postCommentButton');
                    }, function (error) {
                        console.log(error.responseText);
                    });
            }, function (error) {
                Noty.error(JSON.parse(error.responseText).error);
            });
    };

    Controller.prototype.attachCommentEvents = function (selector) {
        var _this = this;

        $(selector).on('click', function (event) {
            var id = event.target.parentElement.parentElement['id'];
            var data = {
                author: $(this).parent().find('input[id=author]').val(),
                content: $(this).parent().find('input[id=content]').val(),
                email: $(this).parent().find('input[id=email]').val(),
                postId: id,
                'post': {
                    __type: "Pointer",
                    className: "Post",
                    objectId: id
                }
            };

            _this.model.comment.createComment(data)
                .then(function (commentData) {
                    Noty.success('Comment posted successfully.');
                    _this.model.comment.getComment()
                        .then(function (commentsData) {
                            app.commentView.load(selector, commentsData);
                        }, function (error) {
                            console.log(error.responseText);
                        });
                }, function (error) {
                    Noty.error(JSON.parse(error.responseText).error);
                });
        });

        $('body').find('a').on('click', function (event) {
            var postId = /[^/]*$/.exec(event.target['href'])[0];
            var data = {
                visitsCount: {
                    __op: 'Increment',
                    amount: 1
                }
            };
            $.ajax({
                method: 'PUT',
                headers: {
                    'X-Parse-Application-Id': 'gBxtJ8j1z5sRZhOgtAstvprePygEIvYTxY4VNQOY',
                    'X-Parse-REST-API-Key': 'CLU5dIerpE1k9zX06HiR3RxJQA3Vob2NgJarCl4z',
                    'X-Parse-Session-Token': sessionStorage['logged-in'],
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(data),
                url: 'https://api.parse.com/1/classes/Post/' + postId
            }).done(function (successData) {

            }).fail(function (error) {

            })
        })
    };

    Controller.prototype.attachBlogEvents = function (selector) {
        var _this = this;

        $(selector).click(function () {
            var _data = {
                title: $("input[id=title]").val(),
                content: $("textarea[id=content]").val(),
                tags: _.uniq($("input[id=tags]").val().split(', '))
            };

            _this.model.post.createPost(_data)
                .then(function () {
                    $('#posts').empty();
                    _this.model.post.getPosts()
                        .then(function (data) {
                            Noty.success('Article posted successfully');
                            app.blogView.load('#posts', data);
                        }, function (error) {
                            Noty.error(JSON.parse(error.responseText).error);
                        })
                }, function (error) {
                    Noty.error(JSON.parse(error.responseText).error);
                })
        });
    };

    Controller.prototype.getHomePage = function (selector) {
        app.homeView.load(selector);
    };

    Controller.prototype.getSidebar = function (selector, tagsFunction, tagsClassName, tagsLimit) {
        $(selector).empty();

        this.model.sidebar.getLatestPosts()
            .then(function (data) {
                app.sidebarView.load(selector, data);
            }, function (error) {
                Noty.error(JSON.parse(error.responseText).error);
            });

        var data = {
            'className': tagsClassName,
            'limit': tagsLimit
        };

        this.model.sidebar.getMostPopularTags(tagsFunction, data)
            .then(function (data) {
                app.sidebarView.load(selector, data);
            }, function (error) {
                Noty.error(JSON.parse(error.responseText).error);
            });
    };

    Controller.prototype.getPostPage = function (id, selector) {
        $(selector).empty();

        this.model.post.getPost(id)
            .then(function (data) {
                app.postView.load(selector, data);
            }, function (error) {
                Noty.error(JSON.parse(error.responseText).error);
            });
    };

    Controller.prototype.getUserPage = function (id, selector) {
        $(selector).empty();

        this.model.user.getUserById(id)
            .then(function (data) {
                app.userView.load(selector, data);
            }, function (error) {
                Noty.error(JSON.parse(error.responseText).error);
            });
    };

    Controller.prototype.getTagPage = function (tag, selector) {
        $(selector).empty();

        this.model.tag.getPostsByTag(tag)
            .then(function (data) {
                app.blogView.load(selector, data);
            }, function (error) {
                Noty.error(JSON.parse(error.responseText).error);
            });
    };

    return {
        get: function (model) {
            return new Controller(model);
        }
    }
})();