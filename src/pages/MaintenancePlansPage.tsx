import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { plans } from '@/content'
import { PricingTable } from '@/components/domain/PricingTable'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import type { PlanItem } from '@/content/types'
import { useNavigate } from 'react-router-dom'

export const MaintenancePlansPage = () => {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly')
  const [selectedPlan, setSelectedPlan] = useState<PlanItem | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const navigate = useNavigate()

  const handleSelectPlan = (plan: PlanItem) => {
    setSelectedPlan(plan)
    setModalOpen(true)
  }

  return (
    <div className="bg-white py-14">
      <Helmet>
        <title>HVAC Maintenance Plans | MGM A/C Appliances</title>
        <meta name="description" content="Seasonal tune-ups, repair discounts and priority dispatching for Florida homeowners and HOAs." />
      </Helmet>
      <div className="container space-y-8">
        <header className="space-y-4">
          <p className="section-title">Maintenance memberships</p>
          <p className="section-subtitle">Prevent breakdowns, lock priority dispatch and slash repair costs.</p>
          <div className="inline-flex rounded-full border border-slate-200 p-1">
            <button
              className={`rounded-full px-4 py-2 text-sm font-semibold ${billing === 'monthly' ? 'bg-brand-primary text-white' : 'text-brand-dark'}`}
              onClick={() => setBilling('monthly')}
            >
              Monthly
            </button>
            <button
              className={`rounded-full px-4 py-2 text-sm font-semibold ${billing === 'yearly' ? 'bg-brand-primary text-white' : 'text-brand-dark'}`}
              onClick={() => setBilling('yearly')}
            >
              Yearly (save 15%)
            </button>
          </div>
        </header>
        <PricingTable plans={plans} billing={billing} onSelectPlan={handleSelectPlan} />
        <div className="rounded-2xl bg-brand-dark p-6 text-white">
          <p className="text-2xl font-semibold">Need a multi-property plan?</p>
          <p className="mt-2 text-white/80">Our commercial team builds maintenance contracts for HOAs, resorts and portfolios with 10-500 rooftops.</p>
          <Button className="mt-4" variant="secondary" onClick={() => navigate('/contact')}>
            Talk to commercial team
          </Button>
        </div>
      </div>

      <Modal
        title={selectedPlan ? `Enroll in ${selectedPlan.name}` : 'Enroll'}
        description={selectedPlan ? `${selectedPlan.bestFor} • ${billing === 'monthly' ? `$${selectedPlan.priceMonthly}/mo` : `$${selectedPlan.priceYearly}/yr`}` : undefined}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        {selectedPlan ? (
          <div className="space-y-4">
            <ul className="space-y-2 text-slate-600">
              {selectedPlan.perks.map((perk) => (
                <li key={perk}>• {perk}</li>
              ))}
            </ul>
            <Button className="w-full" onClick={() => navigate('/booking')}>
              Continue to booking
            </Button>
          </div>
        ) : null}
      </Modal>
    </div>
  )
}
