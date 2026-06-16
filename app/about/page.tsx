"use client";
import { useEffect } from "react";

export default function AboutRedirect() {
  useEffect(() => { window.location.replace("/#about"); }, []);
  return null;
}
