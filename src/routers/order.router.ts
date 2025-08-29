import express, { response } from "express";
import { AppError } from "../models/AppError.model";
import { PrismaClient } from '@prisma/client';

const orderRouter = express.Router();
const prismaC = new PrismaClient();

orderRouter.get('/', async (req, res, next) => {
    try{
        const orders = await prismaC.order.findMany();

        if(orders){
            return res.status(200).json(orders);
        }else{
            return res.status(200);
        }
    }catch(Exception){
        console.error(Exception, 'Something went wrong getting the orders');
        return res.status(500);
    }
});

orderRouter.get('/:id', async (req, res, next) => {
    const orderId = parseInt(req.params.id);
    try{
        const order = await prismaC.order.findFirst({
            where: {
                o_id: orderId
            }
        });

        if(order){
            return res.status(200).json(order);
        }else{
            return res.status(404).json('Order Not Found');
        }
    }catch(Exception){
        console.error(Exception, 'Something went wrong getting the order');
        return res.status(500);
    }
});

orderRouter.post('/:id/create', async (req, res, next) => {
    const drinkId = parseInt(req.params.id);

    if(!drinkId){
        return res.status(404).json('Drink Id Not Found, Cannot Create Order');
    }

    try{
        const drink = await prismaC.drink.findFirst({
            where: {
                d_id: drinkId
            }
        });

        if(drink){
            const newOrder = await prismaC.order.create({
                data: {
                    drink_id: drinkId,
                    status: 'new',
                }
            });

            if(newOrder){
                return res.status(200).json(newOrder);
            }else{
                return res.status(400).json('New Order could not be Created');
            }
        }else{
            return res.status(404).json('Drink Not Found, Cannot Create Order');
        }
    }catch(Exception){
        console.error(Exception, 'Something went wrong creating the order');
        return res.status(500);
    }
});

orderRouter.patch('/:id/update', async (req, res, next) => {
    const orderId = parseInt(req.params.id);
    const { serverName, status } = req.body;
    const updateData:any = {};

    if(serverName){
        updateData.serverName = serverName;
    }else if(status){
        updateData.status = status;
    }else if(orderId){
        return res.status(404).json('OrderId is Missing!');
    }else {
        return res.status(404).json('Required Input is Missing!');
    }

    try{

        const updatedOrder = await prismaC.order.update({
            where: {
                o_id: orderId
            },
            data: {
                server: serverName,
                status: status
            }
        });

        if(updatedOrder){
            return res.status(200).json(updatedOrder);
        }else {
            return res.status(400).json('Could not Update Order');
        }

    }catch(Exception){
        console.error(Exception, 'Something went wrong updating the order');
        return res.status(500);
    }
});

export default orderRouter;