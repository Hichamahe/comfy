import { createEdgeRouter } from "next-connect";
import { connectMongoDB } from "@/backend/lib/mongodb";
import { updateUser } from "@/backend/controllers/userController";

const router = createEdgeRouter();

const LoadDB = async () => {
  await connectMongoDB();
};

LoadDB();

router.put(updateUser);

export async function PUT(request, ctx) {
  return router.run(request, ctx);
}
