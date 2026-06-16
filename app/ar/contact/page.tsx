"use client";
import { useEffect } from "react";

export default function ArContactRedirect() {
  useEffect(() => { window.location.replace("/ar#contact"); }, []);
  return null;
}
