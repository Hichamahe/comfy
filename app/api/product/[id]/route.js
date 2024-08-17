import { createEdgeRouter } from "next-connect";
import { connectMongoDB } from "@/backend/lib/mongodb";
import { GetProductById } from "@/backend/controllers/productController";

const router = createEdgeRouter();

const LoadDB = async () => {
  await connectMongoDB();
};

LoadDB();

router.get(GetProductById);

export async function GET(request, ctx) {
  return router.run(request, ctx);
}
