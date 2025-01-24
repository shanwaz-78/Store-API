import ProductModel from "../schema/product.js";

const getAllProductsService = async (res, next) => {
  try {
    const allProducts = await ProductModel.find({});
    if (!allProducts || allProducts.length === 0) {
      return res.status(404).json({ message: "No Products Found." });
    }
    return res.status(200).json(allProducts);
  } catch (error) {
    next(error);
  }
};

const getAllStaticProductsService = async (query, res, next) => {
  try {
    const { featured, company, name, sort, fields, numericFilters } = query;
    const queryObject = {};

    if (featured) {
      queryObject.featured = featured === "true";
    }

    if (company) {
      queryObject.company = company;
    }

    if (name) {
      queryObject.name = { $regex: name, $options: "i" };
    }

    if (numericFilters) {
      const operatorMap = {
        ">": "$gt",
        ">=": "$gte",
        "=": "$eq",
        "<": "$lt",
        "<=": "$lte",
      };
      const regEx = /\b(>|>=|=|<|<=)\b/g;
      let filters = numericFilters.replace(
        regEx,
        (match) => `-${operatorMap[match]}-`
      );
      const options = ["price", "rating"];
      filters.split(",").forEach((item) => {
        const [field, operator, value] = item.split("-");
        if (options.includes(field)) {
          queryObject[field] = { [operator]: Number(value) };
        }
      });
    }

    let result = ProductModel.find(queryObject);

    if (sort) {
      const sortList = sort.split(",").join(" ");
      result = result.sort(sortList);
    } else {
      result = result.sort("createdAt");
    }

    if (fields) {
      const fieldsList = fields.split(",").join(" ");
      result = result.select(fieldsList);
    }

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);

    const products = await result;

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No Products Found." });
    }
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export default { getAllProductsService, getAllStaticProductsService };
