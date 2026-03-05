import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { GalleryGrid } from '@/components/domain/GalleryGrid'
import { projects } from '@/content'
import { Modal } from '@/components/ui/Modal'
import type { ProjectItem } from '@/content/types'

export const GalleryPage = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)

  return (
    <div className="bg-white py-14">
      <Helmet>
        <title>Project Gallery | MGM A/C Appliances</title>
        <meta name="description" content="Before/after HVAC transformations across Miami, Orlando and Tampa." />
      </Helmet>
      <div className="container space-y-6">
        <header>
          <p className="section-title">Recent projects</p>
          <p className="section-subtitle">High-rise retrofits, luxury estates and emergency saves.</p>
        </header>
        <GalleryGrid projects={projects} onSelect={setSelectedProject} />
      </div>

      <Modal
        title={selectedProject?.title ?? ''}
        description={selectedProject ? `${selectedProject.serviceType} • ${selectedProject.city}` : undefined}
        open={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      >
        {selectedProject && (
          <div className="space-y-3 text-slate-600">
            <p>{selectedProject.description}</p>
            <div className="rounded-2xl bg-brand-light p-4 text-sm text-brand-dark">
              Image placeholders: {selectedProject.beforeImage} → {selectedProject.afterImage}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
