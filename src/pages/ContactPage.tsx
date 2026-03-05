import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'

export const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="bg-white py-14">
      <Helmet>
        <title>Contact MGM A/C Appliances</title>
        <meta name="description" content="Reach dispatch, sales or commercial HVAC teams across Florida." />
      </Helmet>
      <div className="container grid gap-10 lg:grid-cols-2">
        <section className="space-y-4">
          <p className="section-title">Let’s talk HVAC</p>
          <p className="section-subtitle">Call 305-555-0100 or send a message for proposals, partnerships or emergencies.</p>
          <div className="rounded-2xl bg-brand-light p-6">
            <p className="text-lg font-semibold text-brand-dark">Dispatch Centers</p>
            <p className="text-sm text-slate-600">Miami • Fort Lauderdale • Orlando • Tampa</p>
            <p className="mt-4 text-sm text-slate-600">Email: dispatch@mgmacappliances.com</p>
          </div>
        </section>
        <section className="rounded-2xl border border-slate-100 p-6 shadow-card">
          {submitted ? (
            <div className="space-y-3 text-center">
              <p className="text-2xl font-semibold text-brand-dark">Message received</p>
              <p className="text-slate-600">Our team will respond within one business hour.</p>
            </div>
          ) : (
            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault()
                setSubmitted(true)
              }}
            >
              <Input placeholder="Full name" required />
              <Input type="email" placeholder="Email" required />
              <Input type="tel" placeholder="Phone" required />
              <Textarea rows={5} placeholder="How can we help?" required />
              <Button type="submit" className="w-full">
                Send message
              </Button>
            </form>
          )}
        </section>
      </div>
    </div>
  )
}
