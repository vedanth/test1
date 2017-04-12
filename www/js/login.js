var Login = function () {
    
    return {
        validate: function() {

            console.log($('input.username').val());
            if($('input.username').val() == undefined || $('input.username').val().length <= 0){
                $('.error_message_text').text('* Username is required');
                return false;
            }

            if($('input.password').val() == undefined || $('input.password').val().length <= 0){
                $('.error_message_text').text('* Password is required');
                return false;
            }

            return true;
        },
        login: function () {
            if(this.validate()){
                localStorage.setItem('username', $('input.username').val());
                localStorage.setItem('password', $('input.password').val());
                window.location.replace('landing.html');
            }
        },
        init: function() {
            $('button').on('click',function () {
                Login.login();
            });
        }
    };

}();