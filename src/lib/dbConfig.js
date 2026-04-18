const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("MongoDB connected");
        });

        connection.on('error', (err) => {
            console.log("MongoDB connection error: " + err);
            process.exit(1);
        });

    } catch (error) {
        console.log(error);
    }
}

module.exports = { connect };