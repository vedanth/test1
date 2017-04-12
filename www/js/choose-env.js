var ChooseEnv = function () {
    
    return {
        getEnvironments: function() {

            if(localStorage.getItem('selectedOrgId') == null || localStorage.getItem('selectedOrgId') == ''){
                /*Common.ajaxGet(APPLICATION_HOST+'/accounts/api/me',function(data) {
                    $('.ch_username').text(data.user.firstName + ' '+ data.user.lastName);
                    var selectedOrgId = data.user.organization.id;
                    var selectedOrgName = data.user.organization.name;

                    localStorage.setItem('selectedOrgId', selectedOrgId);
                    localStorage.setItem('selectedOrgName', selectedOrgName);


                });*/
                BusinessGroups.getOrganizations(function(data){
                    var selectedOrgId = data.user.organization.id;
                    var selectedOrgName = data.user.organization.name;

                    localStorage.setItem('selectedOrgId', selectedOrgId);
                    localStorage.setItem('selectedOrgName', selectedOrgName);
                    ChooseEnv.getEnv();
                });
            }else{
                ChooseEnv.getEnv();
            }
        },
        getEnv: function(){
            var selectedOrgId = localStorage.getItem('selectedOrgId');
            Common.ajaxGet('/accounts/api/organizations/'+selectedOrgId+'/environments', function(data){

                var row ='';
                var allEnvs = '';
                var separator='';
                $.each(data.data, function(key,value) {
                    row = row +' <li class="mdl-list__item app_name" >'+
                        '<span class="mdl-list__item-primary-content ch_environaments" envId="'+value.id+'" envName="'+value.name+'">'+
                        '<i class="material-icons mdl-list__item-avatar" style="background: #ffffff;color: #5a92ff;">pages</i>'+
                        value.name+'</span>'+
                        '</li>';
                    allEnvs = allEnvs + value.id + '~' + value.name+ separator ;
                    separator = ',';
                    localStorage.setItem('selectedEnvId', value.id);
                    localStorage.setItem('selectedEnvName', value.name);
                });
                localStorage.setItem('allEnvs', allEnvs);
                $('.demo-list-two').html(row);
                $('#loadingDiv').hide();
            });
        },
        init: function() {

            $('.mdl-layout-title').text('Select Environment');
            ChooseEnv.getEnvironments();

            $('body').unbind().on('click','span.ch_environaments', function(){
                localStorage.setItem('selectedEnvId', $(this).attr('envId'));
                localStorage.setItem('selectedEnvName', $(this).attr('envName'));
                Common.loadContent('pages/api-runtime.html');
            });
        }
    };

}();