app.controller('QuestionsController', function ($rootScope, $scope, DataService) {
	/**
	 * $scope.tags and $scope.questions are $firebaseArrays from AngularFire 
	 * To see the methods at your disposal look here
	 * https://www.firebase.com/docs/web/libraries/angular/api.html#angularfire-firebasearray
	 * */
    $scope.tags = DataService.getTags();
    $scope.ourStack = DataService.getQuestions();


// Creates initial question
    $scope.discFunc = function () {
        if ($scope.newQ) {
            $scope.newQ.date = Date.now();
            $scope.newQ.likes = 0;
            $scope.newQ.dislikes = 0;
            // $scope.newQ.ans = [];
            $scope.ourStack.$add($scope.newQ).then(function(ref){
                $rootScope.member.questions = $rootScope.member.questions || {};
                $rootScope.member.questions[ref.key()] = ref.key();
                $rootScope.member.$save();
            });
            $scope.newQ = "";
        };
    };

       
// Deletes Question
    $scope.ultraDelete = function (quest) {
        $scope.ourStack.$remove(quest);
    };
 
// Question Voting
       $scope.voteUp = function (newQ) {
           debugger;
           newQ.likes++
           
           $scope.ourStack.$save(newQ);
       }           
       $scope.voteDown = function (newQ) {
           newQ.dislikes--
           $scope.ourStack.$save(newQ);           
       }
       
       
//    Shows Comments
       $scope.showComments = function (quest){
            // $scope.commentsRef = $firebaseArray(new Firebase(FBREF + '/ourStack/' + quest.$id + '/ans'));
            quest.showComment = !quest.showComment;
        }
       
    
	/**
	 * $scope.addQuestion = function(newQuestion){
	 * 	newQuestion.memberId = $rootScope.member.$id;
	 * 	$scope.questions.$add(newQuestion).then(function(ref){
	 * 	  //Add the newly added question to the member object	
	 * 	  $rootScope.member.questions = $rootScope.member.questions || {};
	 *    //Another Dictonary structure all we are doing is adding the questionId to the member.questions dictionary.
	 *    //To avoid duplicating data in our database we only store the questionId instead of the entire question again 
	 *    $rootScope.member.questions[ref.key()] = ref.key();
	 *    $rootScope.member.$save();
	 *  })
	 * }
	 * question Schema
	 * {
	 *  title: string,
	 *  body: string,
	 *  votes: {memberId: number},
	 *  author: string,
	 *  posted: date,
	 *  answeredOn: date,
	 *  answered: bool, 
	 *	tags: [tags] 
	 * } 
	 */


});

app.controller('QuestionController', function ($rootScope, $scope, question, comments, responses) {

    // $scope.ourStack = $firebaseArray(new Firebase(FBREF + 'ourStack'));
	/**
	 * The question, comments, responses arguments being passed into the controller  ^^^^^^^
	 * come from the question route resolve,
	 * Remember that ui-router ensures that the resolve functions finish before loading up the controller
	 *  
	 * $scope.question is $firebaseObject from AngularFire 
	 * To see the methods at your disposal look here
	 * https://www.firebase.com/docs/web/libraries/angular/api.html#angularfire-firebaseobject
	 * 
	 * $scope.comments and $scope.responses are $firebaseArrays
	 * https://www.firebase.com/docs/web/libraries/angular/api.html#angularfire-firebasearray
	 * 
	 * hint: managing votes can be tricky! Actually very tricky! One of the best ways to 
	 * ensure a member can only vote once is to use a dictonary or an object as question.votes 
	 * 
	 * think of it this way 
	 * 
	 * $scope.question.votes[$rootScope.member.$id] = 1 || -1
	 * 
	 * This logic here should help keep your voteCount on track
       $scope.question.voteCount = 0;
	 * for(var key in $scope.question.votes){
	 * 	$scope.question.voteCount += $scope.question.votes[key];
	 * }
	 * 
	 * Don't forget to call $scope.question.$save() after updating the question properties
	 * Also anytime you update $rootScope.member don't forget $rootScope.member.$save() to write it to the db
	 * */
    $scope.quest = question;
    $scope.comments = comments;
    $scope.responses = responses;  
    
    //  db.child('ourStack').child(quest.$id).child('ans').push(quest.response)
    
// Creates Response    
     $scope.respFunc = function (response) {
        if (response) {
           response.date = Date.now();
            response.likes = 0;
            response.dislikes = 0;
            response.bestAnswer = false;
            response.showComment = false;
            $scope.responses.$add(response).then(function(ref){
                $rootScope.member.ans = $rootScope.member.ans || {};
                $rootScope.member.ans[ref.key()] = ref.key();
                $rootScope.member.$save();
            })
            // $scope.ourStack.quest.ans.$save() || {}
            // $scope.ourStack.child(quest.$id).child('ans').$add(quest.response)
            $scope.response = "";
        }
    }

// Selects best answer or sets is answered
        $scope.bestAnswer = function (thing, quest) {
           thing.bestAnswer = !thing.bestAnswer;
           $scope.quest.isAnswered = true;       
    }
// Comments voting
    $scope.cvoteUp = function (response) {
        response.likes++;
        $scope.responses.$save(response);
    }
    $scope.cvoteDown = function (response) {
        response.dislikes--;
        $scope.responses.$save(response);
    }
	
	/**
	 * $scope.addComment = function(newQuestion){
	 * 	newComment.memberId = $rootScope.member.$id;
	 * 	$scope.comments.$add(newQuestion).then(function(ref){
	 * 	  //Add the newly added comment to the member object	
	 * 	  $rootScope.member.comments = $rootScope.member.comments || {};
	 *    //Another Dictonary structure all we are doing is adding the commentId to the member.comments dictionary.
	 *    //To avoid duplicating data in our database we only store the commentId instead of the entire question again 
	 *    $rootScope.member.comments[ref.id] = ref.id;
	 *    $rootScope.member.$save();
	 *  })
	 * }
	 * question Schema
	 * {
	 *  title: string,
	 *  body: string,
	 *  votes: {memberId: number},
	 *  author: string,
	 *  posted: date,
	 *  answeredOn: date,
	 *  answered: bool, 
	 *	tags: [tags] 
	 * } 
	 */
});