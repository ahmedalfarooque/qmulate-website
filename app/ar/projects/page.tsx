"use client";
import { useEffect } from "react";

export default function ArProjectsRedirect() {
  useEffect(() => { window.location.replace("/ar#projects"); }, []);
  return null;
}
