const bcrypt = require("bcryptjs");

async function hashPassword() {
    const password = "1234"; // input
    const hashed = await bcrypt.hash(password, 10);
    console.log(hashed);
}

hashPassword();
