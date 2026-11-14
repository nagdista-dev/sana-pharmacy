import { FACTS, FAQ, HOURS, SERVICES, SITE, STEPS, whatsappLink } from "@/lib/site";
import { Icon, WhatsAppIcon } from "@/components/icons";
import { HoursTable, OpenBadge } from "@/components/hours";
import { ContactForm } from "@/components/contact-form";

const DAY_SCHEMA = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Pharmacy",
    name: SITE.name,
    alternateName: SITE.nameEn,
    description: SITE.description,
    url: SITE.url,
    telephone: SITE.phoneHref,
    image: `${SITE.url}/og.png`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.area,
      addressRegion: SITE.address.city,
      addressCountry: SITE.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng },
    openingHoursSpecification: HOURS.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: DAY_SCHEMA[h.day],
      opens: h.open,
      closes: h.close === "24:00" ? "23:59" : h.close,
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
];

const NAV = [
  { href: "#services", label: "الخدمات" },
  { href: "#order", label: "اطلب روشتة" },
  { href: "#hours", label: "المواعيد" },
  { href: "#location", label: "الموقع" },
  { href: "#faq", label: "أسئلة شائعة" },
];

const ORDER_TEXT = "مرحبًا صيدلية سنا، عايز أطلب روشتة. هبعت صورتها دلوقتي.";

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2.5" aria-label={`${SITE.name} — الرئيسية`}>
      <span className="grid size-10 place-items-center rounded-[2px] bg-brand text-paper">
        <Icon name="plus" className="size-6" />
      </span>
      <span className="leading-tight">
        <span className="block font-display text-lg font-bold">{SITE.name}</span>
        <span className="block text-xs text-muted">{SITE.nameEn}</span>
      </span>
    </a>
  );
}

