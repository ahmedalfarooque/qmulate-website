"use client";
import { useEffect } from "react";

export default function ArServicesRedirect() {
  useEffect(() => { window.location.replace("/ar#services"); }, []);
  return null;
}
