import { Router } from "express";
import * as ProductController from "./controllers/products-controller";
import * as SupplierController from "./controllers/suppliers-controller";
import * as CustomerController from "./controllers/customers-controller";
import * as SaleController from "./controllers/sales-controller";
import * as ReportController from "./controllers/reports-controller";
import * as CategoriesController from "./controllers/categories-controller";
import * as MethodsController from "./controllers/methods-controller";

const router = Router();

//Produtos
router.get("/Products", ProductController.productController.getAll);
router.get("/Products/id/:id", ProductController.productController.getById);
router.get("/Products/name/:name", ProductController.getByName);
router.delete("/Products/:id", ProductController.productController.delete);
router.post("/Products", ProductController.productController.create);
router.patch("/Products/:id", ProductController.productController.update);

//Fornecedores
router.get("/Suppliers", SupplierController.supplierController.getAll);
router.get("/Suppliers/:id", SupplierController.supplierController.getById);
router.delete("/Suppliers/:id", SupplierController.supplierController.delete);
router.post("/Suppliers", SupplierController.supplierController.create);

//Cliente
router.get("/Customers", CustomerController.categoryController.getAll);
router.get("/Customers/id/:id", CustomerController.categoryController.getById);
router.get("/Customers/name/:name", CustomerController.getCustomerByName);
router.delete("/Customers/:id", CustomerController.categoryController.delete);
router.post("/Customers", CustomerController.categoryController.create);
router.patch("/Customers/:id", CustomerController.categoryController.update);

//Vendas
router.get("/Sales", SaleController.saleController.getAll);
router.get("/ItemSales", SaleController.getAllItemSales);
router.get("/Sales/:id", SaleController.saleController.getById);
router.post("/Sales/", SaleController.createSaleController);

//Métodos
router.get("/Methods", MethodsController.methodController.getAll);
router.delete("/Methods/:id", MethodsController.methodController.delete);
router.post("/Methods", MethodsController.methodController.create);

//Categorias
router.get("/Categories", CategoriesController.categoryController.getAll);
router.delete("/Categories/:id", CategoriesController.categoryController.delete);
router.post("/Categories", CategoriesController.categoryController.create);

//Relatórios
router.get("/Reports/profit/period", ReportController.getProfitByPeriod);
router.get("/Reports/profit/supplier", ReportController.getProfitByPeriodAndSupplier);
router.get("/Reports/profit/product/:id", ReportController.getProfitByProduct);
router.get("/Reports/method/most-used", ReportController.getMostUsedMethod);
router.get("/Reports/customer/most-purchases", ReportController.getCustomerWithMostPurchases);
router.get("/Reports/customer-products/:id", ReportController.getProductsBoughtByCustomer);
router.get("/Reports/product-customers/:id", ReportController.getCustomersWhoBoughtProduct);

export default router;