import { Request, Response } from "express";
import * as reportsRepository from "../repositories/reports-repository"; 

export const getProfitByPeriod = async (req: Request, res: Response) => {
    const { begin_date, final_date } = req.query;

    if (!begin_date || !final_date) {
        return res.status(400).send({ message: "As datas 'begin_date' e 'final_date' são obrigatórias." });
    }

    try {
        const data = await reportsRepository.findProfitByPeriod(begin_date as string, final_date as string);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ message: "Erro ao gerar relatório", error });
    }
};

export const getProfitByPeriodAndSupplier = async (req: Request, res: Response) => {
    const { begin_date, final_date, supplier_id } = req.query;

    if (!begin_date || !final_date || !supplier_id) {
        return res.status(400).send({ message: "As datas e o 'supplier_id' são obrigatórios." });
    }

    try {
        const data = await reportsRepository.findProfitByPeriodAndSupplier(
            begin_date as string, 
            final_date as string, 
            supplier_id as string
        );
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ message: "Erro ao gerar relatório", error });
    }
};

export const getProfitByProduct = async (req: Request, res: Response) => {
    const productId = req.params.id;

    try {
        const data = await reportsRepository.findProfitByProduct(productId);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ message: "Erro ao gerar relatório", error });
    }
};

export const getMostUsedMethod = async (req: Request, res: Response) => {
    try {
        const data = await reportsRepository.findMostUsedMethod();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ message: "Erro ao gerar relatório", error });
    }
};

export const getCustomerWithMostPurchases = async (req: Request, res: Response) => {
    try {
        const data = await reportsRepository.findCustomerWithMostPurchases();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ message: "Erro ao gerar relatório", error });
    }
};

export const getProductsBoughtByCustomer = async (req: Request, res: Response) => {
    const customerId = req.params.id;

    try {
        const data = await reportsRepository.ProductsBoughtByCustomer(customerId);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ message: "Erro ao gerar relatório", error });
    }
};

export const getCustomersWhoBoughtProduct = async (req: Request, res: Response) => {
    const productId = req.params.id;

    try {
        const data = await reportsRepository.CustomersWhoBoughtProduct(productId);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ message: "Erro ao gerar relatório", error });
    }
};