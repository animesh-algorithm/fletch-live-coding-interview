"use client";

import { useContext } from "react";
import { TravelFormContext } from "@/context/AppContext";

export function useTravelForm() {
  return useContext(TravelFormContext);
}
