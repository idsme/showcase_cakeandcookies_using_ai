"use client";

import { useScene } from "@/hooks/use-scene";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { SearchBar } from "@/components/search-bar";
import { CategoryCards } from "@/components/category-cards";
import { TipBanner } from "@/components/tip-banner";
import { ValuesSection } from "@/components/values-section";
import { Gallery } from "@/components/gallery";
import { PricingTable } from "@/components/pricing-table";
import { Testimonials } from "@/components/testimonials";
import { CtaSection } from "@/components/cta-section";
import { SceneDebug } from "@/components/scene-debug";
import { Footer } from "@/components/footer";

export default function Home() {
  const ctx = useScene();
  const { scene, sceneData, show } = ctx;

  return (
    <div
      className="min-h-screen transition-colors duration-500"
      style={{ background: sceneData.bg }}
    >
      <Navbar scene={scene} sceneData={sceneData} onReset={ctx.reset} />

      <div className="max-w-[920px] mx-auto px-5">
        <Hero data={sceneData} show={show} />
        <SearchBar sceneData={sceneData} input={ctx.input} setInput={ctx.setInput} log={ctx.log} submit={ctx.submit} show={show} />
        <CategoryCards scene={scene} sceneData={sceneData} respond={ctx.respond} show={show} />
        <TipBanner scene={scene} sceneData={sceneData} showTip={ctx.showTip} show={show} />
        <ValuesSection scene={scene} sceneData={sceneData} show={show} />
        <Gallery scene={scene} sceneData={sceneData} show={show} />
        <PricingTable scene={scene} sceneData={sceneData} show={show} />
        <Testimonials scene={scene} sceneData={sceneData} show={show} />
        <CtaSection sceneData={sceneData} show={show} />
        <SceneDebug scene={scene} sceneData={sceneData} show={show} />
        <Footer show={show} />
      </div>
    </div>
  );
}
