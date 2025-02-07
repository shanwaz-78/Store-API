import 'dotenv/config';

export const config = {
    port: process.env.PORT || "8080",
    MONGO_URI: process.env.MONGO_URI,
    rateLimitOptions: {
        windowMs: 15 * 60 * 1000,
        max: 100,
        standardHeaders: true,
    }
}