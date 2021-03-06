/**
 * Created by XA on 31-Jul-17.
 */


module.exports = function () {

    var mongoose = require("mongoose");

    var bookingSchema = mongoose.Schema({
        forUser: String,
        forUserId: String,
        name: String,
        surname: String,
        hotel: {type: mongoose.Schema.Types.ObjectId, ref: "hotelModel"},
        email: String,
        phone: String,
        date: {type: Date, default: Date.now},
        checkinDate: String,
        checkinMonth: String,
        checkinYear: String,
        checkoutDate: String,
        checkoutMonth: String,
        checkoutYear: String,
        MemberCount: String,
        Instructions: String
    }, {collection: "hotelLeague.booking"});

    return bookingSchema;
};