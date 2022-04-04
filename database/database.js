const mongoose = require('mongoose');

const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connected to database successfully');
    }
    catch (err) {
        console.log(err);
        console.log('Connected to database failure');
        process.exit(1);
    }
}

module.exports = connection;