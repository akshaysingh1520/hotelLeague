/**
 * Created by XA on 06-Aug-17.
 */
(function () {

    angular.module("HotelLeagueMaker")
        .controller("reservationController", reservationController);

    function reservationController($route, messageService, currentUser, bookingService, userService, $location) {
        var model = this;

        model.login = login;
        model.logout = logout;
        model.searchUser = searchUser;
        model.showUserDetails = showUserDetails;
        model.addAsFollower = addAsFollower;
        model.removeAsFollower = removeAsFollower;
        model.currentUser = currentUser;
        model.getAllBookingsForUser = getAllBookingsForUser;
        model.deleteBooking = deleteBooking;
        model.addAsFavoriteBooking = addAsFavoriteBooking;
        model.removeAsFavoriteBooking = removeAsFavoriteBooking;
        model.getAllFavoriteBookingsForUser = getAllFavoriteBookingsForUser;
        model.getMessageBycurrentUser = getMessageBycurrentUser;
        model.getNewMessageCount = getNewMessageCount;
        model.getHotelPhotoUrlForBooking = getHotelPhotoUrlForBooking;


        function init() {
            getMessageBycurrentUser();
            model.getAllBookingsForUser();
            model.getAllFavoriteBookingsForUser();
            model.showUserDetailsFlag = false;
        }

        init();



        function getHotelPhotoUrlForBooking(booking) {
            var url = "";

            if(booking){
                url = booking.hotel.photoUrl;
            }
            else{
                url = "";
            }

            return url;
        }







        function deleteBooking(booking) {
            bookingService.deleteBooking(booking)
                .then(function (result) {
                    $route.reload();
                    return result;
                })
        }


        function getNewMessageCount(messageArray) {
            model.newMessageCountVar = 0;
            for (var i in messageArray) {
                if (messageArray[i].isMessageNew === 'NEW') {
                    model.newMessageCountVar = model.newMessageCountVar + 1;
                }
            }

            /*console.log("model.newMessageCountVar",model.newMessageCountVar)*/

        }


        function getMessageBycurrentUser() {
            messageService.getMessageBycurrentUser(model.currentUser)
                .then(function (result) {
                    model.allMessages = result.data;
                    model.getNewMessageCount(model.allMessages);
                    /*console.log("This all Messages for user", model.allMessages)*/
                }, function (error) {
                    console.log(error)
                });
        }


        function getAllFavoriteBookingsForUser() {

            bookingService.getAllFavoriteBookingsForUser()
                .then(function (result) {
                    /*console.log("Fav bookings in controller", result);*/
                    model.favoritebookings = result.data;
                    /*console.log("model.favoritebookings", model.favoritebookings);*/
                })

        }


        function addAsFavoriteBooking(booking) {

            model.currentUser.favoriteHotelBooking.push(booking._id);
            userService.updateUserProfile(model.currentUser._id, model.currentUser)
                .then(function (result) {
                    $route.reload();
                    return result;
                });
        }


        function removeAsFavoriteBooking(booking) {
            var index = model.currentUser.favoriteHotelBooking.indexOf(booking._id);
            if (index >= 0) {
                model.currentUser.favoriteHotelBooking.splice(index, 1);
                userService.updateUserProfile(model.currentUser._id, model.currentUser)
                    .then(function (result) {
                        $route.reload();
                        return result;
                    });

            }
        }


        function getAllBookingsForUser() {

            bookingService.getBookingBycurrentUser()
                .then(function (result) {
                    model.bookings = result.data;
                    /*console.log("model.bookings", model.bookings);*/
                })
        }


        function addAsFollower(user) {
            /*console.log("Current card User", user);*/

            userService.findUserByUsername(currentUser.username)
                .then(function (result) {
                    if (result.following.indexOf(user._id) < 0) {
                        result.following.push(user._id);
                        userService.updateUserProfile(result._id, result)
                            .then(function (output) {
                                /*console.log("This is the updated User",output);*/

                                if (user.followedBy.indexOf(result._id) < 0) {
                                    user.followedBy.push(result._id);
                                    userService.updateUserProfile(user._id, user)
                                        .then(function (response) {
                                            /*console.log("This is the updated followed User",response);*/
                                        })
                                }
                            })
                    }
                    /*console.log("This is the returned user outside if", result);*/

                }, function (error) {
                    console.log("This is the returned error.", error);
                })


        }


        function removeAsFollower(user) {
            /*console.log("Current User", user);*/

            userService.findUserByUsername(currentUser.username)
                .then(function (result) {
                    if (result.following.indexOf(user._id) >= 0) {
                        var index = result.following.indexOf(user._id);
                        result.following.splice(index, 1);
                        userService.updateUserProfile(result._id, result)
                            .then(function (output) {
                                /*console.log("This is the updated User",output);*/

                                if (user.followedBy.indexOf(result._id) >= 0) {
                                    var index2 = user.followedBy.indexOf(result._id);
                                    user.followedBy.splice(index2, 1);
                                    userService.updateUserProfile(user._id, user)
                                        .then(function (response) {
                                            /*console.log("This is the updated followed User",response);*/
                                        })
                                }
                            })
                    }
                    /*console.log("This is the returned user outside if", result);*/

                }, function (error) {
                    console.log("This is the returned error.", error);
                })

        }


        function showUserDetails(user) {
            model.showUserDetailsFlag = true;
            model.thisusername = user.username;
            model.thisfirstName = user.firstName;
            model.thislastName = user.lastName;
            model.thisemailId = user.emailId;
            model.thisphone = user.phone;
        }

        function searchUser(username) {
            model.showUserDetailsFlag = false;
            userService
                .findUserByUsernameRegex(username)
                .then(function (result) {
                    model.foundUsers = result;
                })
        }


        function logout() {
            userService
                .logout()
                .then(function () {
                    $route.reload();
                    $location.url('/');
                })

        }


        function login(username, password) {

            model.usernamemessage = "";
            model.passwordmessage = "";
            model.error = "";


            if (!username && !password) {
                model.usernamemessage = "Username is Required";
                model.passwordmessage = "Password is Required";
                model.error = "Incomplete Credentials";
            }
            else if (!password) {
                model.passwordmessage = "Password is Required";
                model.error = "Incomplete Credentials";
            }

            else if (!username) {
                model.usernamemessage = "Username is Required";
                model.error = "Incomplete Credentials";
            }
            else {

                userService
                    .login(username, password)
                    .then(function (found) {
                        /*console.log(found);*/
                        if (found !== null) {
                            model.message = "Welcome " + username;
                            $location.url('/');
                        }
                        else {
                            model.error = "Sorry, " + username + " not found. Please try again.";
                        }

                    }, function () {
                        model.error = "Sorry, " + username + " not found or mismatch of Credentials. Please try again.";
                    });

            }
        }


    }

})();