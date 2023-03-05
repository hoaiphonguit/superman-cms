import * as mongoose from 'mongoose';
const Db = process.env.ATLAS_URI;

export const connectToServer = async () => {
    try {
        await mongoose.connect(Db);

        console.log('MongoDB connected');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};
