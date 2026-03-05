const badges = [
  { label: 'Certified Technicians', detail: 'NATE & OEM trained' },
  { label: '4.9 ★ Google', detail: '1,200+ reviews' },
  { label: '24/7 Emergency', detail: 'Live dispatch in 60s' },
  { label: 'Fully Insured', detail: 'General liability & workers comp' }
]

export const TrustBadges = () => (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    {badges.map((badge) => (
      <div key={badge.label} className="rounded-2xl border border-slate-100 bg-white p-4 text-center shadow-card">
        <p className="text-lg font-bold text-brand-dark">{badge.label}</p>
        <p className="text-sm text-slate-600">{badge.detail}</p>
      </div>
    ))}
  </div>
)
