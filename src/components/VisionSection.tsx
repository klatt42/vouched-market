import { visionPoints } from "@/data/painCards";

export default function VisionSection() {
  return (
    <section className="bg-primary px-6 py-24 text-white">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-12 text-center text-4xl font-bold md:text-5xl">
          We&apos;re building something different.
        </h2>
        <ul className="space-y-6">
          {visionPoints.map((point, i) => (
            <li key={i} className="flex items-start gap-4 text-xl md:text-2xl">
              <span className="mt-1 text-2xl text-accent">&#10003;</span>
              <span className="leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
        <p className="mt-12 text-center text-xl italic text-white/80 md:text-2xl">
          The details are still under wraps. But if you&apos;ve felt the pain,
          we want to hear from you first &mdash; before anyone else.
        </p>
      </div>
    </section>
  );
}
