import { prisma } from "@/lib/prisma";
import { bookingSchema } from "@/lib/validation";

export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return Response.json(
      { message: "Send a valid JSON object" },
      { status: 400 },
    );
  }

  const result = bookingSchema.safeParse(data);
  if (!result.success) {
    const errors = {};
    for (const issue of result.error.issues) {
      errors[issue.path[0]] ??= issue.message;
    }
    return Response.json(
      { message: "Please check the highlighted fields", errors },
      { status: 400 },
    );
  }

  try {
    const flights = await prisma.flightListing.findMany({
      where: {
        travellingFrom: result.data.travellingFrom,
        destination: result.data.destination,
      },
      orderBy: { price: "asc" },
    });
    return Response.json(flights);
  } catch (error) {
    console.error("Flight search failed:", error);
    return Response.json(
      { message: "Could not load flights. Please try again." },
      { status: 500 },
    );
  }
}
