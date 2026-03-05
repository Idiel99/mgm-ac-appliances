/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}'
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        lg: '2rem'
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '960px',
        xl: '1200px'
      }
    },
    extend: {
      colors: {
        brand: {
          primary: '#0A66C2',
          dark: '#0F2A44',
          light: '#F5F7FA'
        },
        accent: '#FF7A00',
        success: '#16A34A',
        danger: '#DC2626'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        card: '0 12px 30px rgba(15, 42, 68, 0.08)'
      },
      borderRadius: {
        xl: '1rem'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
}
