import dotenv from 'dotenv';
dotenv.config();

const getEnv = (envKey: string) => process.env[envKey]
export default getEnv;