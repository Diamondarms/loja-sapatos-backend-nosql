import { BaseController } from "./base-controller";
import { methodsRepository } from "../repositories/methods-repository";
import { MethodModel } from "../models/models";

export const methodController = new BaseController<MethodModel>(methodsRepository);