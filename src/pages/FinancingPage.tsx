import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { useNavigate } from 'react-router-dom'

const terms = [12, 36, 60]

export const FinancingPage = () => {
  const [amount, setAmount] = useState(12000)
  const [term, setTerm] = useState(36)
  const apr = 0.089
  const monthlyRate = apr / 12
  const payment = Math.round((amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term)))
  const navigate = useNavigate()

  return (
    <div className="bg-white py-14">
      <Helmet>
        <title>HVAC Financing | MGM A/C Appliances</title>
        <meta name="description" content="$0 down HVAC financing with instant approvals and promotional APRs." />
      </Helmet>
      <div className="container grid gap-10 lg:grid-cols-2">
        <section className="space-y-6">
          <header>
            <p className="section-title">Flexible financing</p>
            <p className="section-subtitle">$0 down programs, instant decisions and same-day installs.</p>
          </header>
          <ul className="space-y-4 text-slate-600">
            <li>• Plans from 12 to 60 months</li>
            <li>• Promotional 0% APR options for qualified buyers</li>
            <li>• Soft credit pull pre-qualification</li>
            <li>• Works with PACE and green energy incentives</li>
          </ul>
          <Button onClick={() => navigate('/booking')}>Start application</Button>
        </section>
        <section className="rounded-2xl border border-slate-100 bg-brand-light p-6 shadow-inner">
          <p className="text-lg font-semibold text-brand-dark">Financing calculator</p>
          <div className="mt-4 space-y-4">
            <Input
              type="number"
              value={amount}
              min={3000}
              max={35000}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
            <Select value={String(term)} onChange={(e) => setTerm(Number(e.target.value))}>
              {terms.map((value) => (
                <option key={value} value={value}>
                  {value} months
                </option>
              ))}
            </Select>
          </div>
          <div className="mt-6 rounded-2xl bg-white p-4 text-center shadow-card">
            <p className="text-sm uppercase tracking-wide text-slate-500">Estimated payment</p>
            <p className="text-4xl font-bold text-brand-dark">${payment}/mo</p>
            <p className="text-xs text-slate-500">At {apr * 100}% APR • Estimates only</p>
          </div>
        </section>
      </div>
    </div>
  )
}
