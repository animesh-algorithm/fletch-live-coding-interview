import { z } from "zod";
import { formFields } from "../config/formFields.js";

function schemaFor(fields) {
  return z.object(
    Object.fromEntries(fields.map((field) => [field.name, field.validation])),
  );
}

export const passengerSchema = schemaFor(formFields[0].fields);

export const bookingSchema = schemaFor(
  formFields.flatMap((step) => step.fields),
).refine((data) => data.travellingFrom !== data.destination, {
  message: "Destination must differ from departure city",
  path: ["destination"],
});
