import type { PlanItem } from '@/content/types'
import { Button } from '@/components/ui/Button'

interface PricingTableProps {
  plans: PlanItem[]
  billing: 'monthly' | 'yearly'
  onSelectPlan?: (plan: PlanItem) => void
}

export const PricingTable = ({ plans, billing, onSelectPlan }: PricingTableProps) => (
  <div className="grid gap-6 md:grid-cols-3">
    {plans.map((plan) => {
      const price = billing === 'monthly' ? `$${plan.priceMonthly}/mo` : `$${plan.priceYearly}/yr`
      return (
        <article key={plan.id} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-primary">{plan.bestFor}</p>
          <h3 className="mt-2 text-2xl font-semibold text-brand-dark">{plan.name}</h3>
          <p className="mt-4 text-4xl font-bold text-brand-dark">{price}</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {plan.perks.map((perk) => (
              <li key={perk}>• {perk}</li>
            ))}
          </ul>
          <Button className="mt-6 w-full" onClick={() => onSelectPlan?.(plan)}>
            Enroll now
          </Button>
        </article>
      )
    })}
  </div>
)
