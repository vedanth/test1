var ApiManager = function () {
    
    return {
        login: function(callback) {

             Common.ajaxPost('/accounts/login','{"username":"'+localStorage.getItem('username')+'","password":"'+localStorage.getItem('password')+'"}', function(data){
                 ACCESS_TOKEN=data.access_token;
                 console.log(ACCESS_TOKEN);
                 callback();
             });


        },
        getApis: function(){
              ApiManager.login(function() {
                  var selectedOrgId = localStorage.getItem('selectedOrgId');
                      Common.ajaxGet('/apiplatform/repository/v2/organizations/'+selectedOrgId+'/apis', function(data){
                              console.log(data);
                          var htmltext ='';
                          APIS_RESPONSE = data.apis;
                          $.each(data.apis, function(key,value) {

                              htmltext= htmltext + ' <li class="mdl-list__item mdl-list__item--two-line selected_api" >'+
                                  '<a href="#/api-details" onclick="return ApiManager.selectAPI(this);" style="text-decoration: none; color: #000000"><span class="mdl-list__item-primary-content" index="'+key+'">'+
                                  '<i class="material-icons mdl-list__item-avatar" style="background: #ffffff;color: #8f94fe;">polymer</i>'+
                                  '<span >'+data.apis[key].name+'</span>';

                              htmltext  = htmltext +'<span class="mdl-list__item-sub-title" style="margin-top: 10px;color: #00a2df;font-size: 15px">'+data.apis[key].versions[0].name;

                              if(data.apis[key].versions[0].deprecated){
//                                  htmltext  = htmltext +'<div style="float: right"><i class="material-icons" style="color: #d32300">album</i></div></span>';
                              }else{
//                                  htmltext  = htmltext +'<div style="float: right"><i class="material-icons" style="color: #2fb356">album</i></div></span>';
                              }

                              htmltext = htmltext + ' </span>'
                              '</a></li>';

                          });

                          $('.demo-list-two').html(htmltext);
                          $('#loadingDiv').hide();
                      });
              });
        },
        selectAPI: function(evt){
            var selectedApi = APIS_RESPONSE[$(evt).find('span.mdl-list__item-primary-content').attr('index')];
            localStorage.setItem('selectedApiId',selectedApi.id);
            localStorage.setItem('selectedApiName',selectedApi.name);

            localStorage.setItem('selectedApiVersionId',selectedApi.versions[0].id);
            localStorage.setItem('selectedApiVersionName',selectedApi.versions[0].name);
            return true;
        },
        init: function() {

            $('.mdl-layout-title').text('API Manager');
            Common.initSearch('choose-api-filter');
            ApiManager.getApis();

           /* $('body').unbind().on('click','li.selected_api', function() {
                var selectedApi = APIS_RESPONSE[$(this).attr('index')];
                localStorage.setItem('selectedApiId',selectedApi.id);
                localStorage.setItem('selectedApiName',selectedApi.name);

                localStorage.setItem('selectedApiVersionId',selectedApi.versions[0].id);
                localStorage.setItem('selectedApiVersionName',selectedApi.versions[0].name);

                Common.loadContent('pages/api-details.html');
            });
*/


        }
    };

}();