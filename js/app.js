angular.module("DoList",["ngRoute","LocalStorageModule"])
.config(function($routeProvider){
	$routeProvider
	.when("/",{
		controller : "ListController",
		templateUrl : "templates/home.html"
	})
	.when("/add/list",{
		controller: "addController",
		templateUrl: "templates/add.html"
	})
	.when("/edit/list/:data",{
		templateUrl: "templates/add.html",
		controller: "editController"
	})
	.otherwise("/")
});