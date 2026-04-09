"use client";

type CouponCard = {
  key: string;
  badge: string;
  title: string;
  desc: string;
  expires: string;
};

type Props = {
  cards: CouponCard[];
  printNote: string;
  printButton: string;
};

export default function CouponsContent({ cards, printNote, printButton }: Props) {
  return (
    <section className="bg-white py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Print note */}
        <p className="text-slate-400 text-sm text-center mb-12 print:hidden">
          {printNote}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card) => (
            <div
              key={card.key}
              className="rounded-2xl border-2 border-dashed border-sky-300 bg-sky-50 p-6 text-center hover:-translate-y-1 transition-transform duration-200 print:border-solid print:break-inside-avoid"
            >
              <span className="inline-block bg-sky-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                {card.badge}
              </span>
              <h3
                className="text-2xl font-black text-slate-900 mb-2"
                style={{ fontFamily: "var(--font-outfit), sans-serif" }}
              >
                {card.title}
              </h3>
              <p className="text-slate-500 leading-relaxed mb-4">
                {card.desc}
              </p>
              <p className="text-slate-400 text-xs">{card.expires}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 print:hidden">
          <button
            onClick={() => window.print()}
            className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 cursor-pointer"
          >
            {printButton}
          </button>
        </div>
      </div>
    </section>
  );
}
