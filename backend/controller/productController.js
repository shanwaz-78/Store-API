import services from "../services/index.js";

const getAllProductsController = (_, res, next) => {
  return services.productsServices.getAllProductsService(res, next);
};

const getAllStaticProductsController = (req, res, next) => {
  return services.productsServices.getAllStaticProductsService(
    req.body,
    res,
    next
  );
};

export default {
  getAllProductsController,
  getAllStaticProductsController,
};
