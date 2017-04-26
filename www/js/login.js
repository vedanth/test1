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

                /*Common.ajaxPost('/accounts/login','{"username":"'+localStorage.getItem('username')+'","password":"'+localStorage.getItem('password')+'"}', function(data){
                    localStorage.setItem('username', $('input.username').val());
                    localStorage.setItem('password', $('input.password').val());
                    window.location.replace('landing.html');
                });
                */
                $('#loadingDiv').show();
                $.ajax({
                    type: 'post',
                    contentType: 'application/json',
                    url: APPLICATION_HOST+'/accounts/login',
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader ("Authorization", "Basic " + btoa(localStorage.getItem('username') + ":" + localStorage.getItem('password')));
                        xhr.setRequestHeader ("X-ANYPNT-ENV-ID",localStorage.getItem('selectedEnvId'));
                    },
                    success: function(data, status, xhr) {
                        localStorage.setItem('username', $('input.username').val());
                        localStorage.setItem('password', $('input.password').val());

                        console.log(APPLICATION_VERSION);
                        console.log(xhr.getResponseHeader('appVersion'));

                        if(APPLICATION_VERSION != xhr.getResponseHeader('appVersion')){
                            console.log('eeqe32');
                            window.location.replace('https://unilever.sharepoint.com/sites/AdaptiveIntegrationOnline/Shared%20Documents/CloudhHubMobileApplication/AdaptiveIntg.apk');
                        }

//                        window.location.replace('landing.html');
                    },
                    data: '{"username":"'+$('input.username').val()+'","password":"'+$('input.password').val()+'"}',
                    error: function(jqXHR,textStatus,errorThrown) {
                        console.log(jqXHR.status);
                        console.log(jqXHR.readyState);
                        if(jqXHR.readyState ==  0){
                            alert('Check internet connection');
                        }
                        else if(jqXHR.readyState ==  4){
                            if(jqXHR.status == 500){
                                alert('Invalid Username or Password');
                            }
                        }
                        $('#loadingDiv').hide();
                    }
                });

               /* localStorage.setItem('username', $('input.username').val());
                localStorage.setItem('password', $('input.password').val());
                window.location.replace('landing.html');*/
            }
        },
        init: function() {
            if(localStorage.getItem('username') != null){
                $('input.username').val(localStorage.getItem('username'));
            }
            $('button').on('click',function () {
                Login.login();
            });
        }
    };

}();