import { notFound } from "next/navigation";
import { getProductBySlug } from "@/features/products/api/get-product-by-slug";
import ProductDetailsHero from "@/features/products/ui/product-details-hero";
import ProductDetailsInfo from "@/features/products/ui/product-details-info";
import ProductDetailsHighlights from "@/features/products/ui/product-details-highlights";

type ProductDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="overflow-x-hidden bg-[#06131d] text-white">
      <section className="relative overflow-hidden bg-[#081b29] pt-24 text-white sm:pt-28 lg:pt-28">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#081b29_0%,#071a28_50%,#061724_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(89,201,255,0.07),transparent_22%),radial-gradient(circle_at_82%_18%,rgba(89,201,255,0.05),transparent_20%)]" />

        <div className="relative z-10 mx-auto max-w-[1440px] px-4 pb-14 sm:px-6 lg:px-10 lg:pb-20">
          <ProductDetailsHero product={product} />

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <ProductDetailsInfo product={product} />
            <ProductDetailsHighlights product={product} />
          </div>
        </div>
      </section>
    </main>
  );
}
