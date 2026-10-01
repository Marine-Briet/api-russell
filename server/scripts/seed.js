// Seed script: creates a demo user, catways and reservations.
// Usage (from the server/ folder): npm run seed
// Safe to run several times: existing data is never deleted or duplicated.

const mongoose = require('mongoose');
const User = require('../models/users');
const Catway = require('../models/catways');
const Reservation = require('../models/reservations');

// Dates relative to today, so that the demo reservations always look current
const daysFromToday = (days) => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + days);
    return date;
};

const demoUser = {
    username: 'Admin',
    email: 'admin@russell.fr',
    password: 'Russell2026'
};

const demoCatways = [
    { catwayNumber: '1', catwayType: 'long', catwayState: 'Bon état' },
    { catwayNumber: '2', catwayType: 'short', catwayState: 'Bon état' },
    { catwayNumber: '3', catwayType: 'long', catwayState: 'Planche abîmée en bout de ponton' },
    { catwayNumber: '4', catwayType: 'short', catwayState: 'Bon état' }
];

const demoReservations = [
    { catwayNumber: 1, clientName: 'Thomas Martin', boatName: 'Carolina', startDate: daysFromToday(-10), endDate: daysFromToday(15) },
    { catwayNumber: 3, clientName: 'Julie Bernard', boatName: 'Vent du Sud', startDate: daysFromToday(-3), endDate: daysFromToday(4) },
    { catwayNumber: 2, clientName: 'Paul Durand', boatName: 'Albatros', startDate: daysFromToday(30), endDate: daysFromToday(40) }
];

const seed = async () => {
    await mongoose.connect(process.env.URL_MONGO, { dbName: 'api-russell' });
    console.log('Connected to MongoDB');

    // User: created through the model so that the password is hashed by the pre('save') hook
    const existingUser = await User.findOne({ email: demoUser.email });
    if (existingUser) {
        console.log(`- User ${demoUser.email} already exists, skipped`);
    } else {
        await User.create(demoUser);
        console.log(`+ User ${demoUser.email} created`);
    }

    // Catways: skipped if the catway number is already used
    for (const catway of demoCatways) {
        const exists = await Catway.findOne({ catwayNumber: catway.catwayNumber });
        if (exists) {
            console.log(`- Catway ${catway.catwayNumber} already exists, skipped`);
        } else {
            await Catway.create(catway);
            console.log(`+ Catway ${catway.catwayNumber} created`);
        }
    }

    // Reservations: skipped if the same boat already has a reservation on the same catway
    for (const reservation of demoReservations) {
        const exists = await Reservation.findOne({
            catwayNumber: reservation.catwayNumber,
            boatName: reservation.boatName
        });
        if (exists) {
            console.log(`- Reservation for "${reservation.boatName}" already exists, skipped`);
        } else {
            await Reservation.create(reservation);
            console.log(`+ Reservation for "${reservation.boatName}" created`);
        }
    }

    console.log('\nDone. Demo account: admin@russell.fr / Russell2026');
};

seed()
    .catch((error) => {
        console.error('Seed failed:', error.message);
        process.exitCode = 1;
    })
    .finally(() => mongoose.disconnect());