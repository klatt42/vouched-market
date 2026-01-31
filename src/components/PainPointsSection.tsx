import PainPointCard from "./PainPointCard";
import { painCards } from "@/data/painCards";

export default function PainPointsSection() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 text-center text-3xl font-bold text-primary md:text-4xl">
          Sound familiar?
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {painCards.map((card) => (
            <PainPointCard key={card.title} {...card} />
          ))}
        </div>
        <div className="mx-auto mt-12 max-w-2xl text-center">
          <p className="text-lg text-text-secondary">
            You&apos;re not alone. Thousands of marketplace buyers and sellers
            deal with this every single day.
          </p>
          <p className="mt-4 text-xl font-semibold text-primary">
            We think it&apos;s fixable.
          </p>
        </div>
      </div>
    </section>
  );
}
