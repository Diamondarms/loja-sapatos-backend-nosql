import { Customer } from "../models/schemas";
import { CustomerModel } from "../models/models";
import { BaseRepository } from "./base-repository";

export const customersRepository = new BaseRepository<CustomerModel>(Customer);

export const findByName = async (name: string) => {
    return Customer.findOne({ name });
};