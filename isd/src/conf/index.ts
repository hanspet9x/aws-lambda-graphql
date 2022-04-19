import dotenv from 'dotenv';
dotenv.config();

const getEnv = (envKey: string, defaultValue = "") => process.env[envKey] ?? defaultValue;
export default getEnv;