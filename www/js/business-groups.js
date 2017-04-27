var BusinessGroups = function () {
    
    return {
        getOrganizations: function(callback) {

            Common.ajaxGet('/accounts/api/me',function(data) {

                localStorage.setItem('firstname',data.user.firstName);
                localStorage.setItem('lastname',data.user.lastName);
                $('.ch_username').text(data.user.firstName + ' '+ data.user.lastName);

                if(callback == null){
                    var row ='';
                    $.each(data.user.memberOfOrganizations, function(key,value) {
                        row = row +' <li class="mdl-list__item app_name" >'+
                            '<a href="#/choose-env" onclick="BusinessGroups.selectBusinessGroup(this)" style="text-decoration: none; color: #000000"><span class="mdl-list__item-primary-content ch_business_groups" envId="'+value.id+'" envName="'+value.name+'">'+
                            '<i class="material-icons mdl-list__item-avatar" style="background: #ffffff;color: #5a92ff;">pages</i>'+
                            value.name+'</span>'+
                            '</a></li>';
                    });
                    $('.demo-list-two').html(row);
                    $('#loadingDiv').hide();
                }else{
                    callback(data);
                }
            });
        },
        selectBusinessGroup: function(evt){
            localStorage.setItem('selectedOrgId', $(evt).find('span').attr('envId'));
            localStorage.setItem('selectedOrgName', $(evt).find('span').attr('envName'));
            return true;
        },
        init: function() {

            $('.mdl-layout-title').text('Business Groups');
            BusinessGroups.getOrganizations();

          /*  $('body').unbind().on('click','span.ch_business_groups', function() {
                localStorage.setItem('selectedOrgId', $(this).attr('envId'));
                localStorage.setItem('selectedOrgName', $(this).attr('envName'));
                Common.loadContent('pages/choose-env.html');
            });*/
        }
    };

}();