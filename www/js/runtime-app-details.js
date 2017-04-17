var RuntimeAppDetails = function () {
    
    return {
        populateBasicDetails: function() {

            $('.appurl').text(RUNTIME_APP_DETAILS.href);
            var newDate = new Date(parseInt(RUNTIME_APP_DETAILS.lastUpdateTime));
            $('.lastUpdateTime').text(newDate.toUTCString());
            $('.muleVersion').text(RUNTIME_APP_DETAILS.muleVersion);
            $('.workers').text(RUNTIME_APP_DETAILS.workers);
            $('.userName').text(RUNTIME_APP_DETAILS.userName);

            var status = RUNTIME_APP_DETAILS.status;
            var tmpl;
            if(status == 'STARTED'){
                tmpl = '<a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect stop-app" style="margin-left: 70px; color: #c95408;text-align: center;">'+
                    '<img src="images/stop-button.png" height="35px" width="35px"> Stop Application'+
                    '</a>';
                $('.status').append('<span style="color: #1fb55f">'+status+'</span>');
            }else{
                tmpl = '<a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect start-app" style="margin-left: 70px; color: #1fb55f;text-align: center;">'+
                    '<img src="images/play_button.png" height="35px" width="35px"> Start Application'+
                    '</a>';
                $('.status').append('<span style="color: #c95408">'+status+'</span>');
            }

            $('.mdl-card--border').append(tmpl);
            this.showStats();
        },
        showStats: function(){
            Common.ajaxGet('/cloudhub/api/v2/applications/'+RUNTIME_APP_DETAILS.domain+'/dashboardStats', function(data){
                if(data.workerStatistics[0] != null){
                    var events = data.events;
                    RuntimeAppDetails.plotChart(events,'Mule Messages (Count)','#FFD61D','mule_messages', false);

                    var cpu = data.workerStatistics[0].statistics.cpu;
                    RuntimeAppDetails.plotChart(cpu,'CPU Usage(%)','#20ba74','cpu_stats', true);

                    var memory = data.workerStatistics[0].statistics.memoryPercentageUsed;
                    RuntimeAppDetails.plotChart(memory,'Memory Usage (%)','#8D8CFF','memory_stats', true);

                    $('#charts').show();
                }
                $('#loadingDiv').hide();
            });
        },
        plotChart: function(dataset, label1, color, chartid, fixedYAxis){
            var dataArr = [];
            var label=[];
            var counter =-1;
            var dataSize = Object.keys(dataset).length;;


            $.each(dataset, function(k, v) {
                counter++;
                if((dataSize - counter) <= 10){
                    dataArr.push(v);
                    var d = new Date(parseInt(k));
                    label.push(d.getHours()+':'+d.getMinutes()+':'+d.getSeconds());
                }
            });

            var ctx = $("#"+chartid);

            var data = {
                labels: label,
                datasets: [
                    {
                        label: label1,
                        fill: true,
                        lineTension: 0.1,
                        backgroundColor: color,
                        borderColor: color,
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: color,
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: color,
                        pointHoverBorderColor: color,
                        pointHoverBorderWidth: 2,
                        pointRadius: 4,
                        pointHitRadius: 10,
                        data: dataArr,
                        spanGaps: false
                    }
                ]
            };

            var options = {};
            if(fixedYAxis){
                options = {
                    scales: {
                        yAxes: [{
                            ticks: {
                                max: 100,
                                min: 0,
                                stepSize: 20
                            }
                        }]
                    }
                };
            }
            var myLineChart = new Chart(ctx, {
                type: 'line',
                data: data ,
                options: options
            });
        },
        showSnackBar1: function(msg){
            var snackbarContainer = document.querySelector('#demo-toast-example');
            console.log(snackbarContainer);
            var showToastButton = document.querySelector('#demo-show-toast');
            var data = {message: msg };
            snackbarContainer.MaterialSnackbar.showSnackbar(data);
        },
        manageApp: function(appid,cmd, msg) {
            Common.ajaxPost('/cloudhub/api/applications/'+appid+'/status',
                '{"status":"'+cmd+'", "staticIpAddress": ""}', function(){
                    $('#loadingDiv').hide();
                    RuntimeAppDetails.showSnackBar1(msg);
                });
        },
        init: function() {

            $('.mdl-layout-title').text("Application Details");
            $('.mdl-card__title-text').text(RUNTIME_APP_DETAILS.domain);

            RuntimeAppDetails.populateBasicDetails();

            $('body').unbind().on('click', 'a.stop-app', function() {
                var dialog = document.querySelector('dialog');
                if (! dialog.showModal) {
                    dialogPolyfill.registerDialog(dialog);
                }

                dialog.querySelector('.yes').addEventListener('click', function() {
                    dialog.close();
                    RuntimeAppDetails.manageApp(RUNTIME_APP_DETAILS.domain,'stop','Application will be undeployed');
                });

                dialog.querySelector('.no').addEventListener('click', function() {
                    dialog.close();
                });

                dialog.showModal();
            });

            $('body').on('click', 'a.start-app', function() {
                RuntimeAppDetails.manageApp(RUNTIME_APP_DETAILS.domain,'start','Application will be started');
            });

        }
    };

}();