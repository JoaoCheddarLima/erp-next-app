import mongoose from 'mongoose';

const connection: { isConnected: boolean } = { isConnected: false };

async function connectToDb() {
    if (connection.isConnected) {
        console.log('Already connected to the database')
        return;
    }

    const db = await mongoose.connect(process.env.MONGO_URI!, {
        autoIndex: true,
    });

    connection.isConnected = db.connections[0].readyState == 1;
}

export default connectToDb;