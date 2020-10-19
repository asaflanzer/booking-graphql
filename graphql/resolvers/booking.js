// models
const Booking = require('../../models/booking');
const Event = require('../../models/event');
// merge functions
const { transformBooking, transformEvent } = require('./merge');

module.exports = {
  bookings: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated');
    }
    try {
      // get only the booking of the user logged in
      const bookings = await Booking.find({ user: req.userId });

      console.log('await bookings', bookings);
      return bookings.map((booking) => {
        return transformBooking(booking);
      });
    } catch (err) {
      throw err;
    }
  },
  bookEvent: async ({ eventId }, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated');
    }
    const fetchedEvent = await Event.findOne({ _id: eventId });

    const booking = new Booking({
      user: req.userId, // '5f81b24354b30f22148fb198'
      event: fetchedEvent,
    });

    try {
      const result = await booking.save();

      return transformBooking(result);
    } catch (err) {
      throw err;
    }
  },
  cancelBooking: async ({ bookingId }, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated');
    }

    // NEED TO FIX: check the user is the user whom created this booking
    try {
      const booking = await Booking.findById(bookingId).populate('event');
      // get poplutated data on event
      const event = transformEvent(booking.event);
      await Booking.deleteOne({ _id: bookingId });

      return event;
    } catch (err) {
      throw err;
    }
  },
};
