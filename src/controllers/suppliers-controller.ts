import { BaseController } from "./base-controller";
import { suppliersRepository } from "../repositories/suppliers-repository";
import { SupplierModel } from "../models/models";

export const supplierController = new BaseController<SupplierModel>(suppliersRepository);