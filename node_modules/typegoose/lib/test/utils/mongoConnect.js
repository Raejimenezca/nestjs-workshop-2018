"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
dotenv_1.config();
const mongoose = require("mongoose");
const MONGO_PORT = process.env.MONGO_PORT || 27017;
const connect = () => new Promise((resolve, reject) => mongoose.connect(`mongodb://localhost:${MONGO_PORT}/typegoosetest`, {}, (err) => (err ? reject(err) : resolve())));
exports.initDatabase = () => connect().then(() => mongoose.connection.db.dropDatabase());
exports.closeDatabase = () => mongoose.connection.close();
//# sourceMappingURL=mongoConnect.js.map