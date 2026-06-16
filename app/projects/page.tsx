"use client";
import { useEffect } from "react";

export default function ProjectsRedirect() {
  useEffect(() => { window.location.replace("/#projects"); }, []);
  return null;
}
