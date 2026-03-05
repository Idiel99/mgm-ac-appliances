import type { ProjectItem } from '@/content/types'

interface GalleryGridProps {
  projects: ProjectItem[]
  onSelect?: (project: ProjectItem) => void
}

export const GalleryGrid = ({ projects, onSelect }: GalleryGridProps) => (
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {projects.map((project) => (
      <article
        key={project.id}
        role={onSelect ? 'button' : undefined}
        tabIndex={onSelect ? 0 : undefined}
        onClick={() => onSelect?.(project)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            onSelect?.(project)
          }
        }}
        className="rounded-2xl border border-slate-100 bg-white p-4 shadow-card transition hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
      >
        <div className="rounded-2xl bg-slate-100 p-6 text-center text-sm text-slate-500">
          Before/after placeholder ({project.beforeImage.split('/').pop()})
        </div>
        <h3 className="mt-4 text-xl font-semibold text-brand-dark">{project.title}</h3>
        <p className="text-sm text-slate-500">
          {project.serviceType} • {project.city}
        </p>
        <p className="mt-3 text-slate-600">{project.description}</p>
      </article>
    ))}
  </div>
)
