/**
 * Created by XA on 03-Jul-17.
 */
module.exports = function () {
    var model = {};
    var mongoose = require('mongoose');
    var userSchema = require('./user.schema.server')();
    var bcrypt = require("bcrypt-nodejs");
    var userModel = mongoose.model('userModel', userSchema);

    var api = {

        createUser: createUser,
        findUserById: findUserById,
        findAllUser: findAllUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser,
        addWebsite : addWebsite,
        deleteWebsite : deleteWebsite,
        findUserByGoogleId : findUserByGoogleId,
        findUserByFacebookId : findUserByFacebookId,
        setModel: setModel
    };

    return api;



    function findUserByFacebookId(facebookId) {
        return userModel.findOne({'facebook.id': facebookId});
    }





    function findUserByGoogleId(googleId) {
        return userModel
            .findOne({'google.id': googleId});
    }



    function setModel(_model) {
        model = _model;
    }

    function deleteWebsite(userId,websiteId) {
        return userModel
            .findById(userId)
            .then(function (user) {
                var index = user.websites.indexOf(websiteId);
                user.websites.splice(index, 1);
                return user.save();
            });
    }


    function addWebsite(userId, websiteId) {
        return userModel
            .findById(userId)
            .then(function (user) {
                user.websites.push(websiteId);
                return user.save();
            });
    }


    function createUser(user) {
        if(user.roles){
            user.roles = user.roles.split(',');
        }
        else{
            user.roles = ['USER'];
        }
        return userModel.create(user);
    }



    function findUserById(userId) {
        return userModel.findById(userId);
    }



    function findAllUser() {
        return userModel.find();
    }



    function findUserByUsername(username) {
        return userModel.findOne({username: username});
    }



    function findUserByCredentials(username, password) {
        var newPassword = bcrypt.hashSync(password);
        return userModel.findOne({username:username , password: newPassword});
    }



    function updateUser(userId, newUser) {

        if (newUser.roles) {
            if (typeof newUser.roles === 'string' || newUser.roles instanceof String) {
                newUser.roles = newUser.roles.split(',').filter(function (e) {
                    return String(e).trim();
                });
            }
        }
        else {
            newUser.roles = ['USER'];
        }



        delete newUser.username; /*to avoid changing  username*/
        delete newUser.password; /*to avoid changing password*/
        return userModel.update({_id: userId},{$set: newUser});
    }



    function deleteUser(userId) {
        return userModel.remove({_id: userId});
    }

};






