/**
 * Created by XA on 28-Jul-17.
 */
(function () {
    angular.module("HotelLeagueMaker")
        .factory("messageService", messageService);


    function messageService($http) {


        var api = {
            createMessage: createMessage,
            getMessageBycurrentUser: getMessageBycurrentUser,
            deleteMessage: deleteMessage,
            updateMessage: updateMessage


        };

        return api;


        function updateMessage(message) {

            var url = "/api/updateMessage";
            return $http.put(url, message)
                .then(function (response) {
                    return response;
                });

        }


        function createMessage(messageObj) {

            var url = "/api/createMessage";
            return $http.post(url, messageObj)
                .then(function (response) {
                    return response;
                });
        }

        function getMessageBycurrentUser(user) {
            var url = "/api/getMessages/" + user._id;

            return $http.get(url)
                .then(function (response) {
                    return response;
                });

        }

        function deleteMessage(message) {
            var url = '/api/deleteMessage/' + message._id;

            return $http.delete(url)
                .then(function (result) {
                    return result;
                });

        }


    }


})();