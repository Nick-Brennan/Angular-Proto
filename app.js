var app = angular.module('appProto', ['ngRoute', 'ngResource']);

app.controller('indexCtrl', ['$scope', '$sce', function($scope, $sce){
    
    $scope.test = "This is a sanity check";
    console.log($scope.test);
    $scope.plan = {}
    $scope.plan.miles = 0;
    $scope.plan.days = 0;
    $scope.plan.total = 0;
//    $scope.plan.monUrl = $sce.trustAsResourceUrl('https://www.runtastic.com/en/routes#/search?nw_latitude=37.96763381521261&nw_longitude=-122.57988285583491&se_latitude=37.930408444176386&se_longitude=-122.51482319396968&zoom_level=14&clat=37.94902348734078&clng=-122.54735302490229&distance_min=0&distance_max=482803&elevation_gain_min=0&elevation_gain_max=762&sport_type_id=1&page=1');
//    $scope.trustSrc = function(src) {
//        return $sce.trustAsResourceUrl(src);
//    }
   
    $scope.calcTotal = function(){
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
        }else{
            $scope.plan.total =  $scope.plan.miles / $scope.plan.days;
            $scope.plan.monData = $scope.plan.monday ? $scope.plan.total : 0;
            $scope.plan.tuesData = $scope.plan.tuesday ? $scope.plan.total : 0;
            $scope.plan.wedData = $scope.plan.wednesday ? $scope.plan.total : 0;
            $scope.plan.thursData = $scope.plan.thursday ? $scope.plan.total : 0;
            $scope.plan.friData = $scope.plan.friday ? $scope.plan.total : 0;
            $scope.plan.satData = $scope.plan.saturday ? $scope.plan.total : 0;
            $scope.plan.sunData = $scope.plan.sunday ? $scope.plan.total : 0;
        }
    };
}]);