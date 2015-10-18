var app = angular.module('appProto', ['ngRoute', 'ngResource']);

app.controller('indexCtrl', ['$scope', '$sce', function($scope, $sce){
    
    $scope.test = "This is a sanity check";
    console.log($scope.test);
    $scope.plan = {}
    $scope.plan.miles = 0;
    $scope.plan.days = 0;
    $scope.plan.total = 0;
    $scope.plan.runs = runs;
    console.log(runs);
//    $scope.plan.monUrl = $sce.trustAsResourceUrl('https://www.runtastic.com/en/routes#/search?nw_latitude=37.96763381521261&nw_longitude=-122.57988285583491&se_latitude=37.930408444176386&se_longitude=-122.51482319396968&zoom_level=14&clat=37.94902348734078&clng=-122.54735302490229&distance_min=0&distance_max=482803&elevation_gain_min=0&elevation_gain_max=762&sport_type_id=1&page=1');
//    $scope.trustSrc = function(src) {
//        return $sce.trustAsResourceUrl(src);
//    }
   
    $scope.calcTotal = function(){
        
        var findRun = function(dist){
            var res = [];
            $scope.plan.runs.forEach(function(run){
                if(run.distance >= (dist - 0.5) && run.distance <= (dist + 0.5)){
                    res.push(run);
                }
            });
            return res;
        };
        
        
        $scope.plan.days = (($scope.plan.monday ? 1 : 0)
                                                      + ($scope.plan.tuesday ? 1 : 0)
                                                      + ($scope.plan.wednesday ? 1 : 0)
                                                      + ($scope.plan.thursday ? 1 : 0)
                                                      + ($scope.plan.friday ? 1 : 0)
                                                      + ($scope.plan.saturday ? 1 : 0)
                                                      + ($scope.plan.sunday ? 1 : 0));
        
        if($scope.plan.saturday && $scope.plan.sunday && ($scope.plan.days > 3)){
            $scope.plan.satData = $scope.plan.miles * .30;
            $scope.plan.sunData = $scope.plan.miles * .25;
            weekMiles = ($scope.plan.miles * .45) / ($scope.plan.days - 2);
            $scope.plan.monData = $scope.plan.monday ? weekMiles : 0;
            $scope.plan.tuesData = $scope.plan.tuesday ? weekMiles : 0;
            $scope.plan.wedData = $scope.plan.wednesday ? weekMiles : 0;
            $scope.plan.thursData = $scope.plan.thursday ? weekMiles : 0;
            $scope.plan.friData = $scope.plan.friday ? weekMiles : 0;
            
            $scope.plan.satUrl = findRun($scope.plan.satData)[0].map;
            $scope.plan.sunUrl = findRun($scope.plan.sunData)[0].map;
            $scope.plan.monUrl = $scope.plan.monday ? findRun(weekMiles)[0].map : null;
            $scope.plan.tuesUrl = $scope.plan.tuesday ? findRun(weekMiles)[0].map : null;
            $scope.plan.wedsUrl = $scope.plan.wednesday ? findRun(weekMiles)[0].map : null;
            $scope.plan.thursUrl = $scope.plan.thursday ? findRun(weekMiles)[0].map : null;
            $scope.plan.friUrl = $scope.plan.friday ? findRun(weekMiles)[0].map : null;
            
        }else if(($scope.plan.saturday || $scope.plan.sunday) && ($scope.plan.days > 3)){
            weekendMiles = $scope.plan.miles * .30;
            weekMiles = ($scope.plan.miles * .7) / ($scope.plan.days - 1);
            $scope.plan.monData = $scope.plan.monday ? weekMiles : 0;
            $scope.plan.tuesData = $scope.plan.tuesday ? weekMiles : 0;
            $scope.plan.wedData = $scope.plan.wednesday ? weekMiles : 0;
            $scope.plan.thursData = $scope.plan.thursday ? weekMiles : 0;
            $scope.plan.friData = $scope.plan.friday ? weekMiles : 0;
            $scope.plan.satData = $scope.plan.saturday ? weekendMiles : 0;
            $scope.plan.sunData = $scope.plan.sunday ? weekendMiles : 0;
            
            $scope.plan.satUrl = $scope.plan.saturday ? findRun(weekendMiles)[0].map : null;
            $scope.plan.sunUrl = $scope.plan.sunday ? findRun(weekendMiles)[0].map : null;
            $scope.plan.monUrl = $scope.plan.monday ? findRun(weekMiles)[0].map : null;
            $scope.plan.tuesUrl = $scope.plan.tuesday ? findRun(weekMiles)[0].map : null;
            $scope.plan.wedsUrl = $scope.plan.wednesday ? findRun(weekMiles)[0].map : null;
            $scope.plan.thursUrl = $scope.plan.thursday ? findRun(weekMiles)[0].map : null;
            $scope.plan.friUrl = $scope.plan.friday ? findRun(weekMiles)[0].map : null;
        }else{
            $scope.plan.total =  $scope.plan.miles / $scope.plan.days;
            $scope.plan.monData = $scope.plan.monday ? $scope.plan.total : 0;
            $scope.plan.tuesData = $scope.plan.tuesday ? $scope.plan.total : 0;
            $scope.plan.wedData = $scope.plan.wednesday ? $scope.plan.total : 0;
            $scope.plan.thursData = $scope.plan.thursday ? $scope.plan.total : 0;
            $scope.plan.friData = $scope.plan.friday ? $scope.plan.total : 0;
            $scope.plan.satData = $scope.plan.saturday ? $scope.plan.total : 0;
            $scope.plan.sunData = $scope.plan.sunday ? $scope.plan.total : 0;
            
            $scope.plan.satUrl = $scope.plan.saturday ? findRun($scope.plan.total)[0].map : null;
            $scope.plan.sunUrl = $scope.plan.sunday ? findRun($scope.plan.total)[0].map : null;
            $scope.plan.monUrl = $scope.plan.monday ? findRun($scope.plan.total)[0].map : null;
            $scope.plan.tuesUrl = $scope.plan.tuesday ? findRun($scope.plan.total)[0].map : null;
            $scope.plan.wedsUrl = $scope.plan.wednesday ? findRun($scope.plan.total)[0].map : null;
            $scope.plan.thursUrl = $scope.plan.thursday ? findRun($scope.plan.total)[0].map : null;
            $scope.plan.friUrl = $scope.plan.friday ? findRun($scope.plan.total)[0].map : null;
        }
        
        
    };
}]);

app.filter("distance", function(){
    return function(input){
        return input + " miles";
    };
});

//app.service("findRun", )