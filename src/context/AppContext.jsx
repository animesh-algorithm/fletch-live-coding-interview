"use client";

import { createContext, useState } from "react";
import { formFields } from "@/config/formFields";

export const TravelFormContext = createContext(null);

export function TravelFormProvider({ children }) {
  const [formStage, setFormStage] = useState(0);
  const [formData, setFormData] = useState(() =>
    Object.fromEntries(
      formFields.flatMap((step) =>
        step.fields.map((field) => [field.name, ""]),
      ),
    ),
  );

  function updateFormData(name, value) {
    setFormData((current) => {
      const updated = { ...current, [name]: value };

      for (const step of formFields) {
        for (const field of step.fields) {
          if (field.excludeField === name && updated[field.name] === value) {
            updated[field.name] = "";
          }
        }
      }

      return updated;
    });
  }

  return (
    <TravelFormContext.Provider
      value={{ formStage, setFormStage, formData, updateFormData }}
    >
      {children}
    </TravelFormContext.Provider>
  );
}
