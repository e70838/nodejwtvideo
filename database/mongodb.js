import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URL + '?retryWrites=true&w=majority');

export default mongoose;
