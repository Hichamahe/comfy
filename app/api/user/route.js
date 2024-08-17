import { createEdgeRouter } from "next-connect";
import { connectMongoDB } from "@/backend/lib/mongodb";
import { NewUser } from "@/backend/controllers/userController";

const router = createEdgeRouter();

const LoadDB = async () => {
  await connectMongoDB();
};

LoadDB();

router.post(NewUser);

export async function POST(request, ctx) {
  return router.run(request, ctx);
}
