import { Schema, model } from "mongoose";

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, `product name must be provided`],
    },
    price: {
      type: Number,
      required: [true, `product price must be provided`],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 4.5,
    },
    company: {
      type: String,
      enum: {
        values: ["ikea", "liddy", "caressa", "marcos"],
        message: `{VALUE} is not supported`,
      },
    },
  },
  { timestamps: true }
);

const ProductModel = model("ProductSchema", ProductSchema);

export default ProductModel;
