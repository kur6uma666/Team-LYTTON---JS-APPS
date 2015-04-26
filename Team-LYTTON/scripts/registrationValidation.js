validation = {
    header: {
        'X-Parse-Application-Id': 'gBxtJ8j1z5sRZhOgtAstvprePygEIvYTxY4VNQOY',
        'X-Parse-REST-API-Key': 'CLU5dIerpE1k9zX06HiR3RxJQA3Vob2NgJarCl4z',
        'Content-Type': 'application/json'
    },
    checkUsername: function (currentUserName) {
        var isUnique = true;
        $.ajax({
            method: 'GET',
            headers: validation.header,
            url: ' https://api.parse.com/1/classes/_User',
            dataType: 'json'
        }).done(function (data) {
            data['results'].forEach(function (user) {
                if(currentUserName == user.username) {
                    isUnique = false;
                }
            })
        }).fail(function (error) {
            console.log(error.responseText);
        });
        return isUnique;
    }, // unique username function

    checkUsernameForLength: function (userName) {
        return userName.isLongEnough();
    },

    checkUsernameForSymbols: function (userName) {
        return userName.isAlphaNumeric();
    },

    checkEmail: function (email) {
        var isUnique = true;
        $.ajax({
            method: 'GET',
            headers: validation.header,
            url: ' https://api.parse.com/1/classes/_User',
            dataType: 'json'
        }).done(function (data) {
            data['results'].forEach(function (user) {
                if(email == user.email) {
                    isUnique = false;
                }
            })
        }).fail(function (error) {
            console.log(error.responseText);
        });
        return isUnique;
    }, // check if email is unique function

    checkIfPasswordsMatch: function(password, repeatPassword) {
        return password === repeatPassword;
    },

    checkPasswordStrength: function(password) {
        var strength = 0;
        if(password.length > 6) {
            strength += 1;
        }

        if(password.match(/[A-Z]+/g)) {
            strength += 1;
        }

        if(password.match(/[a-z]+/g)) {
            strength += 1;
        }

        if(password.match(/[!,@,#,$,%,^,&,*,(,),{,},?,~,=,_,\+,\.,\[,\],\<,\>]+/g)) {
            strength += 1;
        }

        switch (strength) {
            case 0:
                return 'weak';
                break;

            case 1:
                return 'medium';
                break;

            case 2:
                return 'good';
                break;

            case 3:
                return 'strong';
                break;

            case 4:
                return 'excellent';
                break;

        }
    } // password strength function

};

String.prototype.isAlphaNumeric = function() {
    var regExp = /^[A-Za-z0-9]+$/;
    return (this.match(regExp));
};

String.prototype.isLongEnough = function () {
    return this.length >= 6;
};