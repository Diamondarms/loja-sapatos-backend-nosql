import { BaseController } from "./base-controller";
import { salesRepository } from "../repositories/sales-repository";
import { SaleModel } from "../models/models";
import { Request, Response } from "express";
import * as salesRep from "../repositories/sales-repository";

export const saleController = new BaseController<SaleModel>(salesRepository);

export const getAllItemSales = async (req: Request, res: Response) => {
    const data = await salesRep.findAllItemSales();
    
    res.status(200).send(data);
};

export const createSaleController = async (req: Request, res: Response): Promise<void> => {
    const { saleData, payment_method_id, items } = req.body;

    if (!saleData || !items || !items.length || !payment_method_id) {
        res.status(400).json({ message: 'Dados da venda, itens ou método de pagamento ausentes.' });
        return;
    }
    const idDaNovaVenda = await salesRep.createCompleteSale(saleData.customer_id, payment_method_id, items);

    res.status(201).json({ 
        message: 'Venda criada com sucesso!',
        sale_id: idDaNovaVenda 
    });
};
