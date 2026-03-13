import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router-dom'
import { Hero } from './Hero'

const meta = {
  title: 'Domain/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    )
  ]
} satisfies Meta<typeof Hero>

export default meta

type Story = StoryObj<typeof meta>

const baseArgs = {
  highlight: '24/7 On-Call Fleet',
  title: 'Enterprise HVAC that feels bespoke for every property',
  subtitle: 'Luxury residences and commercial towers across Miami trust MGM A/C Appliances for proactive maintenance, rapid dispatch, and white-glove installs.',
  stats: [
    { value: '1,200+', label: 'Systems monitored' },
    { value: '22 min', label: 'Avg on-site dispatch' },
    { value: '98%', label: 'Same-day resolution' }
  ],
  callLabel: 'Call the command desk',
  primaryCtaLabel: 'Book a site assessment',
  coverageEyebrow: 'South Florida Coverage',
  coverageTitle: 'From Brickell penthouses to Boca campuses',
  coverageBody: 'Layered response pods across Miami-Dade, Broward, Palm Beach and Orange counties keep techs within 30 minutes of any call.',
  coveragePoints: ['Tier-1 enterprise monitoring', 'Dedicated retrofit architects', '24/7 emergency ops line']
}

export const Immersive: Story = {
  args: baseArgs
}

export const ReducedMotion: Story = {
  args: {
    ...baseArgs,
    forceReducedMotion: true
  }
}
