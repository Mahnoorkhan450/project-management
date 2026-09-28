import "dotenv/config";

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error("JWT_SECRET is not configured in .env");
}

export const JWT_SECRET: string = jwtSecret;

export const PORT: number =
  Number(process.env.PORT) || 5000;