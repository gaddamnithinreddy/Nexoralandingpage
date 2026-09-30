import { useLenis } from "@/hooks/use-lenis";
import { IntroCurtain } from "@/components/site/IntroCurtain";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/hero/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Manifesto } from "@/components/site/Manifesto";
import { ProductSection } from "@/components/site/product/ProductSection";
import { Chooser } from "@/components/site/Chooser";
import { Faq } from "@/components/site/Faq";
import { FinalCta } from "@/components/site/FinalCta";
import { PRODUCTS } from "@/data/products";

const Index = () => {
  useLenis();
  return (
    <div className="overflow-x-clip">
      <IntroCurtain />
      <Nav />
      <main>
        <Hero />
        <Manifesto />
        <ProductSection product={PRODUCTS[0]} />
        <Marquee />
        <ProductSection product={PRODUCTS[1]} dark />
        <Chooser />
        <Faq />
      </main>
      <FinalCta />
    </div>
  );
};

export default Index;
