import mongoose from 'mongoose';
import { Customer, Supplier, Category, Product, Method, Sale } from '../models/schemas';
import { SaleItem, SaleModel } from '../models/models';
import dbConnect from '../db';

async function seed() {
  await dbConnect();

  await Promise.all([
    Customer.deleteMany({}),
    Supplier.deleteMany({}),
    Category.deleteMany({}),
    Product.deleteMany({}),
    Method.deleteMany({}),
    Sale.deleteMany({})
  ]);

  const categories = await Category.insertMany([
    { name: 'Roupas Masculinas' },
    { name: 'Roupas Femininas' },
    { name: 'Acessórios' },
    { name: 'Tecnologia' },
    { name: 'Esporte e Lazer' }
  ]);

  const suppliers = await Supplier.insertMany([
    { name: 'Fornecedor A', cnpj: '12345678000101', phone: '1111-1111' },
    { name: 'Fornecedor B', cnpj: '22345678000102', phone: '2222-2222' },
    { name: 'Fornecedor C', cnpj: '32345678000103', phone: '3333-3333' }
  ]);

  const products = await Product.insertMany([
  {
    name: 'Tênis Esportivo Masculino',
    category_id: categories[0]._id,
    size: '42',
    stock: 50,
    sale_price: 250,
    purchase_price: 150,
    supplier_id: suppliers[0]._id
  },
  {
    name: 'Tênis Casual Feminino',
    category_id: categories[0]._id,
    size: '38',
    stock: 40,
    sale_price: 220,
    purchase_price: 140,
    supplier_id: suppliers[1]._id
  },
  {
    name: 'Sapato Social Preto',
    category_id: categories[1]._id,
    size: '41',
    stock: 30,
    sale_price: 300,
    purchase_price: 200,
    supplier_id: suppliers[2]._id
  },
  {
    name: 'Sapato Social Marrom',
    category_id: categories[1]._id,
    size: '40',
    stock: 25,
    sale_price: 280,
    purchase_price: 180,
    supplier_id: suppliers[0]._id
  },
  {
    name: 'Sandália Rasteira Feminina',
    category_id: categories[2]._id,
    size: '37',
    stock: 35,
    sale_price: 120,
    purchase_price: 70,
    supplier_id: suppliers[1]._id
  },
  {
    name: 'Sandália Masculina Couro',
    category_id: categories[2]._id,
    size: '42',
    stock: 20,
    sale_price: 150,
    purchase_price: 90,
    supplier_id: suppliers[2]._id
  },
  {
    name: 'Bota Coturno Masculina',
    category_id: categories[3]._id,
    size: '43',
    stock: 15,
    sale_price: 350,
    purchase_price: 220,
    supplier_id: suppliers[0]._id
  },
  {
    name: 'Bota Cano Curto Feminina',
    category_id: categories[3]._id,
    size: '36',
    stock: 18,
    sale_price: 320,
    purchase_price: 200,
    supplier_id: suppliers[1]._id
  },
  {
    name: 'Chinelo Havaianas Tradicional',
    category_id: categories[4]._id,
    size: '40',
    stock: 60,
    sale_price: 40,
    purchase_price: 20,
    supplier_id: suppliers[2]._id
  },
  {
    name: 'Chinelo Slide Masculino',
    category_id: categories[4]._id,
    size: '42',
    stock: 45,
    sale_price: 60,
    purchase_price: 30,
    supplier_id: suppliers[0]._id
  },
  {
    name: 'Tênis Infantil Colorido',
    category_id: categories[0]._id,
    size: '30',
    stock: 25,
    sale_price: 180,
    purchase_price: 100,
    supplier_id: suppliers[1]._id
  },
  {
    name: 'Bota de Neve Unissex',
    category_id: categories[3]._id,
    size: '39',
    stock: 12,
    sale_price: 400,
    purchase_price: 250,
    supplier_id: suppliers[2]._id
  }
]);

  const customers = await Customer.insertMany([
    { name: 'Ana Silva', cpf: '11111111111', phone: '9999-1111', cep: '89010000' },
    { name: 'Bruno Costa', cpf: '22222222222', phone: '9999-2222', cep: '89020000' },
    { name: 'Carla Mendes', cpf: '33333333333', phone: '9999-3333', cep: '89030000' },
    { name: 'Daniel Rocha', cpf: '44444444444', phone: '9999-4444', cep: '89040000' },
    { name: 'Eduarda Lima', cpf: '55555555555', phone: '9999-5555', cep: '89050000' }
  ]);

  const methods = await Method.insertMany([
    { name: 'Cartão de Crédito' },
    { name: 'Pix' },
    { name: 'Dinheiro' }
  ]);

  type SaleCreate = {
    sale_date: Date;
    customer_id: mongoose.Types.ObjectId;
    method_id: mongoose.Types.ObjectId;
    items: { product_id: mongoose.Types.ObjectId; quantity: number }[];
  };

  const sales: SaleCreate[] = [];

  for (let i = 0; i < 12; i++) {
    const customer = customers[i % customers.length];
    const method = methods[i % methods.length];
    const itemCount = Math.floor(Math.random() * 3) + 1;

    const items = Array.from({ length: itemCount }, () => {
      const product = products[Math.floor(Math.random() * products.length)];
      return {
        product_id: product._id,
        quantity: Math.floor(Math.random() * 5) + 1
      };
    }) as SaleItem[];

    const randomDays = Math.floor(Math.random() * 21) - 10; 
  const saleDate = new Date(Date.now() + randomDays * 24 * 60 * 60 * 1000);

  sales.push({
    sale_date: saleDate,
      customer_id: customer._id as mongoose.Types.ObjectId,
      method_id: method._id as mongoose.Types.ObjectId,
      items: items as SaleItem[]
    });
  }

  await Sale.insertMany(sales);

  console.log('Seed finalizado com sucesso');
  process.exit();
}

seed().catch(err => {
  console.error('Erro ao executar seed:', err);
  process.exit(1);
});