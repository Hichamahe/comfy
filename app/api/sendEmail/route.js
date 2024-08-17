import { createEdgeRouter } from "next-connect";
import { connectMongoDB } from "@/backend/lib/mongodb";
import { SendEmail } from "@/backend/controllers/userController";

const router = createEdgeRouter();

const LoadDB = async () => {
  await connectMongoDB();
};

LoadDB();

router.post(SendEmail);

export async function POST(request, ctx) {
  return router.run(request, ctx);
}
