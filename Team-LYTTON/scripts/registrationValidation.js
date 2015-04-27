var app = app || {};
validation = {
    header: {
        'X-Parse-Application-Id': 'gBxtJ8j1z5sRZhOgtAstvprePygEIvYTxY4VNQOY',
        'X-Parse-REST-API-Key': 'CLU5dIerpE1k9zX06HiR3RxJQA3Vob2NgJarCl4z',
        'Content-Type': 'application/json'
    },

    checkUsernameForLength: function (userName) {
        return userName.isLongEnough();
    },

    checkUsernameForSymbols: function (userName) {
        return userName.isAlphaNumeric();
    },

    checkIfPasswordsMatch: function(password, repeatPassword) {
        return password === repeatPassword;
    },

    checkEmail: function(email) {
        var regExp = /[@]+/g;
        return (email.match(regExp));
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