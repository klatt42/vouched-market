import { visionPoints } from "@/data/painCards";

export default function VisionSection() {
  return (
    <section className="bg-primary px-6 py-20 text-white">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-10 text-center text-3xl font-bold md:text-4xl">
          We&apos;re building something different.
        </h2>
        <ul className="space-y-5">
          {visionPoints.map((point, i) => (
            <li key={i} className="flex items-start gap-3 text-lg">
              <span className="mt-0.5 text-accent">&#10003;</span>
              <span className="leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-center text-lg italic text-white/80">
          The details are still under wraps. But if you&apos;ve felt the pain,
          we want to hear from you first &mdash; before anyone else.
        </p>
      </div>
    </section>
  );
}
