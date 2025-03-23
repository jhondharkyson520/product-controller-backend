import dotenv from "dotenv";

dotenv.config();

if(!process.env.JWT_SECRET) {
    throw new Error("Missing environment variable: JWT_SECRET");
}

if(!process.env.DATABASE_URL) {
    throw new Error("Missing environment variable: DATABASE_URL");
}

export const configEnvironment = {
    jwtSecret: process.env.JWT_SECRET,
    databaseURL: process.env.DATABASE_URL,
    port: process.env.PORT || 3000
};
