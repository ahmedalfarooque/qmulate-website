"use client";
import { useEffect, useRef, useState } from "react";
export function Reveal({children,delay=0,className="",style={} as React.CSSProperties,direction="up"}:{children:React.ReactNode;delay?:number;className?:string;style?:React.CSSProperties;direction?:"up"|"left"|"none"}) {
  const ref=useRef<HTMLDivElement>(null);
  const [v,setV]=useState(false);
  useEffect(()=>{
    const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){setV(true);io.disconnect();}},{threshold:0.08});
    if(ref.current)io.observe(ref.current);
    return()=>io.disconnect();
  },[]);
  const from=direction==="left"?"translateX(24px)":direction==="up"?"translateY(24px)":"none";
  return (
    <div ref={ref} className={className} style={{opacity:v?1:0,transform:v?"none":from,transition:`opacity 0.75s cubic-bezier(.16,1,.3,1) ${delay}ms, transform 0.75s cubic-bezier(.16,1,.3,1) ${delay}ms`,...style}}>
      {children}
    </div>
  );
}
