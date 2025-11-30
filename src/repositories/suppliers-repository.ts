import { Supplier } from "../models/schemas";
import { SupplierModel } from "../models/models";
import { BaseRepository } from "./base-repository";

export const suppliersRepository = new BaseRepository<SupplierModel>(Supplier);