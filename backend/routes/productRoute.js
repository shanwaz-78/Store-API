import { Router } from "express";
import controller from "../controller/index.js";

const productRouter = Router();

productRouter.get("/", controller.productController.getAllProductsController);
productRouter.get("/static", controller.productController.getAllStaticProductsController);

export default productRouter;
