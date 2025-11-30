import { BaseController } from "./base-controller";
import { categoriesRepository } from "../repositories/categories-repository";
import { CategoryModel } from "../models/models";

export const categoryController = new BaseController<CategoryModel>(categoriesRepository);