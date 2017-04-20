var ChooseEnv = function () {
    
    return {
        getEnvironments: function() {

            if(localStorage.getItem('selectedOrgId') == null || localStorage.getItem('selectedOrgId') == ''){

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

            $('.ch_username').text(localStorage.getItem('firstname') + ' '+ localStorage.getItem('lastname'));

            var selectedOrgId = localStorage.getItem('selectedOrgId');
            Common.ajaxGet('/accounts/api/organizations/'+selectedOrgId+'/environments', function(data){

                var row ='';
                var allEnvs = '';
                var separator='';
                $.each(data.data, function(key,value) {
                    row = row +'<a style="text-decoration: none;" href="#/runtime" onclick="return ChooseEnv.selectEnv(this);"> <li class="mdl-list__item app_name jsearch-field" ng-controller="myCtrl"><div>'+
                        '<span class="mdl-list__item-primary-content ch_environaments" envId="'+value.id+'" envName="'+value.name+'">'+
                        '<i class="material-icons mdl-list__item-avatar" style="background: #ffffff;color: #5a92ff;">pages</i>'+
                        value.name+'</span>'+
                        '</div></li></a>';
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
        selectEnv: function(evt){

            localStorage.setItem('selectedEnvId', $(evt).find('span').attr('envId'));
            localStorage.setItem('selectedEnvName', $(evt).find('span').attr('envName'));
            return true;
        },
        init: function() {

            $('.mdl-layout-title').text('Select Environment');
            ChooseEnv.getEnvironments();
            Common.initSearch('choose-env-filter');

        }
    };

}();