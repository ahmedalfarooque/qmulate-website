"use client";
import { WhatsAppFAB } from "./icons/GlassIcons";

export function WhatsApp() {
  return (
    <a
      href="https://wa.me/966533339052"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      style={{ position:"fixed", bottom:24, right:24, zIndex:9000 }}
    >
      <WhatsAppFAB size={52}/>
    </a>
  );
}
