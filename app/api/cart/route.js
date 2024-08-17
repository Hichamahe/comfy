import { createEdgeRouter } from "next-connect";
import { connectMongoDB } from "@/backend/lib/mongodb";
import {
  addToCart,
  getCartItems,
  removeFromCart,
} from "@/backend/controllers/cartController";

const router = createEdgeRouter();

const LoadDB = async () => {
  await connectMongoDB();
};

LoadDB();

router.get(getCartItems);
router.post(addToCart);
router.delete(removeFromCart);

export async function GET(request, ctx) {
  return router.run(request, ctx);
}

export async function POST(request, ctx) {
  return router.run(request, ctx);
}

export async function DELETE(request, ctx) {
  return router.run(request, ctx);
}
