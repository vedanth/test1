var ApiDetails = function () {
    
    return {
        getApiDetails: function(){
            var selectedOrgId = localStorage.getItem('selectedOrgId');
            var selectedApiId = localStorage.getItem('selectedApiId');
            var selectedApiVersionId = localStorage.getItem('selectedApiVersionId');

            console.log('/apiplatform/repository/v2/organizations/'+selectedOrgId+'/apis/'+selectedApiId+'/versions/'+selectedApiVersionId+'/policies');

            Common.ajaxGet('/apiplatform/repository/v2/organizations/'+selectedOrgId+'/apis/'+selectedApiId+'/versions/'+selectedApiVersionId+'/policies', function(data){
                console.log(data);
                $('#loadingDiv').hide();
            });
        },
        init: function() {

            $('.mdl-layout-title').text('API Administration');
            ApiDetails.getApiDetails();

        }
    };

}();