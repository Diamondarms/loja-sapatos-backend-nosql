import { Category } from "../models/schemas";
import { CategoryModel } from "../models/models";
import { BaseRepository } from "./base-repository";

export const categoriesRepository = new BaseRepository<CategoryModel>(Category);