angular.module("DoList")
.factory("DatosList",function(localStorageService){
	var DatoList = {};
	DatoList.obtener = function(){
		if(localStorageService.get("DoList")){
			DatoList.actividades = localStorageService.get("DoList");
		}else{
			DatoList.actividades =[];
		}
		return DatoList.actividades;
	}

		return DatoList;
	})
.controller("ListController",function($scope,localStorageService,DatosList){
	$scope.actividades = DatosList.obtener();
	$scope.deleteItem = function(act){
		$scope.actividades = $scope.actividades.filter(function(activi){
			return activi !== act; 
		});
		localStorageService.set("DoList",$scope.actividades);
	}

})
.controller("addController",function($scope,DatosList,$location,localStorageService){
    $('.datepicker').pickadate({selectYears: 20});
	$scope.actividades = DatosList.obtener();
	//console.log($scope.actividades);
	 $scope.addActividad = function(){
	 		$scope.newActividad.fecha = $('.datepicker').val();
	 		$scope.actividades.push($scope.newActividad);
			localStorageService.set("DoList",$scope.actividades);
			$scope.NewActividad = {};
			$location.path("/");
		}
})
.controller("editController",function($scope,$routeParams,$location,localStorageService,DatosList){
    $('.datepicker').pickadate({selectYears: 20});
    $( "#titulo" ).focus();
	$scope.newActividad = {};
	$scope.actividades = DatosList.obtener();
	//recibo los parametros y los muestros
	$scope.newActividad.titulo = (JSON.parse($routeParams.data)).titulo;
	$scope.newActividad.descripcion = (JSON.parse($routeParams.data)).descripcion;
	$('.datepicker').val("7 October, 2015");
	$scope.addActividad = function(){
		$scope.actividades = $scope.actividades.filter(function(act){
			if($routeParams.data == JSON.stringify(act)){
				act.titulo = $scope.newActividad.titulo;
				act.fecha = $('.datepicker').val();
				act.descripcion = $scope.newActividad.descripcion;
			}
			return act;
		});
	localStorageService.set("DoList",$scope.actividades);
	$location.path("/");
	}

});