import "dotenv/config";
import { createPrismaClient } from "../src/lib/prisma.js";

const prisma = createPrismaClient(false);

const flights = [
  ["Hyderabad", "Chennai", "07:00", 45, 4800],
  ["Chennai", "Hyderabad", "07:30", 45, 5000],
  ["Hyderabad", "Bengaluru", "08:00", 55, 5200],
  ["Bengaluru", "Hyderabad", "08:10", 55, 5300],
  ["Bengaluru", "Chennai", "08:30", 40, 4200],
  ["Chennai", "Bengaluru", "09:00", 40, 4400],
];

try {
  for (const [
    index,
    [travellingFrom, destination, startTime, journeyMinutes, price],
  ] of flights.entries()) {
    for (const premium of [false, true]) {
      const [hour, minute] = startTime.split(":");
      const flight = {
        id: index + 1 + (premium ? 6 : 0),
        travellingFrom,
        destination,
        startTime: `${String(Number(hour) + (premium ? 1 : 0)).padStart(2, "0")}:${minute}`,
        journeyMinutes,
        price: price + (premium ? 500 : 0),
        rating: premium ? 5 : 4,
      };
      await prisma.flightListing.upsert({
        where: { id: flight.id },
        update: flight,
        create: flight,
      });
    }
  }
  console.log("Seeded 12 flights.");
} finally {
  await prisma.$disconnect();
}
