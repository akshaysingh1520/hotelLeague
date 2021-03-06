/**
 * Created by XA on 26-Jul-17.
 */

module.exports = function () {
    var model = {};
    var mongoose = require('mongoose');
    var messageSchema = require('./message.schema.server')();
    var bcrypt = require("bcrypt-nodejs");
    var messageModel = mongoose.model('messageModel', messageSchema);

    var api = {

        createMessage: createMessage,
        findMessageByReceiverId: findMessageByReceiverId,
        deleteMessage: deleteMessage,
        updateMessage: updateMessage,
        setModel: setModel
    };

    return api;


    function updateMessage(message) {

        return messageModel.update({_id: message._id}, {$set: message});

    }


    function setModel(_model) {
        model = _model;
    }

    function deleteMessage(messageId) {
        return messageModel.remove({_id: messageId});
    }


    function createMessage(message) {

        return messageModel.create(message);
    }


    function findMessageByReceiverId(uid) {
        return messageModel.find({forUserId: uid}).sort({date: -1});
    }


};