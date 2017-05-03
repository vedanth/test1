var Common = function () {

    return {
        initSearch: function(inputId){
            jQuery("#"+inputId).keyup(function () {
                var filter = jQuery(this).val();
                jQuery("ul li").each(function () {
                    if (jQuery(this).text().search(new RegExp(filter, "i")) < 0) {
                        jQuery(this).hide();
                    } else {
                        jQuery(this).show()
                    }
                });
            });
        },
        ajaxGet: function(url, callback) {

            $('#loadingDiv').show();
            $.ajax({
                type: 'get',
                url: APPLICATION_HOST+url,
                beforeSend: function(xhr) {
                    if(url.indexOf('/apiplatform') >= 0 || url.indexOf('/analytics') >= 0){
                        xhr.setRequestHeader ("Authorization", "Bearer " + ACCESS_TOKEN);
                    }else{
                        xhr.setRequestHeader ("Authorization", "Basic " + btoa(localStorage.getItem('username') + ":" + localStorage.getItem('password')));
                    }
                    xhr.setRequestHeader ("X-ANYPNT-ENV-ID",localStorage.getItem('selectedEnvId'));
                    xhr.setRequestHeader ("Content-Type",'application/json');
                },
                success: function(data) {
                    callback(data);
                },
                timeout: 60000,
                error: function(jqXHR,textStatus,errorThrown) {
                   console.log(jqXHR.status);
                    console.log(jqXHR.readyState);
                    if(jqXHR.readyState ==  0){
                        alert('Check internet connection');
                    }
                    else if(jqXHR.readyState ==  4){
                        if(jqXHR.status == 500){
                            alert('Unable to process the request');
                        }
                    }
                    $('#loadingDiv').hide();
                }
            });
        },
        ajaxPost: function(url, data,callback) {

            $('#loadingDiv').show();
            $.ajax({
                type: 'post',
                contentType: 'application/json',
                url: APPLICATION_HOST+url,
                beforeSend: function(xhr) {
                    xhr.setRequestHeader ("Authorization", "Basic " + btoa(localStorage.getItem('username') + ":" + localStorage.getItem('password')));
                    xhr.setRequestHeader ("X-ANYPNT-ENV-ID",localStorage.getItem('selectedEnvId'));
                },
                success: function(data) {
                    callback(data);
                },
                timeout: 60000,
                data: data,
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
        },
        loadContent: function (pagename, fromMenu){
            /*if(fromMenu != null){
                var d = document.querySelector('.mdl-layout');
                d.MaterialLayout.toggleDrawer();
            }
            $('.main_content').load(pagename);*/
        },
        init: function(){
//            Common.loadContent('pages/choose-env.html');
        },
        logout: function(){
            localStorage.removeItem('selectedOrgId');
            localStorage.removeItem('password');
            window.location.replace('index.html');
        }
    };

}();