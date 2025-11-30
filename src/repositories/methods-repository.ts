import { Method } from "../models/schemas";
import { MethodModel } from "../models/models";
import { BaseRepository } from "./base-repository";

export const methodsRepository = new BaseRepository<MethodModel>(Method);