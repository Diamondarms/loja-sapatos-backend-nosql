import mongoose, { Document } from 'mongoose';

export interface SaleItem {
    product_id: mongoose.Types.ObjectId;
    quantity: number;
}

export interface CustomerModel extends Document {
    name: string;
    cpf: string;
    phone?: string;
    cep: string;
}

export interface SupplierModel extends Document {
    name: string;
    cnpj: string;
    phone?: string;
}

export interface CategoryModel extends Document {
    name: string;
}

export interface ProductModel extends Document {
    name: string;
    category_id: mongoose.Types.ObjectId; 
    size: string;
    stock: number;
    sale_price: number;
    purchase_price: number;
    supplier_id: mongoose.Types.ObjectId; 
}

export interface MethodModel extends Document {
    name: string;
}

export interface SaleModel extends Document {
    sale_date: Date;
    customer_id: mongoose.Types.ObjectId; 
    items: SaleItem[];
    method_id: mongoose.Types.ObjectId;   
}