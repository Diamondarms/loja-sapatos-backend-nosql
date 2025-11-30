import { BaseController } from "./base-controller";
import { customersRepository } from "../repositories/customers-repository";
import { CustomerModel } from "../models/models";
import { Request, Response } from "express";
import * as CustomersRep from "../repositories/customers-repository";

export const categoryController = new BaseController<CustomerModel>(customersRepository);

export const getCustomerByName = async (req: Request, res: Response) => {
    const name = req.params.name;
    const data = await CustomersRep.findByName(name);
    
    res.status(200).send(data);
};

