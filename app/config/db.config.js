import mongoose from 'mongoose';
import print from '#util/print/index.js';

try {
  const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_HOST, MONGODB_DATABASE } = process.env;
  print.log(`Connecting to MongoDB...`);
  await mongoose.connect(`mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}/${MONGODB_DATABASE}`); 
} catch(err) {
  print.error(err.message);
}