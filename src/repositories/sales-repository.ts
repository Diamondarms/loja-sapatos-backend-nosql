import { Model, Document } from "mongoose";
import { Sale, Product } from "../models/schemas";
import { SaleModel } from "../models/models";
import { BaseRepository } from "./base-repository";


class SalesRepository extends BaseRepository<SaleModel> {
  constructor(model: Model<SaleModel>) {
    super(model);
  }

  async findAll(): Promise<SaleModel[]> {
    return this.model.find().sort({ sale_date: -1 }).exec();
  }
}

export const salesRepository = new SalesRepository(Sale);

export const findAllItemSales = async () => {
    const result = await Sale.aggregate([
        { $unwind: "$items" },
        {
            $project: {
                _id: 0,
                sale_id: "$_id",
                product_id: "$items.product_id",
                quantity: "$items.quantity",
                unit_price: "$items.unit_price"
            }
        }
    ]);
    return result;
}

export const createCompleteSale = async (
    customerId: string, 
    methodId: string, 
    items: { product_id: string, quantity: number }[]
): Promise<string> => {

    const finalItems = [];
    let totalAmount = 0;

    for (const item of items) {
        const product = await Product.findById(item.product_id);

        if (!product) {
            throw new Error(`Produto ID ${item.product_id} não encontrado.`);
        }

        if (product.stock < item.quantity) {
            throw new Error(`Estoque insuficiente para o produto ${product.name}.`);
        }

        await Product.findByIdAndUpdate(item.product_id, {
            $inc: { stock: -item.quantity } 
        });

        finalItems.push({
            product_id: item.product_id,
            quantity: item.quantity,
            unit_price: product.sale_price
        });

        totalAmount += product.sale_price * item.quantity;
    }

    const newSale = await Sale.create({
        customer_id: customerId,
        method_id: methodId,
        items: finalItems,
        total_amount: totalAmount,
        sale_date: new Date()
    });

    return newSale._id as string;
};