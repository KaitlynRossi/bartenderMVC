import express, { response } from "express";
import { AppError } from "../models/AppError.model";
import { PrismaClient } from '@prisma/client';

const drinksRouter = express.Router();
const prismaC = new PrismaClient();

drinksRouter.get('/', async (req, res, next)=> {
    try{
        const drinks = await prismaC.drink.findMany();

        if(drinks){
            return res.status(200).json(drinks);
        }else{
            return res.status(200);
        }
    }catch(Exception){
        console.error(Exception, 'Error in /drinks');
        return res.status(500);
    }
    
});

drinksRouter.get('/:id', async (req, res, next) => {
    const drinkId = parseInt(req.params.id);
    try{
        const drink = await prismaC.drink.findFirst({
            where: {
                d_id: drinkId
            }
        });

        if(drink){
            return res.status(200).json(drink);
        }else {
            return res.status(404).send('Drink Not Found');
        }

    }catch(Exception){
        console.error(Exception, 'Error in /drinks/:id');
        return res.status(500);
    }
});


export default drinksRouter;