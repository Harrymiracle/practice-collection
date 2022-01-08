var myModule = angular.module("MyModule", []);
myModule.directive("hello", function() {
    return {
        restrict: 'EC',
        template: '<div>Hi everyone!</div>',
        replace: true
    }
});