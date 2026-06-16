"use client";
import { useEffect } from "react";

export default function SolutionsRedirect() {
  useEffect(() => { window.location.replace("/#solutions"); }, []);
  return null;
}
