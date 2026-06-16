"use client";
import { useEffect } from "react";

export default function ServicesRedirect() {
  useEffect(() => { window.location.replace("/#services"); }, []);
  return null;
}
