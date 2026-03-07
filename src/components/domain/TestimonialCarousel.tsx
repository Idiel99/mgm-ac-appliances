interface Testimonial {
  quote: string
  author: string
  city: string
}

interface Props {
  testimonials: ReadonlyArray<Testimonial>
}

export const TestimonialCarousel = ({ testimonials }: Props) => (
  <div className="overflow-x-auto">
    <div className="flex gap-4">
      {testimonials.map((testimonial) => (
        <figure key={testimonial.author} className="min-w-[280px] flex-1 rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
          <p className="text-lg font-semibold text-brand-dark">“{testimonial.quote}”</p>
          <figcaption className="mt-4 text-sm text-slate-600">
            {testimonial.author} • {testimonial.city}
          </figcaption>
        </figure>
      ))}
    </div>
  </div>
)
