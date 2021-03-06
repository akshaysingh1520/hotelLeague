/**
 * Created by XA on 01-Jul-17.
 */
(function () {
    angular.module("HotelLeagueMaker")
        .config(hotelLeagueConfiguration);

    function hotelLeagueConfiguration($routeProvider) {

        $routeProvider
            .when('/', {
                templateUrl:'views/home/templates/home.view.client.html',
                controller: "homeController",
                controllerAs: "model",
                resolve:{
                    currentUser: checkCurrentLoggedInUser
                }
            })
            .when('/information/:hotelId', {
                templateUrl:'views/home/templates/hotelInformation.view.client.html',
                controller: "hotelInformationController",
                controllerAs: "model",
                resolve:{
                    currentUser: checkCurrentLoggedInUser
                }
            })
            .when('/details/:hotelId', {
                templateUrl:'views/hotelDetails/templates/hotel-details.view.client.html',
                controller: "hotelDetailsController",
                controllerAs: "model",
                resolve:{
                 currentUser: checkLoggedInUser
                 }
            })
            .when('/login', {
                templateUrl:'views/user/templates/user-login.view.client.html',
                controller: "userLoginController",
                controllerAs: "model",
                resolve:{
                    currentUser: checkNoUserLoggedIn
                }
            })
            .when('/register', {
                templateUrl:'views/user/templates/user-register.view.client.html',
                controller: "userRegisterController",
                controllerAs: "model",
                resolve:{
                    currentUser: checkNoUserLoggedIn
                }
            })
            .when('/profile', {
                templateUrl:'views/user/templates/user-profile.view.client.html',
                controller: "userProfileController",
                controllerAs: "model",
                resolve:{
                    currentUser: checkLoggedInUser
                }
            })
            .when('/people', {
                templateUrl:'views/people/templates/search-people.view.client.html',
                controller: "searchPeopleController",
                controllerAs: "model",
                resolve:{
                    currentUser: checkLoggedInUser
                }
            })
            .when('/inbox', {
                templateUrl:'views/message/templates/message-inbox.view.client.html',
                controller: "messageInboxController",
                controllerAs: "model",
                resolve:{
                    currentUser: checkLoggedInUser
                }
            })
            .when('/following', {
                templateUrl:'views/people/templates/following-people.view.client.html',
                controller: "followingController",
                controllerAs: "model",
                resolve:{
                    currentUser: checkLoggedInUser
                }
            })
            .when('/follower', {
                templateUrl:'views/people/templates/follower-people.view.client.html',
                controller: "followerController",
                controllerAs: "model",
                resolve:{
                    currentUser: checkLoggedInUser
                }
            })
            .when('/reservation', {
                templateUrl:'views/hotelDetails/templates/reservation.view.client.html',
                controller: "reservationController",
                controllerAs: "model",
                resolve:{
                    currentUser: checkLoggedInUser
                }
            })
            .when('/admin', {
                templateUrl:'views/people/templates/admin-people.view.client.html',
                controller: "adminController",
                controllerAs: "model",
                resolve:{
                    currentUser: checkAdminUser
                }
            });

    }



    function checkAdminUser(userService, $q, $location) {
        var deferred = $q.defer();
        userService.checkAdminUser()
            .then(function (user) {
                if(user === '0'){
                    deferred.reject();
                    $location.url('/');
                }else{
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }




    function checkLoggedInUser(userService, $q, $location) {
        var deferred = $q.defer();
        userService.checkLoggedInUser()
            .then(function (user) {
                if(user === '0'){
                    deferred.reject();
                    alert("Please Login to Continue...");
                    $location.url('/login');
                }else{
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }




    function checkNoUserLoggedIn(userService, $q, $location) {
        var deferred = $q.defer();
        userService.checkLoggedInUser()
            .then(function (user) {
                if(user === '0'){
                    deferred.resolve({});

                }else{
                    deferred.resolve(user);
                    alert("Already Logged in...");
                    $location.url('/');
                }
            });
        return deferred.promise;
    }





    function checkCurrentLoggedInUser(userService, $q, $location) {
        var deferred = $q.defer();
        userService.checkLoggedInUser()
            .then(function (user) {
                if(user === '0'){
                    deferred.resolve({});
                    /*$location.url('/login');*/
                }else{
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }








})();