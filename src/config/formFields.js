import { z } from "zod";

export const cities = ["Bengaluru", "Chennai", "Hyderabad"];
const cityOptions = cities.map((city) => ({ label: city, value: city }));

export function today() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export const formFields = [
  {
    title: "Passenger Details",
    fields: [
      {
        name: "firstName",
        label: "First Name",
        type: "text",
        required: true,
        placeholder: "Enter your first name",
        maxLength: 100,
        autoComplete: "given-name",
        validation: z
          .string()
          .trim()
          .min(1, "First name is required")
          .max(100, "Maximum 100 characters"),
      },
      {
        name: "lastName",
        label: "Last Name",
        type: "text",
        required: true,
        placeholder: "Enter your last name",
        maxLength: 100,
        autoComplete: "family-name",
        validation: z
          .string()
          .trim()
          .min(1, "Last name is required")
          .max(100, "Maximum 100 characters"),
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        required: true,
        placeholder: "Enter your email",
        autoComplete: "email",
        validation: z.string().trim().email("Enter a valid email address"),
      },
      {
        name: "phone",
        label: "Phone Number",
        type: "tel",
        required: true,
        placeholder: "Enter your phone number",
        maxLength: 10,
        inputMode: "numeric",
        autoComplete: "tel-national",
        validation: z
          .string()
          .regex(/^[2-9][0-9]{9}$/, "Enter 10 digits, starting with 2–9"),
      },
    ],
  },
  {
    title: "Journey Details",
    fields: [
      {
        name: "travelDate",
        label: "Travel Date",
        type: "date",
        required: true,
        min: today,
        validation: z.iso
          .date("Enter a valid travel date")
          .refine(
            (value) => value >= today(),
            "Travel date cannot be in the past",
          ),
      },
      {
        name: "travellingFrom",
        label: "Travelling From",
        type: "select",
        required: true,
        placeholder: "Select departure city",
        options: cityOptions,
        validation: z.enum(cities, { error: "Select a departure city" }),
      },
      {
        name: "destination",
        label: "Destination",
        type: "select",
        required: true,
        placeholder: "Select destination",
        options: cityOptions,
        excludeField: "travellingFrom",
        validation: z.enum(cities, { error: "Select a destination" }),
      },
    ],
  },
];
