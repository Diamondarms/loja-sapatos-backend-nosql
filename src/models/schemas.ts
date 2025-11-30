import mongoose, { Schema, model } from 'mongoose';
import { 
    CustomerModel, 
    SupplierModel, 
    CategoryModel, 
    ProductModel, 
    SaleModel,
    MethodModel,
} from './models';

const CustomerSchema = new Schema<CustomerModel>({
    name: { type: String, required: true },
    cpf: { type: String, required: true, unique: true },
    phone: { type: String, default: null },
    cep: { type: String, required: true }
}, { 
    versionKey: false,
    toJSON: {
        virtuals: true,
        transform: function (doc, ret: any) {
            ret.customer_id = ret._id;
            delete ret._id;
            delete ret.id;
        }
    }
});

const SupplierSchema = new Schema<SupplierModel>({
    name: { type: String, required: true },
    cnpj: { type: String, required: true, unique: true },
    phone: { type: String, default: null }
}, { 
    versionKey: false,
    toJSON: {
        virtuals: true,
        transform: function (doc, ret: any) {
            ret.supplier_id = ret._id;
            delete ret._id;
            delete ret.id;
        }
    }
});

const CategorySchema = new Schema<CategoryModel>({
    name: { type: String, required: true }
}, { 
    versionKey: false,
    toJSON: {
        virtuals: true,
        transform: function (doc, ret: any) {
            ret.category_id = ret._id;
            delete ret._id;
            delete ret.id;
        }
    }
});

const ProductSchema = new Schema<ProductModel>({
    name: { type: String, required: true },
    category_id: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    size: { type: String, required: true },
    stock: { type: Number, required: true },
    sale_price: { type: Number, required: true },
    purchase_price: { type: Number, required: true },
    supplier_id: { type: Schema.Types.ObjectId, ref: 'Supplier', required: true }
}, { 
    versionKey: false,
    toJSON: {
        virtuals: true,
        transform: function (doc, ret: any) {
            ret.product_id = ret._id;
            delete ret._id;
            delete ret.id;
        }
    }
});

const MethodSchema = new Schema<MethodModel>({
    name: { 
        type: String,  
        required: true 
    }
}, { 
    versionKey: false,
    toJSON: {
        virtuals: true,
        transform: function (doc, ret: any) {
            ret.method_id = ret._id;
            delete ret._id;
            delete ret.id;
        }
    }
});

const SaleItemSchema = new Schema({
    product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true }
}, { _id: false });

const SaleSchema = new Schema<SaleModel>({
    sale_date: { type: Date, default: Date.now },
    customer_id: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    items: [SaleItemSchema],
    method_id: { type: Schema.Types.ObjectId, ref: 'Method', required: true }
}, { 
    versionKey: false,
    toJSON: {
        virtuals: true,
        transform: function (doc, ret: any) {
            ret.sale_id = ret._id;
            delete ret._id;
            delete ret.id;
        }
    }
});

export const Customer = model<CustomerModel>('Customer', CustomerSchema);
export const Supplier = model<SupplierModel>('Supplier', SupplierSchema);
export const Category = model<CategoryModel>('Category', CategorySchema);
export const Product = model<ProductModel>('Product', ProductSchema);
export const Method = model<MethodModel>('Method', MethodSchema);
export const Sale = model<SaleModel>('Sale', SaleSchema);