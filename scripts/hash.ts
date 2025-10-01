const bcrypt = require("bcryptjs");
const { randomBytes } = require("crypto");

async function hashPassword() {
    const password = "aapje"; // input
    const hashed = await bcrypt.hash(password, 10);
    console.log(hashed);
}

async function genAapiKey() {
    console.log(`client_${randomBytes(16).toString("hex")}`);
}

hashPassword();
