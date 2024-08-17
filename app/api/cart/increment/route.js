import { createEdgeRouter } from "next-connect";
import { connectMongoDB } from "@/backend/lib/mongodb";
import { incrementQuantity } from "@/backend/controllers/cartController";

const router = createEdgeRouter();

const LoadDB = async () => {
  await connectMongoDB();
};

LoadDB();

router.patch(incrementQuantity);

export async function PATCH(request, ctx) {
  return router.run(request, ctx);
}
