"use client";

import { useState } from "react";
import axios from "axios";
import FormFields from "./FormFields";
import { formFields } from "@/config/formFields";
import FlightListingResults from "./FlightListingResults";
import { useTravelForm } from "@/hooks/use-travel-form";
import { passengerSchema, bookingSchema } from "@/lib/validation";

export default function MultiStepTravelForm() {
  const { formStage, setFormStage, formData } = useTravelForm();
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [flights, setFlights] = useState([]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    const result = (
      formStage === 0 ? passengerSchema : bookingSchema
    ).safeParse(formData);
    if (!result.success) {
      const fieldErrors = {};
      for (const issue of result.error.issues) {
        fieldErrors[issue.path[0]] ??= issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    if (formStage === 0) {
      setFormStage(1);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("/api/flight-listing", result.data, {
        timeout: 10000,
      });
      setFlights(response.data);
      setFormStage(2);
    } catch (error) {
      setErrors(error.response?.data?.errors ?? {});
      setError(
        error.response?.data?.message ??
          "Could not search flights. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1>Flight search</h1>
      <p>Step {formStage + 1} of 3</p>
      {formStage === 2 ? (
        <FlightListingResults
          flights={flights}
          onBack={() => setFormStage(1)}
        />
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <h2>{formFields[formStage].title}</h2>
          <FormFields fields={formFields[formStage].fields} errors={errors} />
          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}
          <div className="controls">
            {formStage === 1 && (
              <button
                type="button"
                disabled={loading}
                onClick={() => {
                  setErrors({});
                  setError("");
                  setFormStage(0);
                }}
              >
                Back
              </button>
            )}
            <button type="submit" disabled={loading}>
              {loading
                ? "Searching…"
                : formStage === 0
                  ? "Next: Journey details"
                  : "Search flights"}
            </button>
          </div>
        </form>
      )}
    </>
  );
}
