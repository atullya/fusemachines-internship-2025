import { Request, Response } from "express";
import Cart from "../models/cart.model";
import Product from "../models/product.model"; // keep this import as-is

export const addToCart = async (req: Request, res: Response) => {
  const userId = req.user._id;
  const { productId, quantity } = req.body;

  // find or create cart for user
  let cart = await Cart.findOne({ userId });
  if (!cart) cart = new Cart({ userId, items: [] });

  // check if product already exists in cart
  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }

  await cart.save();

  // populate product details
  await cart.populate("items.productId");

  /*
By default, cart.items.productId only stores the product’s ObjectId (like "64ac32f...").
But when calculating total cost, you need each product’s price (which is stored in the Product collection).

populate() tells Mongoose:

“Replace every productId with the actual product document from the Product collection.”

 Example before populate:

items: [
 { productId: ObjectId("P1"), quantity: 2 }
]
After populate:

items: [
 {
   productId: {
     _id: "P1",
     name: "Blue Shirt",
     price: 999,
     category: "Clothing",
     ...
   },
   quantity: 2
 }
]
    */

  const totalPrice = cart.items.reduce((total, item) => {
    const product: any = item.productId;
    const price = product?.price ?? 0;
    return total + item.quantity * price;
  }, 0);

  res.status(200).json({ success: true, cart, totalPrice });
};

export const updateCartQuantity = async (req: Request, res: Response) => {
  const userId = req.user._id;
  const { productId } = req.params;
  const { quantity } = req.body;

  const cart = await Cart.findOne({ userId }).populate("items.productId");
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const item = cart.items.find(
    (item) => item.productId.toString() === productId
  );
  if (!item) return res.status(404).json({ message: "Item not found in cart" });

  if (quantity <= 0) {
    const index = cart.items.findIndex(
      (i) => i.productId.toString() === productId
    );
    if (index > -1) cart.items.splice(index, 1); // ✅ no type error
  } else {
    item.quantity = quantity;
  }

  await cart.save();

  const totalPrice = cart.items.reduce((t, i) => {
    const p: any = i.productId;
    return t + i.quantity * (p?.price ?? 0);
  }, 0);

  res.json({ success: true, cart, totalPrice });
};
