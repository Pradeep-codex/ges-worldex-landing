import { Download, ExternalLink, FileText } from "lucide-react";

type HotelInfoPdfSectionProps = {
  title?: string;
  description?: string;
  pdfPath?: string;
  skeletonOnly?: boolean;
};

export function HotelInfoPdfSection({
  title = "Hotel Information PDF",
  description = "Open the complete hotel information guide, review it on the page, or download it for quick access during travel planning.",
  pdfPath = "/demo.pdf",
  skeletonOnly = false,
}: HotelInfoPdfSectionProps) {
  return (
    <section className="mt-14 lg:mt-20">
      <div className="overflow-hidden rounded-[30px] border border-[#c9ab6a]/25 bg-[linear-gradient(180deg,rgba(252,248,240,0.96)_0%,rgba(248,240,222,0.88)_100%)] shadow-[0_24px_80px_rgba(90,62,21,0.12)] [html[data-theme='dark']_&]:border-[#d8b766]/18 [html[data-theme='dark']_&]:bg-[linear-gradient(180deg,rgba(16,21,30,0.96)_0%,rgba(10,14,22,0.92)_100%)] [html[data-theme='dark']_&]:shadow-[0_24px_90px_rgba(0,0,0,0.38)]">
        <div className="grid gap-8 p-6 md:p-8 lg:grid-cols-[0.38fr_0.62fr] lg:gap-10 lg:p-10">
          <div className="flex flex-col justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#b88b35]/20 bg-white/70 px-4 py-2 text-[0.72rem] font-black uppercase tracking-[0.18em] text-[#9a6d1d] [html[data-theme='dark']_&]:border-[#d8b766]/20 [html[data-theme='dark']_&]:bg-white/5 [html[data-theme='dark']_&]:text-[#f0d188]">
                <FileText className="h-4 w-4" />
                PDF Guide
              </div>
              <h2 className="mt-4 text-3xl font-black leading-tight tracking-[-0.04em] text-[#1d160f] md:text-4xl [html[data-theme='dark']_&]:text-white">
                {title}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-[#5d4a35] [html[data-theme='dark']_&]:text-white/68">
                {description}
              </p>
            </div>

            {skeletonOnly ? (
              <div className="flex flex-wrap gap-3">
                <div className="h-12 w-36 rounded-full bg-[#b88b35]/12 [html[data-theme='dark']_&]:bg-white/8" />
                <div className="h-12 w-36 rounded-full bg-[#b88b35]/8 [html[data-theme='dark']_&]:bg-white/6" />
              </div>
            ) : (
              <div className="flex flex-wrap gap-3">
                <a
                  href={pdfPath}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#2f2318] px-6 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#9f7b28] [html[data-theme='dark']_&]:bg-[#d8b766] [html[data-theme='dark']_&]:text-[#111723] [html[data-theme='dark']_&]:hover:bg-[#f0d188]"
                >
                  View PDF
                  <ExternalLink className="h-4 w-4" />
                </a>
                <a
                  href={pdfPath}
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-[#b88b35]/25 bg-white/70 px-6 py-3 text-sm font-black uppercase tracking-[0.12em] text-[#533c21] transition-colors hover:bg-white [html[data-theme='dark']_&]:border-[#d8b766]/18 [html[data-theme='dark']_&]:bg-white/5 [html[data-theme='dark']_&]:text-white [html[data-theme='dark']_&]:hover:bg-white/10"
                >
                  Download
                  <Download className="h-4 w-4" />
                </a>
              </div>
            )}
          </div>

          <div className="overflow-hidden rounded-[24px] border border-black/8 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] [html[data-theme='dark']_&]:border-white/10 [html[data-theme='dark']_&]:bg-[#0e1520]">
            <div className="flex items-center justify-between border-b border-black/8 px-4 py-3 [html[data-theme='dark']_&]:border-white/8">
              <span className="text-sm font-bold text-[#3e2f1b] [html[data-theme='dark']_&]:text-white/80">
                Preview
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8f7752] [html[data-theme='dark']_&]:text-white/45">
                demo.pdf
              </span>
            </div>
            {skeletonOnly ? (
              <div className="h-[520px] w-full bg-white p-6 [html[data-theme='dark']_&]:bg-[#0e1520]">
                <div className="flex h-full flex-col gap-4 rounded-[18px] border border-[#b88b35]/10 bg-[linear-gradient(180deg,rgba(248,240,222,0.4)_0%,rgba(252,248,240,0.8)_100%)] p-5 [html[data-theme='dark']_&]:border-white/8 [html[data-theme='dark']_&]:bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0.02)_100%)]">
                  <div className="h-4 w-28 rounded-full bg-[#b88b35]/14 [html[data-theme='dark']_&]:bg-white/10" />
                  <div className="h-8 w-3/4 rounded-full bg-[#b88b35]/10 [html[data-theme='dark']_&]:bg-white/8" />
                  <div className="grid flex-1 gap-3">
                    <div className="h-20 rounded-[16px] bg-[#b88b35]/8 [html[data-theme='dark']_&]:bg-white/6" />
                    <div className="h-20 rounded-[16px] bg-[#b88b35]/8 [html[data-theme='dark']_&]:bg-white/6" />
                    <div className="h-20 rounded-[16px] bg-[#b88b35]/8 [html[data-theme='dark']_&]:bg-white/6" />
                    <div className="h-20 rounded-[16px] bg-[#b88b35]/8 [html[data-theme='dark']_&]:bg-white/6" />
                  </div>
                </div>
              </div>
            ) : (
              <iframe
                src={pdfPath}
                title="Hotel information PDF"
                className="h-[520px] w-full bg-white [html[data-theme='dark']_&]:bg-[#0e1520]"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
