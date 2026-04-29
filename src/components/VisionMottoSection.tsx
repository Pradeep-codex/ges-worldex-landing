const cards = [
  {
    label: "Vision",
    title: "To redefine exhibition experiences across India.",
    body: "We create platforms where ideas, industries, and opportunities meet with clarity and purpose.",
  },
  {
    label: "Motto",
    title: "Inspire. Connect. Grow.",
    body: "Every event is shaped to help brands stand out, build trust, and move business forward.",
  },
];

export function VisionMottoSection() {
  return (
    <section className="bg-[#f8f6f2] px-4 py-20 md:px-8 md:py-24 lg:px-12">
      <div className="mx-auto grid w-full max-w-[1320px] gap-5 md:grid-cols-2">
        {cards.map((card) => (
          <article
            key={card.label}
            className="rounded-[20px] bg-[#fffdf8]/82 p-8 shadow-[0_22px_70px_rgba(23,19,13,0.08)] ring-1 ring-[#17130d]/6 md:p-10"
          >
            <div className="mb-7 h-1 w-12 rounded-full bg-[linear-gradient(90deg,#9f7b28,#d8b766,#8d6a1e)]" />
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#9f7b28]">
              {card.label}
            </p>
            <h2 className="mt-4 max-w-[520px] text-3xl font-black leading-tight tracking-tight text-[#17130d] md:text-4xl">
              {card.title}
            </h2>
            <p className="mt-5 max-w-[560px] text-base leading-8 text-[#62594d] md:text-lg">
              {card.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
