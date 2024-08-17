import { createEdgeRouter } from "next-connect";
import { connectMongoDB } from "@/backend/lib/mongodb";
import { decrementQuantity } from "@/backend/controllers/cartController";

const router = createEdgeRouter();

const LoadDB = async () => {
  await connectMongoDB();
};

LoadDB();

router.patch(decrementQuantity);

export async function PATCH(request, ctx) {
  return router.run(request, ctx);
}
