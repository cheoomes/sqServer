const bcrypt = require("bcryptjs");
const { randomBytes } = require("crypto");

async function hashPassword() {
    const password = "1234"; // input
    const hashed = await bcrypt.hash(password, 10);
    console.log(hashed);
}

async function genAapiKey() {
    console.log(`client_${randomBytes(16).toString("hex")}`);
}

genAapiKey();
