const { Event } = require('../models');
const { eventValidateSchema } = require("../helper/validateAtribute");

exports.listEvents = async (req, res) => {
    try{
        const events = await Event.findAll();
        res.status(200).json({ status: 'Success', events });
    }catch(error){
        console.log(error)
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.createEvent = async (req, res) => {
    try {
      const { title, date, venueName, jumlahTicket } = req.body;
  
      const { error } = eventValidateSchema.validate({ title, date, venueName, jumlahTicket } )
      if(error){
        return res.status(400).json({ message: error.details[0].message });
      }

      // Buat event baru
      const newEvent = await Event.create({
        title,
        date,
        venueName,
        jumlahTicket
      });
  
      // Kembalikan respons sukses
      res.status(201).json({ message: "Event successfully created", event: newEvent });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
};

exports.editEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const { title, date, venueName, jumlahTicket } = req.body;

    const { error } = eventValidateSchema.validate({ title, date, venueName, jumlahTicket });
    if(error){
      return res.status(400).json({ message: error.details[0].message });
    }

    const event = await Event.findByPk(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Update event
    await event.update({ title, date, venueName, jumlahTicket });

    // Kembalikan respons sukses
    res.json({ message: "Event successfully updated", event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;

    const event = await Event.findByPk(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Hapus event
    await event.destroy();

    // Kembalikan respons sukses
    res.json({ message: "Event successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};