import { createEdgeRouter } from "next-connect";
import { connectMongoDB } from "@/backend/lib/mongodb";
import { clearCart } from "@/backend/controllers/cartController";

const router = createEdgeRouter();

const LoadDB = async () => {
  await connectMongoDB();
};

LoadDB();

router.delete(clearCart);

export async function DELETE(request, ctx) {
  return router.run(request, ctx);
}
