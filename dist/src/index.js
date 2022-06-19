"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.get('*', (_, res) => res.status(404).json({ message: '404' }));
app.use(express_1.default.json({ limit: "1000mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "1000mb" }));
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)({ credentials: true, origin: true }));
app.use((0, helmet_1.default)());
const PORT = (_a = process.env.port) !== null && _a !== void 0 ? _a : 4000;
(() => {
    app.listen(PORT, () => {
        console.log(`server is listening on port : ${PORT} `);
    });
})();
