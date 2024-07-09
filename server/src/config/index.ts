import 'dotenv/config'

export const config = {
    port: process.env.PORT || 3005,
    allowedOrigins: [
        "http://localhost:3000",
        "https://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    saltRounds: 10,
    jwtSecret: process.env.JWT_SECRET || "89f2e3c5b7d8345a0a6e6c4f9e7b8d0f6b9e8c2a7d1e4f9b8c3e2d1a0b6c5d4",
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d"
}