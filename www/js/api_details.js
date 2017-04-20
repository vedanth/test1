var ApiDetails = function () {
    
    return {
        getApiDetails: function(){
            var selectedOrgId = localStorage.getItem('selectedOrgId');
            var selectedApiId = localStorage.getItem('selectedApiId');
            var selectedApiVersionId = localStorage.getItem('selectedApiVersionId');

            var row ='';

            Common.ajaxGet('/apiplatform/repository/v2/organizations/'+selectedOrgId+'/apis/'+selectedApiId+'/versions/'+selectedApiVersionId+'/policies', function(data){

                    $.each(data, function(key,value) {
                        row = row +' <li class="mdl-list__item mdl-list__item--two-line runtime_app" style="padding: 2px;">'+
                            '<span class="mdl-list__item-primary-content">'+
                            '<i class="material-icons mdl-list__item-avatar" style="background: #ffffff;color: #5483e9;">security</i>'+
                            '<span class="app_name" index="'+key+'">'+value.policyTemplateId+'</span>'+
//                            '<span class="mdl-list__item-sub-title" style="display:none; margin-top: 10px;font-size: 13px; font-weight: 700"><i class="fa icon-calendar-empty" > <span style="font-size: 15px; color: #4773a3">'+date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()+'</span></i><span></span></span>'+
                            '</span>'+
                            '<span class="mdl-list__item-secondary-content">';
                            row = row + '</span>'+
                            '</li>';

                    });

                $('.demo-list-two').html(row);

            });
        },
        getApiStats: function() {

            var selectedOrgId = localStorage.getItem('selectedOrgId');
            var selectedApiId = localStorage.getItem('selectedApiId');
            var selectedApiVersionId = localStorage.getItem('selectedApiVersionId');

            var platforms = {};
            var country = {};
            var appName = {};

            Common.ajaxGet('/analytics/1.0/'+selectedOrgId+'/events?format=json&apiIds='+selectedApiId+'&apiVersionIds='+selectedApiVersionId+'&fields=Application Name,City,Country,OS Family&maxResults=100&duration=1d', function(data){

                    $.each(data, function(key,value) {

                        ApiDetails.fillMap(platforms,value["OS Family"]);
                        ApiDetails.fillMap(country,value["Country"]);
                        ApiDetails.fillMap(appName,value["Application Name"]);

                    });
                console.log(platforms);
                console.log(country);
                console.log(appName);

                ApiDetails.plotBarChart(appName);
                var color =["#FF6384","#36A2EB","#FFCE56"];
                ApiDetails.plotPieChart(country,'by_country', color);
                color =["#36A2EB","#FFCE56","#FF6384"];
                ApiDetails.plotPieChart(platforms,'by_osFamily', color);

                $('#charts').show();
                $('#loadingDiv').hide();
            });
        },
        plotPieChart: function(data, chartId, color) {

            var label = [];
            var dataSet = [];

            for (var key in data) {
                if(data.hasOwnProperty(key)) {
                    label.push(key == 'null' ? 'Unknown': key);
                    dataSet.push(data[key]);
                }
            }

            var data = {
                labels: label,
                datasets: [
                    {
                        data: dataSet,
                        backgroundColor: color
                    }]
            };

            var ctx = $("#"+chartId);
            var myDoughnutChart = new Chart(ctx, {
                type: 'doughnut',
                data: data
            });
        },
        plotBarChart: function(data1){

            var label = [];
            var dataSet = [];

            for (var key in data1) {
                if(data1.hasOwnProperty(key)) {
                    label.push((key == '' || key == 'null') ? 'Unknown' : key.substring(0,15));
                    dataSet.push(data1[key]);
                }
            }

            var data = {
                labels: label,
                datasets: [
                    {
                        label: "Total Requests",
                        backgroundColor: [
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(54, 162, 235, 1)',
                            'rgba(255,99,132,1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1,
                        data: dataSet
                    }
                ]
            };

            var ctx = $("#by_application");
            var myBarChart = new Chart(ctx, {
                type: 'bar',
                data: data
            });
        },
        fillMap: function(map,key){
            if(map[key] != null){
                map[key] = map[key] + 1;
            }else{
                map[key] = 1;
            }
        },
        init: function() {

            $('.mdl-layout-title').text('API Analytics');
            ApiDetails.getApiDetails();
            ApiDetails.getApiStats();

        }
    };

}();