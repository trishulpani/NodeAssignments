angsocketApp
    .filter('chkEmpty',function(){
        return function(input){
            if(angular.isString(input) && !(angular.equals(input,null) || angular.equals(input,'')))
                return input;
            else
                return '&nbsp;';
        };
    });