var BusinessGroups = function () {
    
    return {
        getOrganizations: function(callback) {

            Common.ajaxGet('/accounts/api/me',function(data) {

                if(callback == null){
                    var row ='';
                    $.each(data.user.memberOfOrganizations, function(key,value) {
                        row = row +' <li class="mdl-list__item app_name" >'+
                            '<span class="mdl-list__item-primary-content ch_business_groups" envId="'+value.id+'" envName="'+value.name+'">'+
                            '<i class="material-icons mdl-list__item-avatar" style="background: #ffffff;color: #5a92ff;">pages</i>'+
                            value.name+'</span>'+
                            '</li>';
                    });
                    $('.demo-list-two').html(row);
                    $('#loadingDiv').hide();
                }else{
                    callback(data);
                }
            });
        },
        init: function() {

            $('.mdl-layout-title').text('Business Groups');
            BusinessGroups.getOrganizations();

            $('body').unbind().on('click','span.ch_business_groups', function() {
                localStorage.setItem('selectedOrgId', $(this).attr('envId'));
                localStorage.setItem('selectedOrgName', $(this).attr('envName'));
                Common.loadContent('pages/choose-env.html');
            });
        }
    };

}();