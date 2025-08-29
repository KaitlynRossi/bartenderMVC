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
const drinksRouter = express_1.default.Router();
const prismaC = new client_1.PrismaClient();
drinksRouter.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const drinks = yield prismaC.drink.findMany();
        if (drinks) {
            return res.status(200).json(drinks);
        }
        else {
            return res.status(200);
        }
    }
    catch (Exception) {
        console.error(Exception, 'Error in /drinks');
        return res.status(500);
    }
}));
drinksRouter.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const drinkId = parseInt(req.params.id);
    try {
        const drink = yield prismaC.drink.findFirst({
            where: {
                d_id: drinkId
            }
        });
        if (drink) {
            return res.status(200).json(drink);
        }
        else {
            return res.status(404).send('Drink Not Found');
        }
    }
    catch (Exception) {
        console.error(Exception, 'Error in /drinks/:id');
        return res.status(500);
    }
}));
exports.default = drinksRouter;
