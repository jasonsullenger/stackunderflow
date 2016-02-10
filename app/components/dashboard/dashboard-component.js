app.controller('DashboardController', function($rootScope, $scope){
   $scope.editing=false
    
    $rootScope.submitForm = function(){
        
            $rootScope.member.$save();
            $scope.editing=false;
            
        
    }
    
    $scope.showForm= function(){
        $scope.editing=!$scope.editing
    }

});
    // $rootScope.member= {
    //     userName: '',
	// 	firstName: '',
	// 	lastName: '',
	// 	imgUrl:  '',
	// 	country: '',
	// 	bio: '',
	// 	websiteUrl: '',
	// 	github: '',
	// 	twitterHandle: '',
	// 	favoriteTags: [],
		
        
    //     // accountCreated: date,
	// 	// upVotes: number,
	// 	// downVotes: number,
	// 	// reputation: number,
	// 	// questions: [questionId],
	// 	// answers: [answerId],
	// 	// comments: [commentId]
    // }
	//  * To edit the member object you must go through $rootScope.member
	//  * $rootScope.member is a $firebaseObject from AngularFire 
	//  * To see the methods at your disposal look here
	//  * https://www.firebase.com/docs/web/libraries/angular/api.html#angularfire-firebaseobject
	//  * 
	//  * Don't forget to call $rootScope.member.$save() after making changes to the $rootScope.member object
	//  * 
	//  * */
	