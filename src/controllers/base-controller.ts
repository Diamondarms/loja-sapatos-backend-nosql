import { Request, Response } from 'express';
import { BaseRepository } from '../repositories/base-repository';
import { Document } from 'mongoose';

export class BaseController<T extends Document> {
    constructor(private repository: BaseRepository<T>) {}

    getAll = async (req: Request, res: Response) => {
        try {
            const data = await this.repository.findAll();
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send({ message: "Erro ao buscar registros" });
        }
    };

    getById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const data = await this.repository.findById(id);
            if (!data) {
                res.status(404).send({ message: "Registro não encontrado" });
                return;
            }
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send({ message: "Erro ao buscar registro" });
        }
    };

    create = async (req: Request, res: Response) => {
        try {
            const data = await this.repository.create(req.body);
            res.status(201).send(data);
        } catch (error) {
            res.status(500).send({ message: "Erro ao criar registro" });
        }
    };

    update = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const data = await this.repository.update(id, req.body);
            if (!data) {
                res.status(404).send({ message: "Registro não encontrado para atualizar" });
                return;
            }
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send({ message: "Erro ao atualizar registro" });
        }
    };

    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            await this.repository.delete(id);
            res.status(200).send({ message: "Deletado com sucesso" });
        } catch (error) {
            res.status(500).send({ message: "Erro ao deletar registro" });
        }
    };
}