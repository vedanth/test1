var ApiRuntime = function () {
    
    return {
        getApplications: function() {

            Common.ajaxGet('/cloudhub/api/applications',function(data) {
                var counter =0;
                var row ='';
                RUNTIME_APP_RESPONSE=data;
//                console.log(RUNTIME_APP_RESPONSE);
                $.each(data, function(key,value) {
                    var date = new Date(value.lastUpdateTime);

                    row = row +'<li class="mdl-list__item mdl-list__item--two-line runtime_app" >'+
                        '<span class="mdl-list__item-primary-content">'+
                        '<a href="#/runtime-app" onclick="return ApiRuntime.selectRuntimeApp(this);" style="text-decoration: none;color: #000000"> <i class="material-icons mdl-list__item-avatar" style="background: #ffffff;color: #5a92ff;">filter_drama</i>'+
                        '<span class="app_name" index="'+key+'">'+value.domain+'</span>'+
                        '<span class="mdl-list__item-sub-title" style="display:none; margin-top: 10px;font-size: 13px; font-weight: 700"><i class="fa icon-calendar-empty" > <span style="font-size: 15px; color: #4773a3">'+date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()+'</span></i><span></span></span>'+
                        '</span>'+
                        '<span class="mdl-list__item-secondary-content">';

                    if(counter == 0){
//                        row = row + '<span class="mdl-list__item-secondary-info">Status</span>';
                    }

                    if(value.status == 'STARTED'){
                        row = row + '<a class="mdl-list__item-secondary-action" href="#" style="font-size: 20px"><i class="material-icons" style=" color: #07b527">fiber_manual_record</i></a>';
                    }else{
                        row = row + '<a class="mdl-list__item-secondary-action" href="#"><i class="material-icons" style="color: #d11200">fiber_manual_record</i></a>';
                    }


                    row = row + '</a></span>'+
                        '</li>';
                    counter++;
                });
                $('.demo-list-two').html(row);
                $('#loadingDiv').hide();
            });



        },
        selectRuntimeApp: function(evt){
            RUNTIME_APP_DETAILS = RUNTIME_APP_RESPONSE[$(evt).find('span.app_name').attr('index')];
            return true;
        },
        init: function() {

            $('.mdl-layout-title').text('Runtime Manager');

            $('.mdl-chip__text_start').text(localStorage.getItem('selectedEnvName').charAt(0));
            $('.mdl-chip__text').text(localStorage.getItem('selectedEnvName'));

            Common.initSearch('choose-app-filter');

            ApiRuntime.getApplications();
/*

            $('body').unbind().on('click','li.runtime_app', function() {
                RUNTIME_APP_DETAILS = RUNTIME_APP_RESPONSE[$(this).find('span.app_name').attr('index')];
                Common.loadContent('pages/runtime-app-details.html');
            });

            $('body').on('click','.choose-env', function() {
                Common.loadContent('pages/choose-env.html');
            });

            $('body').on('click','.table-refresh', function() {
                ApiRuntime.getApplications();
            });
*/
            $('body').on('click','.table-refresh', function() {
                ApiRuntime.getApplications();
            });

        }
    };

}();