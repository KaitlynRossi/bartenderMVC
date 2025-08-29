"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const orderRouter = express_1.default.Router();
const prismaC = new client_1.PrismaClient();
orderRouter.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield prismaC.order.findMany();
        if (orders) {
            return res.status(200).json(orders);
        }
        else {
            return res.status(200);
        }
    }
    catch (Exception) {
        console.error(Exception, 'Something went wrong getting the orders');
        return res.status(500);
    }
}));
orderRouter.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = parseInt(req.params.id);
    try {
        const order = yield prismaC.order.findFirst({
            where: {
                o_id: orderId
            }
        });
        if (order) {
            return res.status(200).json(order);
        }
        else {
            return res.status(404).json('Order Not Found');
        }
    }
    catch (Exception) {
        console.error(Exception, 'Something went wrong getting the order');
        return res.status(500);
    }
}));
orderRouter.post('/:id/create', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const drinkId = parseInt(req.params.id);
    if (!drinkId) {
        return res.status(404).json('Drink Id Not Found, Cannot Create Order');
    }
    try {
        const drink = yield prismaC.drink.findFirst({
            where: {
                d_id: drinkId
            }
        });
        if (drink) {
            const newOrder = yield prismaC.order.create({
                data: {
                    drink_id: drinkId,
                    status: 'new',
                }
            });
            if (newOrder) {
                return res.status(200).json(newOrder);
            }
            else {
                return res.status(400).json('New Order could not be Created');
            }
        }
        else {
            return res.status(404).json('Drink Not Found, Cannot Create Order');
        }
    }
    catch (Exception) {
        console.error(Exception, 'Something went wrong creating the order');
        return res.status(500);
    }
}));
orderRouter.patch('/:id/update', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = parseInt(req.params.id);
    const { serverName, status } = req.body;
    const updateData = {};
    if (serverName) {
        updateData.serverName = serverName;
    }
    else if (status) {
        updateData.status = status;
    }
    else if (orderId) {
        return res.status(404).json('OrderId is Missing!');
    }
    else {
        return res.status(404).json('Required Input is Missing!');
    }
    try {
        const updatedOrder = yield prismaC.order.update({
            where: {
                o_id: orderId
            },
            data: {
                server: serverName,
                status: status
            }
        });
        if (updatedOrder) {
            return res.status(200).json(updatedOrder);
        }
        else {
            return res.status(400).json('Could not Update Order');
        }
    }
    catch (Exception) {
        console.error(Exception, 'Something went wrong updating the order');
        return res.status(500);
    }
}));
exports.default = orderRouter;
