import { Model, Document } from 'mongoose';

export class BaseRepository<T extends Document> {
    constructor(protected model: Model<T>) {}

    async findAll(): Promise<T[]> {
        const schemaPaths = this.model.schema.paths;

        const dateField = ["date", "sale_date"].find(field => schemaPaths[field]);

        if (dateField) {
            return this.model.find().sort({ [dateField]: -1 }).exec();
        }

        return this.model.find().exec();
    }


    async findById(id: string): Promise<T | null> {
        return this.model.findById(id);
    }

    async create(item: Partial<T>): Promise<T> {
        return this.model.create(item);
    }

    async update(id: string, item: Partial<T>): Promise<T | null> {
        return this.model.findByIdAndUpdate(id, item, { new: true });
    }

    async delete(id: string): Promise<void> {
        await this.model.findByIdAndDelete(id);
    }
}