import mongoose from 'mongoose';
import { getEnvVar } from '../utils/env.js';

export async function initMongoConnection() {
  const url = getEnvVar('MONGODB_URL');
  const user = getEnvVar('MONGODB_USER');
  const password = getEnvVar('MONGODB_PASSWORD');
  const db = getEnvVar('MONGODB_DB');

  const URI = `mongodb+srv://${encodeURIComponent(user)}:${encodeURIComponent(
    password,
  )}@${url}/${db}?retryWrites=true&w=majority`;

  await mongoose.connect(URI);
  console.log('Mongo connection successfully established!');
}
