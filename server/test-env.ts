import dotenv from 'dotenv';
dotenv.config();

console.log("JWT_SECRET is:", process.env.JWT_SECRET ? "DEFINED" : "NOT DEFINED");
if (process.env.JWT_SECRET) {
    console.log("JWT_SECRET value:", process.env.JWT_SECRET);
}
