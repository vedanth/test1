var Common = function () {

    return {
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
                },
                success: function(data) {
                    callback(data);
                },
                error: function(jqXHR,textStatus,errorThrown) {
                    console.log(errorThrown);
                    console.log(textStatus);
                    console.log(jqXHR);
                    alert('Error Processing the request.');
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
                data: data,
                error: function(jqXHR,textStatus,errorThrown) {
                    console.log(errorThrown);
                    console.log(textStatus);
                    console.log(jqXHR);
                    callback(data);// only post request is for start/stop application, which has null response. so calling callback on error.
                    // Dont use this for other POST requests
//                    alert('Error Processing the request.');
                    $('#loadingDiv').hide();
                }
            });
        },
        loadContent: function (pagename, fromMenu){
            if(fromMenu != null){
                var d = document.querySelector('.mdl-layout');
                d.MaterialLayout.toggleDrawer();
            }
            $('.main_content').load(pagename);
        },
        init: function(){
            Common.loadContent('pages/choose-env.html');
        },
        logout: function(){
            localStorage.removeItem('selectedOrgId');
            window.location.replace('index.html');
        }
    };

}();