"use client";

import Image from "next/image";
import { IMG } from "@/lib/constants";
import { Fade } from "./ui/fade";

interface FooterProps {
  show: boolean;
}

export function Footer({ show }: FooterProps) {
  return (
    <Fade show={show} delay={0.7}>
      <footer className="bg-[#4A3428] text-[#FAF8F5] mx-[-20px] px-5 pt-8 pb-4">
        <div className="max-w-[920px] mx-auto flex justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2.5">
            <Image
              src={`${IMG}/logo-taart-koek.jpeg`}
              alt="Taart & Koek logo"
              width={36}
              height={36}
              className="rounded-full object-cover"
            />
            <div>
              <span className="font-playfair text-base font-bold">
                Taart <span className="text-[#C9A86A]">&</span> Koek
              </span>
              <p className="text-[11px] text-[#B8976D] mt-0.5 mb-0 max-w-[220px] leading-snug">
                Handgemaakte taarten uit Rotterdam-Nesselande
              </p>
            </div>
          </div>
          <div className="text-right text-[11px] text-[#B8976D] leading-relaxed">
            <p className="m-0">📍 Rotterdam-Nesselande</p>
            <p className="m-0">📲 06-34 19 12 03</p>
            <p className="m-0">📸 @taart_en_koek</p>
          </div>
        </div>
        <p className="text-center text-[10px] text-[#8B7E74] mt-4.5 pt-3 border-t border-[rgba(201,168,106,0.12)]">
          © 2026 Taart en Koek · Made with <span className="text-[#E91E8C]">♥</span> in Rotterdam-Nesselande
        </p>
      </footer>
    </Fade>
  );
}
