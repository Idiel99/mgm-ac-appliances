import { useMemo, useState } from 'react'
import { services } from '@/content'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { track } from '@/lib/analytics'

const propertyTypes = ['Single-family', 'Townhome/Condo', 'Commercial', 'Multi-site']
const appointmentWindows = ['Morning (8a-12p)', 'Afternoon (12p-4p)', 'Evening (4p-8p)']

interface FormState {
  service: string
  propertyType: string
  address: string
  city: string
  preferredWindow: string
  contactName: string
  contactEmail: string
  contactPhone: string
  notes: string
}

const initialState: FormState = {
  service: '',
  propertyType: '',
  address: '',
  city: '',
  preferredWindow: '',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  notes: ''
}

const steps = [
  { id: 1, title: 'Select service' },
  { id: 2, title: 'Property details' },
  { id: 3, title: 'Contact info' },
  { id: 4, title: 'Review & submit' }
]

export const BookingWizard = () => {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormState>(initialState)
  const [submitted, setSubmitted] = useState(false)

  const canProceed = useMemo(() => {
    if (step === 1) return Boolean(form.service)
    if (step === 2) return Boolean(form.propertyType && form.address && form.city && form.preferredWindow)
    if (step === 3) return Boolean(form.contactName && form.contactEmail && form.contactPhone)
    return true
  }, [form, step])

  const handleNext = () => setStep((current) => Math.min(current + 1, steps.length))
  const handleBack = () => setStep((current) => Math.max(current - 1, 1))

  const handleChange = (key: keyof FormState, value: string) => setForm((state) => ({ ...state, [key]: value }))

  const handleSubmit = () => {
    setSubmitted(true)
    track('booking_submitted', form)
  }

  if (submitted) {
    return (
      <div className="rounded-3xl bg-white p-8 text-center shadow-card">
        <h3 className="text-3xl font-semibold text-brand-dark">Request submitted</h3>
        <p className="mt-3 text-slate-600">
          Dispatch has your request. Expect a confirmation call within 5 minutes and a technician ETA shortly after.
        </p>
        <Button className="mt-6" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Back to homepage
        </Button>
      </div>
    )
  }

  return (
    <div className="rounded-3xl bg-white p-6 shadow-card">
      <div className="flex flex-wrap items-center gap-3">
        {steps.map((s) => (
          <div key={s.id} className="flex items-center gap-2">
            <div
              className={`h-10 w-10 rounded-full text-center text-lg font-semibold leading-10 ${
                s.id <= step ? 'bg-brand-primary text-white' : 'bg-brand-light text-brand-dark'
              }`}
            >
              {s.id}
            </div>
            <span className="text-sm font-semibold text-brand-dark">{s.title}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {step === 1 && (
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-primary">Step 1</p>
            <h3 className="text-2xl font-semibold text-brand-dark">Which service do you need?</h3>
            <Select value={form.service} onChange={(e) => handleChange('service', e.target.value)}>
              <option value="">Select a service</option>
              {services.map((service) => (
                <option key={service.slug} value={service.slug}>
                  {service.name}
                </option>
              ))}
            </Select>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-primary">Step 2</p>
            <h3 className="text-2xl font-semibold text-brand-dark">Property details</h3>
            <Select value={form.propertyType} onChange={(e) => handleChange('propertyType', e.target.value)}>
              <option value="">Property type</option>
              {propertyTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
            <Input placeholder="Street address" value={form.address} onChange={(e) => handleChange('address', e.target.value)} />
            <Input placeholder="City" value={form.city} onChange={(e) => handleChange('city', e.target.value)} />
            <Select value={form.preferredWindow} onChange={(e) => handleChange('preferredWindow', e.target.value)}>
              <option value="">Preferred appointment window</option>
              {appointmentWindows.map((window) => (
                <option key={window} value={window}>
                  {window}
                </option>
              ))}
            </Select>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-primary">Step 3</p>
            <h3 className="text-2xl font-semibold text-brand-dark">How do we reach you?</h3>
            <Input placeholder="Full name" value={form.contactName} onChange={(e) => handleChange('contactName', e.target.value)} />
            <Input type="email" placeholder="Email" value={form.contactEmail} onChange={(e) => handleChange('contactEmail', e.target.value)} />
            <Input type="tel" placeholder="Phone" value={form.contactPhone} onChange={(e) => handleChange('contactPhone', e.target.value)} />
            <Textarea rows={4} placeholder="Any notes we should know?" value={form.notes} onChange={(e) => handleChange('notes', e.target.value)} />
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-primary">Review</p>
            <h3 className="text-2xl font-semibold text-brand-dark">Confirm details</h3>
            <div className="grid gap-4 rounded-2xl border border-slate-100 bg-brand-light p-4 md:grid-cols-2">
              {Object.entries(form).map(([key, value]) => (
                <div key={key}>
                  <p className="text-xs uppercase tracking-wide text-slate-500">{key}</p>
                  <p className="text-base font-semibold text-brand-dark">{value || '—'}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <Button variant="secondary" onClick={handleBack} disabled={step === 1}>
          Back
        </Button>
        {step < steps.length ? (
          <Button onClick={handleNext} disabled={!canProceed}>
            Next
          </Button>
        ) : (
          <Button onClick={handleSubmit}>Submit request</Button>
        )}
      </div>
    </div>
  )
}
