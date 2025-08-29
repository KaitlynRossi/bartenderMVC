"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const drinks_router_1 = __importDefault(require("./routers/drinks.router"));
const order_router_1 = __importDefault(require("./routers/order.router"));
const app = (0, express_1.default)();
const allowedOrigins = ['http://localhost3000', 'http://localhost:5173'];
const options = {
    origin: allowedOrigins,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
};
app.use((0, cors_1.default)(options));
app.use(express_1.default.json());
app.use('/drinks', drinks_router_1.default);
app.use('/orders', order_router_1.default);
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running`);
});
