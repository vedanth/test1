var AppLogs = function () {
    
    return {
        getDeploymentId: function() {

            Common.ajaxGet('/cloudhub/api/v2/applications/'+localStorage.getItem('domain')+'/deployments?orderByDate=DESC',function(data) {

                console.log(data.data[0].deploymentId);
                console.log(data.data[0].instances[0].instanceId);
                AppLogs.getDeploymentLogs(data.data[0].deploymentId, data.data[0].instances[0].instanceId);

            });
        },
        getDeploymentLogs: function(deploymentId, instanceId){
            console.log(new Date().getTime());
            var reqData = '{'+
            '"deploymentId": "'+deploymentId+'",'+
                '"instanceId": "'+instanceId+'",'+
                '"startTime": 0,'+
                '"endTime": '+new Date().getTime()+', '+
                '"text": "",'+
                '"descending": true,'+
                '"limit": 10'+
        '}';
            Common.ajaxPost('/cloudhub/api/v2/applications/'+localStorage.getItem('domain')+'/logs',reqData, function(data){

                var row= '';
                $.each(data, function(key,value) {
                    var date = new Date(value.event.timestamp);
                    row = row +'<tr class="border_bottom">'+
                        '<td>'+date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()+' ' +
                        ''+AppLogs.getPriority(value.event.priority) +'<br><textarea class="boxsizingBorder" style="border:none;width: 100%">'+value.event.message+'</textarea></td>'+
                        '</tr>';

                });
                $('.demo-list-two').html(row);
                $('textarea').each(function(){
                    this.style.height = (this.scrollHeight) + "px";
                });
                $('#loadingDiv').hide();
            });
        },
        getPriority: function(priority){
            var text = '<span style="margin-left: 200px; color: ';
            if(priority == 'ERROR'){
                text = text + 'red" >'+priority;
            }else if(priority == 'INFO'){
                text = text + 'blue" >'+priority;
            }else  if(priority == 'WARN'){
                text = text + 'yellow" >'+priority;
            }
            text = text + '</span>';
            console.log(text);
            return text;
        },
        init: function() {

            $('.mdl-layout-title').text('Application Logs');
            AppLogs.getDeploymentId();

        }
    };

}();