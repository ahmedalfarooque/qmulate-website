"use client";
import { useEffect } from "react";

export default function ArSolutionsRedirect() {
  useEffect(() => { window.location.replace("/ar#solutions"); }, []);
  return null;
}