function SectionHeading({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="mb-3 text-sm font-semibold text-brand-strong">{eyebrow}</p>
      <h2 className="font-display text-3xl font-bold leading-snug sm:text-4xl">{title}</h2>
      {body && <p className="mt-4 text-lg leading-8 text-muted">{body}</p>}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:right-3 focus:z-50 focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2"
      >
        انتقل إلى المحتوى
      </a>

      <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur" id="top">
        <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Logo />
          <nav aria-label="القائمة الرئيسية" className="hidden lg:block">
            <ul className="flex items-center gap-7 text-[15px] text-ink-2">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="transition hover:text-brand">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a
            href={`tel:${SITE.phoneHref}`}
            className="inline-flex h-11 items-center gap-2 rounded-[2px] bg-ink px-4 text-sm font-semibold text-paper transition hover:bg-ink-2"
          >
            <Icon name="phone" className="size-4" />
            <span>اتصل بنا</span>
          </a>
        </div>
      </header>

      <main id="main">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div aria-hidden="true" className="dot-grid pointer-events-none absolute inset-0 opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pt-14 pb-20 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:pt-20">
            <div>
              <OpenBadge />
              <h1 className="mt-6 font-display text-4xl font-bold leading-[1.35] sm:text-5xl lg:text-[3.1rem]">
                دواك يوصلك في <span className="whitespace-nowrap text-brand-strong">45 دقيقة</span>
                <br />
                والصيدلي معاك لحد ما تخف.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
                صيدلية سنا في مدينة نصر: ابعت صورة الروشتة على واتساب، نأكد معاك السعر والبدائل،
                ونوصلها لباب بيتك. مفتوحين يوميًا حتى منتصف الليل.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={whatsappLink(ORDER_TEXT)}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex h-14 items-center justify-center gap-2.5 whitespace-nowrap rounded-[2px] bg-brand px-6 text-lg font-semibold text-paper transition hover:bg-brand-strong"
                >
                  <WhatsAppIcon className="size-6" />
                  اطلب روشتتك على واتساب
                </a>
                <a
                  href={`tel:${SITE.phoneHref}`}
                  className="inline-flex h-14 items-center justify-center gap-2 whitespace-nowrap rounded-[2px] bg-surface px-6 text-lg font-semibold ring-1 ring-line transition hover:ring-brand"
                >
                  <Icon name="phone" className="size-5" />
                  <span dir="ltr">{SITE.phone}</span>
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-xl bg-surface p-6 ring-1 ring-line sm:p-8">
                <p className="text-sm font-semibold text-muted">طلب اليوم</p>
                <ol className="mt-5 space-y-5">
                  {STEPS.map((s, i) => (
                    <li key={s.title} className="flex gap-4">
                      <span className="grid size-10 shrink-0 place-items-center rounded-[2px] bg-brand-soft font-display font-bold text-brand-strong">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-semibold">{s.title}</p>
                        <p className="mt-1 text-sm leading-6 text-muted">{s.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="mt-6 flex items-center gap-3 rounded-xl bg-bg p-4 text-sm">
                  <Icon name="truck" className="size-6 shrink-0 text-brand" />
                  <span>الدفع عند الاستلام — كاش أو كارت.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Facts */}
        <section aria-label="أرقام سريعة" className="border-y border-line bg-surface">
          <dl className="mx-auto grid max-w-6xl divide-y divide-line px-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:divide-x-reverse sm:px-6">
            {FACTS.map((f) => (
              <div key={f.label} className="px-2 py-7 sm:px-8">
                <dt className="text-sm text-muted">{f.label}</dt>
                <dd className="mt-2 font-display text-4xl font-bold text-ink">
                  {f.value} <span className="text-lg font-semibold text-brand-strong">{f.unit}</span>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Services */}
        <section id="services" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHeading
            eyebrow="الخدمات"
            title="كل اللي محتاجه من صيدلية، في مكان واحد"
            body="مش بس صرف أدوية: صيدلي يشرح، قياسات مجانية، وتوصيل سريع للبيت."
          />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <li
                key={s.title}
                className="group rounded-xl bg-surface p-6 ring-1 ring-line transition hover:ring-ink/40"
              >
                <span className="grid size-12 place-items-center rounded-[2px] bg-brand-soft text-brand-strong transition group-hover:bg-brand group-hover:text-paper">
                  <Icon name={s.icon} />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold">{s.title}</h3>
                <p className="mt-2 leading-7 text-muted">{s.body}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Order CTA */}
        <section id="order" className="px-4 sm:px-6">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-xl bg-ink px-6 py-14 text-paper sm:px-12">
            <div className="grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <p className="text-sm font-semibold text-paper/70">اطلب روشتة</p>
                <h2 className="mt-3 font-display text-3xl font-bold leading-snug sm:text-4xl">
                  صوّرها، ابعتها، واستلمها.
                </h2>
                <p className="mt-4 max-w-xl text-lg leading-8 text-paper/80">
                  نرد خلال دقائق بالسعر والبدائل المتاحة، ولو الدواء ناقص نوفره خلال 24 ساعة.
                  الأدوية اللي تحتاج وصفة لا تُصرف إلا بروشتة سارية.
                </p>
              </div>
              <a
                href={whatsappLink(ORDER_TEXT)}
                target="_blank"
                rel="noopener"
                className="inline-flex h-14 items-center justify-center gap-2.5 rounded-[2px] bg-surface px-7 text-lg font-semibold text-ink transition hover:bg-brand-soft"
              >
                <WhatsAppIcon className="size-6 text-brand-strong" />
                ابعت الروشتة الآن
              </a>
            </div>
          </div>
        </section>

        {/* Hours + Location */}
        <section className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
          <div id="hours">
            <SectionHeading eyebrow="المواعيد" title="مفتوحين كل يوم لحد نص الليل" />
            <HoursTable />
          </div>
          <div id="location">
            <SectionHeading eyebrow="الموقع" title="على بعد خطوات من عباس العقاد" />
            <div className="overflow-hidden rounded-xl ring-1 ring-line">
              <iframe
                title={`خريطة موقع ${SITE.name}`}
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${SITE.geo.lng - 0.006}%2C${SITE.geo.lat - 0.004}%2C${SITE.geo.lng + 0.006}%2C${SITE.geo.lat + 0.004}&layer=mapnik&marker=${SITE.geo.lat}%2C${SITE.geo.lng}`}
                className="h-64 w-full border-0 bg-brand-soft"
                loading="lazy"
              />
            </div>
            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-center gap-2 text-ink-2">
                <Icon name="pin" className="size-5 text-brand" />
                {SITE.address.full}
              </p>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${SITE.geo.lat},${SITE.geo.lng}`}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-1.5 font-semibold text-brand hover:text-brand-strong"
              >
                الاتجاهات على جوجل ماب
                <Icon name="arrow" className="size-4" />
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-t border-line bg-surface">
          <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
            <SectionHeading eyebrow="أسئلة شائعة" title="قبل ما تسأل" />
            <div className="divide-y divide-line">
              {FAQ.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-lg font-semibold">
                    {f.q}
                    <Icon name="plus" className="size-5 shrink-0 text-brand transition group-open:rotate-45" />
                  </summary>
                  <p className="mt-3 leading-8 text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
            <div>
              <SectionHeading
                eyebrow="تواصل معنا"
                title="عندك سؤال؟ اكتبه هنا"
                body="الصيدلي بيرد على الرسائل خلال دقائق في ساعات العمل."
              />
              <ul className="space-y-4 text-ink-2">
                <li className="flex items-center gap-3">
                  <Icon name="phone" className="size-5 text-brand" />
                  <a href={`tel:${SITE.phoneHref}`} dir="ltr" className="hover:text-brand">
                    {SITE.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Icon name="clock" className="size-5 text-brand" />
                  يوميًا 9 صباحًا – 12 منتصف الليل (الجمعة من 1 ظهرًا)
                </li>
                <li className="flex items-center gap-3">
                  <Icon name="pin" className="size-5 text-brand" />
                  {SITE.address.full}
                </li>
              </ul>
            </div>
            <div className="rounded-xl bg-surface p-6 ring-1 ring-line sm:p-8">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 pt-8 pb-24 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:pb-8 sm:pl-24">
          <p>© {new Date().getFullYear()} {SITE.name}. جميع الحقوق محفوظة.</p>
          <p>
            <a href={SITE.author.url} className="inline-flex items-center gap-2 text-ink-2 hover:text-ink">
              <span className="grid size-5 place-items-center rounded-[2px] bg-brand font-[family-name:var(--font-grotesk)] text-[11px] font-bold text-paper">N</span>
              مشروع تجريبي — تصميم وتنفيذ <span className="font-semibold">{SITE.author.name}</span>
            </a>
          </p>
        </div>
      </footer>

      <a
        href={whatsappLink(ORDER_TEXT)}
        target="_blank"
        rel="noopener"
        aria-label="تواصل معنا على واتساب"
        className="fixed bottom-5 left-5 z-50 grid size-14 place-items-center rounded-[2px] bg-ink text-paper transition hover:scale-105"
      >
        <WhatsAppIcon className="size-7" />
      </a>
    </>
  );
}
