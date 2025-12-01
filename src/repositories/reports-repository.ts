import mongoose from "mongoose";
import { Sale } from "../models/schemas";

export const findProfitByPeriod = async (begin_date: string, final_date: string): Promise<any> => {
    const start = new Date(begin_date);
    const end = new Date(final_date);

    const result = await Sale.aggregate([
        {
            $match: {
            sale_date: { $gte: start, $lte: end }
            }
        },
        { $unwind: "$items" },
        {
            $lookup: {
            from: "products",                
            localField: "items.product_id",  
            foreignField: "_id",             
            as: "product_info"
            }
        },
        { $unwind: "$product_info" },
        {
            $group: {
            _id: null,
            profit: {
                $sum: {
                $multiply: [
                    "$items.quantity",
                    { $subtract: ["$product_info.sale_price", "$product_info.purchase_price"] }
                ]
                }
            }
            }
        },
        { $project: { _id: 0, profit: 1 } }
    ]);

    return result[0] || { profit: 0 };
}

export const findProfitByPeriodAndSupplier = async (begin_date: string, final_date: string, supplier_id: string): Promise<any> => {
    const start = new Date(begin_date);
    const end = new Date(final_date);

    const result = await Sale.aggregate([
        { 
            $match: { sale_date: { $gte: start, $lte: end } } 
        },
        { $unwind: "$items" },
        {
            $lookup: {
                from: "products",
                localField: "items.product_id",
                foreignField: "_id",
                as: "product_details"
            }
        },
        { $unwind: "$product_details" },
        { 
            $match: { 
                "product_details.supplier_id": new mongoose.Types.ObjectId(supplier_id) 
            } 
        },
        { 
            $group: { 
                _id: null, 
                profit: { $sum: { $multiply: ["$items.quantity", { $subtract: ["$product_details.sale_price", "$product_details.purchase_price"] }] } } 
            } 
        },
        { $project: { _id: 0, profit: 1 } }
    ]);

    return result[0] || { profit: 0 };
}

export const findProfitByProduct = async (product_id: string): Promise<any> => {
    const result = await Sale.aggregate([
        { $unwind: "$items" },
        { 
            $match: { 
                "items.product_id": new mongoose.Types.ObjectId(product_id) 
            } 
        },
        {
            $lookup: {
                from: "products",
                localField: "items.product_id",
                foreignField: "_id",
                as: "product_details"
            }
        },
        { $unwind: "$product_details" },
        { 
            $group: { 
                _id: null, 
                profit: { $sum: { $multiply: ["$items.quantity", { $subtract: ["$product_details.sale_price", "$product_details.purchase_price"] }] } } 
            } 
        },
        { $project: { _id: 0, profit: 1 } }
    ]);

    return result[0] || { profit: 0 };
}

export const findMostUsedMethod = async (): Promise<any> => {
    const result = await Sale.aggregate([
        { 
            $group: { 
                _id: "$method_id", 
                method_count: { $sum: 1 } 
            } 
        },
        { $sort: { method_count: -1 } },
        { $limit: 1 },
        {
            $lookup: {
                from: "methods",
                localField: "_id",
                foreignField: "_id",
                as: "method_info"
            }
        },
        { 
            $unwind: {
                path: "$method_info",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: {
                method_id: "$_id",
                method_name: { $ifNull: ["$method_info.name", "Método não encontrado"] },
                method_count: 1,
                _id: 0
            }
        }
    ]);

    return result[0] || null;
}

export const findCustomerWithMostPurchases = async (): Promise<any> => {
    const result = await Sale.aggregate([
        { 
            $group: { 
                _id: "$customer_id", 
                customer_purchase_count: { $sum: 1 } 
            } 
        },
        { $sort: { customer_purchase_count: -1 } },
        { $limit: 1 },
        {
            $lookup: {
                from: "customers",
                localField: "_id",
                foreignField: "_id",
                as: "customer_info"
            }
        },
        { $unwind: "$customer_info" },
        {
            $project: {
                customer_id: "$_id",
                customer_name: "$customer_info.name",
                customer_purchase_count: 1,
                _id: 0
            }
        }
    ]);

    return result;
}

export const ProductsBoughtByCustomer = async (customer_id: string): Promise<any> => {
    const result = await Sale.aggregate([
        { 
            $match: { 
                customer_id: new mongoose.Types.ObjectId(customer_id) 
            } 
        },
        { $unwind: "$items" },
        {
            $group: {
                _id: "$items.product_id",
                customer_id: { $first: "$customer_id" }
            }
        },
        {
            $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "_id",
                as: "product_info"
            }
        },
        { $unwind: "$product_info" },
        { 
            $lookup: {
                from: "customers",
                localField: "customer_id",
                foreignField: "_id",
                as: "customer_info"
            }
        },
        { $unwind: "$customer_info" },
        {
            $project: {
                _id: 0,
                customer_id: "$customer_id",
                customer_name: "$customer_info.name",
                product_name: "$product_info.name"
            }
        }
    ]);

    return result;
}

export const CustomersWhoBoughtProduct = async (product_id: string): Promise<any> => {
    const result = await Sale.aggregate([
        { $unwind: "$items" },
        { 
            $match: { 
                "items.product_id": new mongoose.Types.ObjectId(product_id) 
            } 
        },
        {
            $group: {
                _id: "$customer_id",
                product_id: { $first: "$items.product_id" }
            }
        },
        {
            $lookup: {
                from: "customers",
                localField: "_id",
                foreignField: "_id",
                as: "customer_info"
            }
        },
        { $unwind: "$customer_info" },
        {
            $lookup: {
                from: "products",
                localField: "product_id",
                foreignField: "_id",
                as: "product_info"
            }
        },
        { $unwind: "$product_info" },
        {
            $project: {
                _id: 0,
                customer_id: "$_id",
                customer_name: "$customer_info.name",
                product_name: "$product_info.name"
            }
        }
    ]);
    
    return result;
}