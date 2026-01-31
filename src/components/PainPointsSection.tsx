import PainPointCard from "./PainPointCard";
import { painCards } from "@/data/painCards";

export default function PainPointsSection() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-14 text-center text-4xl font-bold text-primary md:text-5xl">
          Sound familiar?
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {painCards.map((card) => (
            <PainPointCard key={card.title} {...card} />
          ))}
        </div>
        <div className="mx-auto mt-14 max-w-2xl text-center">
          <p className="text-xl text-text-secondary md:text-2xl">
            You&apos;re not alone. Thousands of marketplace buyers and sellers
            deal with this every single day.
          </p>
          <p className="mt-5 text-2xl font-semibold text-primary md:text-3xl">
            We think it&apos;s fixable.
          </p>
        </div>
      </div>
    </section>
  );
}
