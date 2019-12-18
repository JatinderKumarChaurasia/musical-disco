"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todosRoutes_1 = __importDefault(require("./routes/todosRoutes"));
const body_parser_1 = require("body-parser");
const port = 3000;
// const host = '127.0.0.1';
const app = express_1.default();
app.use(body_parser_1.json());
app.use('/todos', todosRoutes_1.default);
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
    // next();
});
app.listen(port);
