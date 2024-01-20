const mongoose = require('mongoose');

const connectToDb = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URL)
        .then((conn)=>{
            console.log(`Connected to database: ${conn.connection.host}`);
        })
    } catch (e) {
        console.log(e.message);
    }
}

module.exports = connectToDb;