"use client";
import { useEffect } from "react";

export default function ArAboutRedirect() {
  useEffect(() => { window.location.replace("/ar#about"); }, []);
  return null;
}
