/**
 * Created by XA on 05-Jul-17.
 */
(function () {

    angular.module("HotelLeagueMaker")
        .controller("userProfileController", userProfileController);

    function userProfileController($route, currentUser, userService, $location) {
        var model = this;

        model.register = register;
        model.logout = logout;
        model.updateUserProfile = updateUserProfile;
        model.unregisterUserProfile = unregisterUserProfile;
        model.currentUser = currentUser;



        function Init() {
            model.userId = currentUser._id;

        }

        Init();

        
        
        function unregisterUserProfile() {

            userService
                .unregisterUserProfile()
                .then(function () {
                    $location.url('/');
                })
            
        }
        
        
        
        

        
        function updateUserProfile(userProfile) {
            model.submitted = true;
            userService
                .updateUserProfile(model.userId, userProfile)
                .then(function () {
                        model.message = "User update was successful.";
                    },
                    function () {

                        model.err = "Cannot Update User";
                    });

            
        }
        
        
        
        
        


        function logout() {
            userService
                .logout()
                .then(function () {
                    $route.reload();
                    $location.url('/');
                })

        }

        function register(firstname, lastname,username, password, password2, email) {
            model.usernamemessage="";
            model.passwordmessage="";
            model.error="";

            if (!username && !password && !password2) {
                model.error = "Incomplete Fields , Cannot Register";
                model.passwordmessage = "Password is Required";
                model.usernamemessage="Username is Required";
                return;
            }

            if(!username){
                model.error = "Incomplete Fields , Cannot Register";
                model.usernamemessage="Username is Required";
                return;
            }

            if(!password || !password2){
                model.error = "Incomplete Fields , Cannot Register";
                model.passwordmessage = "Password is Required";
                return
            }


            if (password !== password2) {
                model.error = "Password must match";
                return;
            }

            userService
                .findUserByUsername(username)
                .then(function () {
                    model.error = "Username is not available";
                }, function () {
                    console.log("this user can be registered");
                    var userNew = {
                        username: username,
                        password: password
                    };

                    return userService
                        .register(userNew);
                })
                .then(function (user) {
                    console.log("after register done",user);
                    $location.url('/');
                });
        }

    }

})();