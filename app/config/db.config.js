import mongoose from 'mongoose';
import print from '#util/print/index.js';

try {
  print.log(`Connecting to MongoDB...`);
  await mongoose.connect(process.env.MONGODB_URI); 
} catch(err) {
  print.error(err.message);
}