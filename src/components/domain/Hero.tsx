import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { CONTACT_PHONE_LINK } from '@/config/site'
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/utils'
import { track } from '@/lib/analytics'

interface HeroProps {
  title: string
  subtitle: string
  highlight?: string
  stats: ReadonlyArray<{ value: string; label: string }>
  callLabel: string
  primaryCtaLabel: string
  coverageEyebrow: string
  coverageTitle: string
  coverageBody: string
  coveragePoints: ReadonlyArray<string>
  forceReducedMotion?: boolean
}

const PARTICLE_MAX = 120

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
}

export const Hero = ({ forceReducedMotion, ...props }: HeroProps) => {
  const navigate = useNavigate()
  const reducedMotionFromHook = usePrefersReducedMotion()
  const reducedMotion = forceReducedMotion ?? reducedMotionFromHook

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <HeroMetricsBeacon />
      <HeroSurface reducedMotion={reducedMotion} />
      <div className="container relative z-10 grid gap-10 py-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,0.65fr)] lg:py-24">
        <HeroCopy {...props} reducedMotion={reducedMotion} onPrimaryCta={() => navigate('/booking')} />
        <HeroCoverage
          eyebrow={props.coverageEyebrow}
          title={props.coverageTitle}
          body={props.coverageBody}
          points={props.coveragePoints}
          callLabel={props.callLabel}
        />
      </div>
    </section>
  )
}

