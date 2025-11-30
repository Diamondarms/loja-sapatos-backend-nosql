import { BaseController } from "./base-controller";
import { productsRepository } from "../repositories/products-repository";
import { ProductModel } from "../models/models";
import { Request, Response } from "express";
import * as productsRep from "../repositories/products-repository";

export const productController = new BaseController<ProductModel>(productsRepository);

export const getByName = async (req: Request, res: Response) => {
    const name = req.params.name;

    const data = await productsRep.findByName(name);
    res.status(200).send(data);
};