import Image from "next/image";

export function ManagingDirectorSection() {
  return (
    <section className="px-3 sm:px-4 py-12 sm:py-16 md:px-8 md:py-20 lg:px-12 lg:py-24" style={{ backgroundColor: 'var(--about-bg-light)' }}>
      <div className="mx-auto grid w-full max-w-[1320px] items-center gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
        <div className="relative">
          <div className="absolute -inset-3 sm:-inset-4 rounded-[34px] bg-[linear-gradient(135deg,rgba(199,162,74,0.16),rgba(255,255,255,0),rgba(23,19,13,0.06))] blur-xl" />
          <div
            className="relative aspect-[4/5] overflow-hidden rounded-[28px] border shadow-[0_24px_70px_rgba(23,19,13,0.12)]"
            style={{
              backgroundColor: 'var(--about-card-bg)',
              borderColor: 'var(--about-card-border)',
            }}
          >
            <Image
              src="/md-profile.png"
              alt="Managing Director of GES Worldex"
              fill
              sizes="(min-width: 1024px) 42vw, (min-width: 640px) 70vw, 100vw"
              className="object-cover object-center"
              priority={false}
            />
          </div>
        </div>

        <div className="space-y-6">
          <p className="bg-[linear-gradient(90deg,#9f7b28,#d8b766,#8d6a1e)] bg-clip-text text-xs font-black uppercase tracking-[0.28em] text-transparent md:text-sm">
            Message from the MD
          </p>

          <h2 className="text-2xl font-black leading-[1.04] tracking-[-0.05em] sm:text-3xl md:text-4xl lg:text-5xl" style={{ color: 'var(--about-text-primary)' }}>
            Leading GES Worldex with vision, discipline, and long-term trust.
          </h2>

          <div className="space-y-4 text-[16px] leading-[1.9] tracking-[0.01em] md:text-[17px]" style={{ color: 'var(--about-text-secondary)' }}>
            <p>
              GES Worldex has always been guided by the belief that exhibitions should create meaningful business outcomes. As we continue to grow, our focus remains on building platforms that help brands, partners, and industries connect with clarity and purpose.
            </p>
            <p>
              Under the leadership of our Managing Director, the company continues to expand its reach, strengthen execution quality, and deliver experiences that are both visually compelling and commercially effective.
            </p>
            <p>
              Sreekanth Urs leads GES Worldex India Pvt. Ltd. with a focus on purposeful growth, stronger industry connections, and exhibitions that create measurable business impact.
            </p>
          </div>

          <div
            className="grid gap-4 rounded-[24px] border px-5 py-4 sm:grid-cols-[1fr_auto] sm:items-end"
            style={{ borderColor: 'var(--about-card-border)', backgroundColor: 'var(--about-card-bg)' }}
          >
            <div className="space-y-1">
              <div className="text-xs font-black uppercase tracking-[0.24em]" style={{ color: 'var(--about-text-secondary)' }}>
                Managing Director
              </div>
              <div className="text-lg font-black leading-tight" style={{ color: 'var(--about-text-primary)' }}>
                Sreekanth Urs
              </div>
              <div className="text-sm font-bold uppercase tracking-[0.18em] leading-tight" style={{ color: 'var(--about-text-secondary)' }}>
                MD
              </div>
              <div className="text-sm font-bold uppercase tracking-[0.18em] leading-tight" style={{ color: 'var(--about-text-secondary)' }}>
                GES Worldex India Pvt Ltd
              </div>
            </div>

            <div
              className="max-w-[320px] text-sm font-medium leading-6 sm:justify-self-end sm:self-end sm:text-right"
              style={{ color: 'var(--about-text-secondary)' }}
            >
              Building trusted exhibition platforms with a clear vision for growth.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