const HeroCopy = ({
  highlight,
  title,
  subtitle,
  stats,
  primaryCtaLabel,
  callLabel,
  onPrimaryCta,
  reducedMotion
}: HeroProps & { onPrimaryCta: () => void; reducedMotion: boolean }) => {
  const [hasIntersected, setHasIntersected] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (reducedMotion) {
      return
    }

    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setHasIntersected(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [reducedMotion])

  const visible = reducedMotion || hasIntersected
  const animatedClass = visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'

  return (
    <div ref={ref} className="space-y-8">
      {highlight && (
        <span
          className={cn(
            'inline-flex rounded-full bg-white/10 px-5 py-1 text-sm font-semibold uppercase tracking-wide text-white/90 shadow-lg shadow-black/30 transition-all duration-500',
            animatedClass
          )}
          style={{ transitionDelay: '0ms' }}
        >
          {highlight}
        </span>
      )}
      <h1
        className={cn('text-4xl font-semibold leading-tight text-white md:text-5xl lg:text-6xl', animatedClass)}
        style={{ transitionDelay: '120ms', transitionDuration: '500ms' }}
      >
        {title}
      </h1>
      <p
        className={cn('text-lg text-white/80 md:text-xl', animatedClass)}
        style={{ transitionDelay: '240ms', transitionDuration: '500ms' }}
      >
        {subtitle}
      </p>
      <div className={cn('flex flex-wrap gap-4', animatedClass)} style={{ transitionDelay: '360ms', transitionDuration: '500ms' }}>
        <PrimaryCTA label={primaryCtaLabel} onClick={onPrimaryCta} />
        <Button
          variant="ghost"
          size="lg"
          onClick={() => (window.location.href = CONTACT_PHONE_LINK)}
          className="border border-white/30 bg-white/5 text-white hover:border-white/80 hover:bg-white/10 focus-visible:outline-white"
        >
          {callLabel}
        </Button>
      </div>
      <div className={cn('flex flex-wrap gap-6 text-left text-white/80', animatedClass)} style={{ transitionDelay: '480ms' }}>
        {stats.map((stat) => (
          <div key={stat.label} className="min-w-[140px]">
            <p className="text-3xl font-bold text-white lg:text-4xl">{stat.value}</p>
            <p className="text-sm uppercase tracking-wide text-white/60">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const HeroCoverage = ({ eyebrow, title, body, points, callLabel }: { eyebrow: string; title: string; body: string; points: ReadonlyArray<string>; callLabel: string }) => {
  return (
    <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur">
      <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/70">{eyebrow}</p>
      <h2 className="mt-6 text-3xl font-semibold text-white">{title}</h2>
      <p className="mt-4 text-white/80">{body}</p>
      <ul className="mt-6 space-y-3 text-white/80">
        {points.map((point) => (
          <li key={point} className="flex items-start gap-3 text-base">
            <span className="mt-1 inline-block h-2 w-2 rounded-full bg-brand-primary" aria-hidden />
            <span>{point}</span>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-sm uppercase tracking-wide text-white/70">{callLabel}</p>
    </div>
  )
}

const PrimaryCTA = ({ label, onClick }: { label: string; onClick: () => void }) => {
  return (
    <Button
      size="lg"
      onClick={onClick}
      className="hero-cta-pulse hero-cta-shimmer focus-visible:ring-4 focus-visible:ring-white/60 focus-visible:outline-none px-8 py-3.5 text-base shadow-[0_20px_45px_rgba(15,23,42,0.45)] transition-transform duration-150 hover:scale-[1.02] active:scale-[0.97]"
    >
      {label}
    </Button>
  )
}

const HeroSurface = ({ reducedMotion }: { reducedMotion: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (reducedMotion) return
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrame: number
    let particles: Particle[] = []

    const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min

    const createParticles = () => {
      const { clientWidth, clientHeight } = canvas
      const count = Math.min(PARTICLE_MAX, Math.max(40, Math.floor((clientWidth * clientHeight) / 6000)))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * clientWidth,
        y: Math.random() * clientHeight,
        vx: randomBetween(-0.15, 0.15),
        vy: randomBetween(-0.15, 0.15),
        radius: randomBetween(30, 110),
        opacity: randomBetween(0.05, 0.25)
      }))
    }

    const resize = () => {
      const { clientWidth, clientHeight } = canvas
      const dpr = window.devicePixelRatio || 1
      canvas.width = clientWidth * dpr
      canvas.height = clientHeight * dpr
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
      createParticles()
    }

    const render = () => {
      const { clientWidth, clientHeight } = canvas
      ctx.clearRect(0, 0, clientWidth, clientHeight)
      ctx.globalCompositeOperation = 'lighter'

      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x - particle.radius > clientWidth) particle.x = -particle.radius
        if (particle.x + particle.radius < 0) particle.x = clientWidth + particle.radius
        if (particle.y - particle.radius > clientHeight) particle.y = -particle.radius
        if (particle.y + particle.radius < 0) particle.y = clientHeight + particle.radius

        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.radius)
        gradient.addColorStop(0, `rgba(14, 165, 233, ${particle.opacity + 0.1})`)
        gradient.addColorStop(1, 'rgba(15, 23, 42, 0)')

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrame = window.requestAnimationFrame(render)
    }

    resize()
    window.addEventListener('resize', resize)
    animationFrame = window.requestAnimationFrame(render)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
    }
  }, [reducedMotion])

  return (
    <div className="absolute inset-0">
      {reducedMotion ? (
        <div className="hero-ambient-layer absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.45),transparent_55%),radial-gradient(circle_at_80%_0%,rgba(248,250,252,0.15),transparent_55%),radial-gradient(circle_at_50%_80%,rgba(37,99,235,0.35),transparent_60%)]" />
      ) : (
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/10 via-slate-950/70 to-slate-950" />
    </div>
  )
}

const HERO_MARK = 'hero:visible'
const HERO_MEASURE = 'hero:interaction-ready'

const HeroMetricsBeacon = () => {
  useEffect(() => {
    if (typeof performance === 'undefined' || !performance.mark) return
    performance.mark(HERO_MARK)

    const timeout = window.setTimeout(() => {
      let interactionDuration: number | undefined
      if (performance.measure) {
        const measure = performance.measure(HERO_MEASURE, 'navigationStart', HERO_MARK)
        interactionDuration = measure?.duration
      }

      track('hero:ready', {
        component: 'immersive-hero',
        durationMs: interactionDuration,
        timestamp: Date.now()
      })

      window.dispatchEvent(
        new CustomEvent('hero:metrics', {
          detail: {
            component: 'immersive-hero',
            durationMs: interactionDuration,
            timestamp: Date.now()
          }
        })
      )

      if (performance.clearMarks) {
        performance.clearMarks(HERO_MARK)
      }
      if (performance.clearMeasures) {
        performance.clearMeasures(HERO_MEASURE)
      }
    }, 0)

    return () => window.clearTimeout(timeout)
  }, [])

  return null
}
