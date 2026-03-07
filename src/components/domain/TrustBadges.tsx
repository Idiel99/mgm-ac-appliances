interface BadgeItem {
  label: string
  detail: string
}

interface TrustBadgesProps {
  items: ReadonlyArray<BadgeItem>
}

export const TrustBadges = ({ items }: TrustBadgesProps) => (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    {items.map((badge) => (
      <div key={badge.label} className="rounded-2xl border border-slate-100 bg-white p-4 text-center shadow-card">
        <p className="text-lg font-bold text-brand-dark">{badge.label}</p>
        <p className="text-sm text-slate-600">{badge.detail}</p>
      </div>
    ))}
  </div>
)
