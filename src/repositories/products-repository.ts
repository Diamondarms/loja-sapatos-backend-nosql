import { Product } from "../models/schemas";
import { ProductModel } from "../models/models";
import { BaseRepository } from "./base-repository";

export const productsRepository = new BaseRepository<ProductModel>(Product);

export const findByName = async (name: string) => {
    return Product.findOne({ name });
};