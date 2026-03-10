export type Language = 'en' | 'es'

export const copy = {
  en: {
    header: {
      tagline: 'Enterprise Service',
      nav: {
        services: 'Services',
        serviceAreas: 'Service Areas',
        maintenancePlans: 'Maintenance Plans',
        financing: 'Financing',
        commercial: 'Commercial HVAC',
        blog: 'Blog',
        about: 'About',
        contact: 'Contact'
      },
      callNow: 'Call 305-720-8273',
      schedule: 'Schedule Service',
      languageLabel: 'Language',
      options: { en: 'EN', es: 'ES' }
    },
    hero: {
      title: 'MGM A/C Appliances — Florida’s Family HVAC Partner',
      subtitle:
        'Three generations of the MGM family deliver 24/7 care for homes, HOAs, commercial spaces and mission-critical facilities across Miami, Fort Lauderdale, Orlando and Tampa.',
      highlight: 'Family owned & operated',
      stats: [
        { value: '24/7', label: 'Emergency dispatch' },
        { value: '45k+', label: 'Systems maintained' },
        { value: '4.9 ★', label: 'Google rating' }
      ],
      callLabel: 'Call 305-720-8273',
      primaryCta: 'Schedule Service',
      coverageEyebrow: 'Florida coverage',
      coverageTitle: 'Enterprise HVAC for Miami, Fort Lauderdale, Orlando & Tampa',
      coverageBody:
        'Dedicated technician teams in each market, fleet GPS tracking, and redundancy for storm season to keep residences, data rooms and commercial spaces online.',
      coveragePoints: [
        'Fully insured field teams on call 24/7',
        'FEMA & hurricane response ready',
        'Financing up to 60 months'
      ]
    },
    home: {
      familySection: {
        title: 'Insured. Battle-tested for Miami heat.',
        subtitle: 'Trusted by 8,000+ homeowners and 120 commercial properties.',
        cards: [
          {
            title: 'Three-generation roots',
            copy: 'Grandparents started in Hialeah garages; today their kids and grandkids still run every crew.'
          },
          {
            title: 'Neighbors first',
            copy: 'Technicians live in the same neighborhoods they serve—no outsourced call centers.'
          },
          {
            title: 'Hands-on ownership',
            copy: 'An MGM family member reviews every major install and follows up with homeowners personally.'
          }
        ]
      },
      servicesSection: {
        title: 'Flagship HVAC services',
        subtitle: 'From emergency repair to multi-zone installs engineered for Florida humidity.',
        cta: 'View all services'
      },
      emergencySection: {
        title: '24/7 Emergency HVAC Command',
        subtitle:
          'Live humans answer within 60 seconds. Fleet GPS tracking + temporary cooling assets ready for data rooms & luxury residences.',
        detailsCta: 'Emergency details'
      },
      coverageSection: {
        title: 'Florida coverage',
        subtitle: 'Local teams embedded in every metro for lightning response.',
        cta: 'Explore service areas'
      },
      testimonialsSection: {
        title: 'Homeowner + HOA love',
        subtitle: 'Straight from recent dispatches across Miami-Dade.',
        items: [
          { quote: 'Technician arrived fast and fixed our AC the same day.', author: 'Maria P.', city: 'Miami Beach' },
          {
            quote: 'Felt like working with family—the owners even called afterward to check temperatures.',
            author: 'Andre V.',
            city: 'Fort Lauderdale'
          },
          { quote: 'They remember our kids’ names and still deliver enterprise-level quality.', author: 'Lena S.', city: 'Brickell' }
        ]
      },
      blogSection: {
        title: 'HVAC Learning Center',
        subtitle: 'Practical HVAC intelligence written for South Florida properties.',
        cta: 'View blog'
      },
      trustBadges: [
        { label: 'Family Owned', detail: 'Serving Florida since 1998' },
        { label: '4.9 ★ Google', detail: '1,200+ reviews' },
        { label: '24/7 Emergency', detail: 'Live dispatch in 60s' },
        { label: 'Fully Insured', detail: 'General liability & workers comp' }
      ]
    },
    servicesPage: {
      metaTitle: 'HVAC Services | MGM A/C Appliances',
      metaDescription: 'Comprehensive HVAC repair, installation, emergency response and IAQ services across Florida.',
      title: 'All services',
      subtitle: 'Enterprise-ready HVAC programs for homeowners, HOAs, commercial properties and developers.'
    },
    serviceAreasPage: {
      metaTitle: 'Florida Service Areas | MGM A/C Appliances',
      metaDescription: 'Miami, Fort Lauderdale, Orlando and Tampa HVAC coverage with city-specific response times.',
      title: 'Florida coverage map',
      subtitle: 'Dedicated teams across Miami-Dade, Broward, Orange/Seminole and Hillsborough/Pinellas counties.'
    },
    cityPage: {
      notFound: 'City not found.',
      neighborhoodsTitle: 'Neighborhoods + Coverage',
      faqsTitle: 'FAQs'
    },
    serviceDetailPage: {
      notFoundTitle: 'Service not found',
      notFoundCta: 'Back to services',
      symptomsTitle: 'Symptoms we solve',
      includesTitle: 'What’s included',
      faqsTitle: 'Frequently asked questions',
      relatedTitle: 'Related services'
    },
    maintenancePlansPage: {
      metaTitle: 'HVAC Maintenance Plans | MGM A/C Appliances',
      metaDescription: 'Seasonal tune-ups, repair discounts and priority dispatching for Florida homeowners and HOAs.',
      title: 'Maintenance memberships',
      subtitle: 'Prevent breakdowns, lock priority dispatch and slash repair costs.',
      billingMonthly: 'Monthly',
      billingYearly: 'Yearly (save 15%)',
      multiPropertyTitle: 'Need a multi-property plan?',
      multiPropertyBody: 'Our commercial team builds maintenance contracts for HOAs, resorts and portfolios with 10-500 rooftops.',
      modalFallbackTitle: 'Enroll'
    },
    financingPage: {
      metaTitle: 'HVAC Financing | MGM A/C Appliances',
      metaDescription: '$0 down HVAC financing with instant approvals and promotional APRs.',
      title: 'Flexible financing',
      subtitle: '$0 down programs, instant decisions and same-day installs.',
      bullets: [
        'Plans from 12 to 60 months',
        'Promotional 0% APR options for qualified buyers',
        'Soft credit pull pre-qualification',
        'Works with PACE and green energy incentives'
      ],
      calculatorTitle: 'Financing calculator',
      amountLabel: 'Estimated project amount',
      termLabel: 'Select term length',
      termSuffix: 'months',
      estimatedPaymentLabel: 'Estimated payment',
      estimatedPaymentNote: 'At {apr}% APR • Estimates only'
    },
    aboutPage: {
      metaTitle: 'About MGM A/C Appliances',
      metaDescription: 'Family-owned HVAC pros combining neighborhood care with enterprise-scale delivery.',
      title: 'Family-owned, South Florida proud',
      subtitle:
        'MGM A/C Appliances began as a single-truck operation in 1998. The same family still answers the phone, rides along on installs and checks in with customers after every job.',
      storyTitle: 'Our story',
      storyBody:
        'Our parents built MGM on word-of-mouth service calls around Miami-Dade. Their kids grew up in the warehouse, learned the trade, and now lead dispatch, installs and customer care.',
      storyFooter: 'We still sign every estimate with our family name.',
      todayTitle: 'Today',
      todayList: [
        '200+ technicians stationed across Miami, Broward, Orlando and Tampa',
        'Family members embedded in every department (operations, finance, QA)',
        'Concierge-style updates after service so homeowners always hear from “one of the MGM’s”'
      ],
      values: [
        {
          title: 'Family handshake promise',
          copy: 'We treat every job like we’re repairing our own parents’ AC — and we show up when we say we will.'
        },
        {
          title: 'Community investment',
          copy: 'Portion of every install funds neighborhood STEM programs and trade school scholarships.'
        },
        {
          title: 'Enterprise discipline',
          copy: 'While we’re family-owned, we still document every visit, photo-log installs and maintain enterprise SLAs.'
        }
      ]
    },
    commercialPage: {
      metaTitle: 'Commercial HVAC | MGM A/C Appliances',
      metaDescription: 'Rooftop packaged units, VRF systems and maintenance contracts for Florida commercial properties.',
      title: 'Commercial HVAC programs',
      subtitle: 'Engineers, project managers and 24/7 building automation monitoring.',
      cards: [
        { title: 'Rooftop & VRF installs', copy: 'Project management, commissioning and remote monitoring for mission-critical facilities.' },
        { title: 'National account service', copy: 'Project management, commissioning and remote monitoring for mission-critical facilities.' },
        { title: 'Building analytics', copy: 'Project management, commissioning and remote monitoring for mission-critical facilities.' }
      ]
    },
    galleryPage: {
      metaTitle: 'Project Gallery | MGM A/C Appliances',
      metaDescription: 'Before/after HVAC transformations across Miami, Orlando and Tampa.',
      title: 'Recent projects',
      subtitle: 'High-rise retrofits, luxury estates and emergency saves.',
      placeholder: 'Before/after placeholder',
      modalLabel: 'Image placeholders'
    },
    blogPage: {
      metaTitle: 'HVAC Blog | MGM A/C Appliances',
      metaDescription: 'Guides on Florida HVAC maintenance, humidity control and energy optimization.',
      title: 'HVAC Learning Center',
      subtitle: 'Actionable insights for Florida homeowners, HOAs and facility managers.'
    },
    blogPostPage: {
      notFound: 'Article not found.',
      placeholderParagraph:
        'Florida HVAC systems battle humidity, salt air and nonstop runtime. We design posts to educate homeowners on preventative steps, financing tips and upgrade pathways.'
    },
    privacyPage: {
      metaTitle: 'Privacy Policy | MGM A/C Appliances',
      title: 'Privacy Policy',
      paragraphs: [
        'We collect contact details to schedule HVAC appointments, provide quotes and send maintenance reminders.',
        'Data is stored in encrypted systems and never sold. Users may request deletion by emailing privacy@mgmacappliances.com.',
        'Cookies are used for analytics and personalization. Continuing to use the site implies consent.'
      ]
    },
    termsPage: {
      metaTitle: 'Terms & Conditions | MGM A/C Appliances',
      title: 'Terms & Conditions',
      paragraphs: [
        'MGM A/C Appliances provides services per signed proposals. Online bookings are scheduling requests until confirmed by dispatch.',
        'All warranties are void if third parties modify installed equipment. Financing offers subject to credit approval.',
        'Use of this site constitutes agreement to these terms and the privacy policy.'
      ]
    },
    notFoundPage: {
      title: 'The air here is empty.',
      subtitle: 'Let’s get you back to cool.',
      cta: 'Return home'
    },
    booking: {
      title: 'Schedule service in 4 steps',
      subtitle: 'Emergency? Call 305-720-8273 for priority routing.'
    },
    bookingWizard: {
      steps: ['Select service', 'Property details', 'Contact info', 'Review & submit'],
      reviewLabel: 'Review',
      confirmHeading: 'Confirm details',
      successTitle: 'Request submitted',
      successBody: 'Dispatch has your request. Expect a confirmation call within 5 minutes and a technician ETA shortly after.',
      questions: {
        service: 'Which service do you need?',
        property: 'Property details',
        contact: 'How do we reach you?'
      },
      prompts: {
        stepLabel: 'Step',
        selectService: 'Select a service',
        propertyType: 'Property type',
        appointmentWindow: 'Preferred appointment window',
        notes: 'Any notes we should know?'
      },
      propertyTypes: ['Single-family', 'Townhome/Condo', 'Commercial', 'Multi-site'],
      appointmentWindows: ['Morning (8a-12p)', 'Afternoon (12p-4p)', 'Evening (4p-8p)'],
      fields: {
        service: 'Service',
        propertyType: 'Property type',
        address: 'Street address',
        city: 'City',
        preferredWindow: 'Preferred appointment window',
        contactName: 'Full name',
        contactEmail: 'Email',
        contactPhone: 'Phone',
        notes: 'Notes'
      }
    },
    contact: {
      title: 'Let’s talk HVAC',
      subtitle:
        'Call 305-720-8273 or send a message for proposals, partnerships or emergencies—an MGM family member still picks up.',
      dispatchTitle: 'Dispatch Centers',
      dispatchAreas: 'Miami • Fort Lauderdale • Orlando • Tampa',
      emailLabel: 'Email',
      successTitle: 'Message received',
      successBody: 'Our team will respond within one business hour.',
      form: {
        name: 'Full name',
        email: 'Email',
        phone: 'Phone',
        notes: 'How can we help?',
        submit: 'Send message'
      }
    },
    footer: {
      description:
        'South Florida’s family-owned HVAC partner for Miami, Fort Lauderdale, Orlando and Tampa. Fully insured crews backed by 24/7 dispatch.',
      bottomLine: 'Family owned • Fully insured • BBB A+',
      sections: {
        services: 'Services',
        company: 'Company',
        legal: 'Legal'
      },
      links: {
        acRepair: 'AC Repair',
        acInstallation: 'AC Installation',
        maintenancePlans: 'Maintenance Plans',
        commercial: 'Commercial HVAC',
        about: 'About',
        blog: 'Blog',
        gallery: 'Gallery',
        careers: 'Careers',
        privacy: 'Privacy',
        terms: 'Terms'
      }
    },
    common: {
      labels: {
        serviceArea: 'Service Area'
      },
      actions: {
        exploreService: 'Explore service →',
        viewResponseTimes: 'View response times →',
        readArticle: 'Read article →',
        enrollNow: 'Enroll now',
        requestProposal: 'Request proposal',
        startApplication: 'Start application',
        talkToCommercialTeam: 'Talk to commercial team',
        continueToBooking: 'Continue to booking',
        backToHomepage: 'Back to homepage',
        back: 'Back',
        next: 'Next',
        submitRequest: 'Submit request'
      }
    }
  },
  es: {
    header: {
      tagline: 'Servicio empresarial',
      nav: {
        services: 'Servicios',
        serviceAreas: 'Zonas de servicio',
        maintenancePlans: 'Planes de mantenimiento',
        financing: 'Financiamiento',
        commercial: 'HVAC comercial',
        blog: 'Blog',
        about: 'Quiénes somos',
        contact: 'Contacto'
      },
      callNow: 'Llama al 305-720-8273',
      schedule: 'Agendar servicio',
      languageLabel: 'Idioma',
      options: { en: 'EN', es: 'ES' }
    },
    hero: {
      title: 'MGM A/C Appliances — Su socio familiar de HVAC en Florida',
      subtitle:
        'Tres generaciones de la familia MGM atienden 24/7 a hogares, HOAs, comercios y espacios críticos en Miami, Fort Lauderdale, Orlando y Tampa.',
      highlight: 'Empresa familiar',
      stats: [
        { value: '24/7', label: 'Despacho de emergencias' },
        { value: '45k+', label: 'Sistemas mantenidos' },
        { value: '4.9 ★', label: 'Calificación en Google' }
      ],
      callLabel: 'Llama al 305-720-8273',
      primaryCta: 'Agendar servicio',
      coverageEyebrow: 'Cobertura en Florida',
      coverageTitle: 'HVAC empresarial para Miami, Fort Lauderdale, Orlando y Tampa',
      coverageBody:
        'Equipos dedicados en cada mercado, flota con GPS y redundancias para mantener hogares, salas de datos y comercios en funcionamiento.',
      coveragePoints: [
        'Cuadrillas aseguradas disponibles 24/7',
        'Listos para respuestas FEMA y huracanes',
        'Financiamiento hasta 60 meses'
      ]
    },
    home: {
      familySection: {
        title: 'Asegurados. Probados bajo el calor de Miami.',
        subtitle: 'Confiables para más de 8,000 hogares y 120 propiedades comerciales.',
        cards: [
          {
            title: 'Raíces de tres generaciones',
            copy: 'Los abuelos comenzaron en garajes de Hialeah; hoy hijos y nietos siguen al mando de cada cuadrilla.'
          },
          {
            title: 'Vecinos primero',
            copy: 'Los técnicos viven en los mismos vecindarios que atienden; nada de call centers externos.'
          },
          {
            title: 'Dueños involucrados',
            copy: 'Un miembro de la familia MGM revisa cada instalación importante y llama después del servicio.'
          }
        ]
      },
      servicesSection: {
        title: 'Servicios HVAC insignia',
        subtitle: 'Desde reparaciones de emergencia hasta instalaciones multizona diseñadas para la humedad de Florida.',
        cta: 'Ver todos los servicios'
      },
      emergencySection: {
        title: 'Comando HVAC 24/7',
        subtitle: 'Respuestas en menos de 60 segundos y flota con GPS lista para residencias y espacios críticos.',
        detailsCta: 'Detalles de emergencia'
      },
      coverageSection: {
        title: 'Cobertura en Florida',
        subtitle: 'Equipos locales en cada metro para una respuesta relámpago.',
        cta: 'Explorar zonas de servicio'
      },
      testimonialsSection: {
        title: 'Clientes felices',
        subtitle: 'Testimonios de despachos recientes en el sur de Florida.',
        items: [
          { quote: 'Llegaron rapidísimo y dejaron el aire helando el mismo día.', author: 'María P.', city: 'Miami Beach' },
          {
            quote: 'Se siente como trabajar con familia; hasta llamaron después para revisar la temperatura.',
            author: 'Andrés V.',
            city: 'Fort Lauderdale'
          },
          { quote: 'Recuerdan los nombres de mis hijos y aun así operan con nivel empresarial.', author: 'Elena S.', city: 'Brickell' }
        ]
      },
      blogSection: {
        title: 'Centro de aprendizaje HVAC',
        subtitle: 'Ideas prácticas para propiedades del sur de Florida.',
        cta: 'Ver blog'
      },
      trustBadges: [
        { label: 'Empresa familiar', detail: 'Sirviendo a Florida desde 1998' },
        { label: '4.9 ★ en Google', detail: 'Más de 1,200 reseñas' },
        { label: 'Emergencias 24/7', detail: 'Despacho en 60 segundos' },
        { label: 'Totalmente asegurados', detail: 'Responsabilidad y workers comp' }
      ]
    },
    servicesPage: {
      metaTitle: 'Servicios HVAC | MGM A/C Appliances',
      metaDescription: 'Reparación, instalación, emergencias e IAQ para toda Florida.',
      title: 'Todos los servicios',
      subtitle: 'Programas HVAC de nivel empresarial para hogares, HOAs, comercios y desarrolladores.'
    },
    serviceAreasPage: {
      metaTitle: 'Zonas de servicio en Florida | MGM A/C Appliances',
      metaDescription: 'Cobertura HVAC en Miami, Fort Lauderdale, Orlando y Tampa con tiempos de respuesta por ciudad.',
      title: 'Mapa de cobertura en Florida',
      subtitle: 'Equipos dedicados en Miami-Dade, Broward, Orange/Seminole y Hillsborough/Pinellas.'
    },
    cityPage: {
      notFound: 'Ciudad no encontrada.',
      neighborhoodsTitle: 'Barrios y cobertura',
      faqsTitle: 'Preguntas frecuentes'
    },
    serviceDetailPage: {
      notFoundTitle: 'Servicio no encontrado',
      notFoundCta: 'Volver a servicios',
      symptomsTitle: 'Síntomas que resolvemos',
      includesTitle: 'Qué incluye',
      faqsTitle: 'Preguntas frecuentes',
      relatedTitle: 'Servicios relacionados'
    },
    maintenancePlansPage: {
      metaTitle: 'Planes de mantenimiento HVAC | MGM A/C Appliances',
      metaDescription: 'Ajustes estacionales, descuentos en reparaciones y despacho prioritario para Florida.',
      title: 'Membresías de mantenimiento',
      subtitle: 'Evita fallas, asegura despacho prioritario y reduce el costo de reparaciones.',
      billingMonthly: 'Mensual',
      billingYearly: 'Anual (ahorra 15%)',
      multiPropertyTitle: '¿Necesitas un plan para varias propiedades?',
      multiPropertyBody: 'Nuestro equipo comercial diseña contratos para HOAs, resorts y carteras de 10-500 techos.',
      modalFallbackTitle: 'Inscribirse'
    },
    financingPage: {
      metaTitle: 'Financiamiento HVAC | MGM A/C Appliances',
      metaDescription: 'Financiamiento HVAC con $0 de enganche, aprobaciones instantáneas y APR promocionales.',
      title: 'Financiamiento flexible',
      subtitle: 'Programas con $0 de enganche, decisiones instantáneas e instalaciones el mismo día.',
      bullets: [
        'Planes de 12 a 60 meses',
        'Opciones promocionales 0% APR para clientes calificados',
        'Precalificación con revisión crediticia suave',
        'Compatible con PACE e incentivos de energía verde'
      ],
      calculatorTitle: 'Calculadora de financiamiento',
      amountLabel: 'Monto estimado del proyecto',
      termLabel: 'Elige plazo',
      termSuffix: 'meses',
      estimatedPaymentLabel: 'Pago estimado',
      estimatedPaymentNote: 'A {apr}% APR • Solo estimaciones'
    },
    aboutPage: {
      metaTitle: 'Quiénes somos | MGM A/C Appliances',
      metaDescription: 'Expertos HVAC familiares que combinan cercanía vecinal con ejecución empresarial.',
      title: 'Familiares y orgullosos del sur de Florida',
      subtitle:
        'MGM A/C Appliances comenzó con una sola camioneta en 1998. La misma familia sigue contestando, acompañando instalaciones y dando seguimiento.',
      storyTitle: 'Nuestra historia',
      storyBody:
        'Nuestros padres construyeron MGM con referidos en Miami-Dade. Sus hijos crecieron en el taller, aprendieron el oficio y ahora lideran despacho, instalaciones y atención al cliente.',
      storyFooter: 'Seguimos firmando cada estimado con nuestro apellido.',
      todayTitle: 'Hoy',
      todayList: [
        '200+ técnicos ubicados en Miami, Broward, Orlando y Tampa',
        'Familiares integrados en cada departamento (operaciones, finanzas, QA)',
        'Actualizaciones estilo concierge tras el servicio para que siempre escuches a “uno de los MGM”'
      ],
      values: [
        {
          title: 'Promesa del apretón familiar',
          copy: 'Tratamos cada trabajo como si reparáramos el AC de nuestros padres y llegamos cuando prometemos.'
        },
        {
          title: 'Inversión en la comunidad',
          copy: 'Una parte de cada instalación financia programas STEM vecinales y becas técnicas.'
        },
        {
          title: 'Disciplina empresarial',
          copy: 'Aunque somos familiares, documentamos cada visita, registramos fotos y mantenemos SLAs empresariales.'
        }
      ]
    },
    commercialPage: {
      metaTitle: 'HVAC comercial | MGM A/C Appliances',
      metaDescription: 'Unidades rooftop, sistemas VRF y contratos de mantenimiento para propiedades comerciales en Florida.',
      title: 'Programas HVAC comerciales',
      subtitle: 'Ingenieros, project managers y monitoreo 24/7 de automatización de edificios.',
      cards: [
        { title: 'Instalaciones rooftop y VRF', copy: 'Gestión de proyectos, puesta en marcha y monitoreo remoto para instalaciones críticas.' },
        { title: 'Servicio para cuentas nacionales', copy: 'Gestión de proyectos, puesta en marcha y monitoreo remoto para instalaciones críticas.' },
        { title: 'Analítica de edificios', copy: 'Gestión de proyectos, puesta en marcha y monitoreo remoto para instalaciones críticas.' }
      ]
    },
    galleryPage: {
      metaTitle: 'Galería de proyectos | MGM A/C Appliances',
      metaDescription: 'Transformaciones HVAC antes/después en Miami, Orlando y Tampa.',
      title: 'Proyectos recientes',
      subtitle: 'Retrofits en torres, residencias de lujo y salvamentos de emergencia.',
      placeholder: 'Marcador antes/después',
      modalLabel: 'Marcadores de imagen'
    },
    blogPage: {
      metaTitle: 'Blog HVAC | MGM A/C Appliances',
      metaDescription: 'Guías de mantenimiento, control de humedad y energía para Florida.',
      title: 'Centro de aprendizaje HVAC',
      subtitle: 'Ideas accionables para hogares, HOAs y facility managers de Florida.'
    },
    blogPostPage: {
      notFound: 'Artículo no encontrado.',
      placeholderParagraph:
        'Los sistemas HVAC en Florida enfrentan humedad, salitre y operación continua. Estas notas enseñan mantenimiento preventivo, financiamiento y rutas de mejora.'
    },
    privacyPage: {
      metaTitle: 'Política de privacidad | MGM A/C Appliances',
      title: 'Política de privacidad',
      paragraphs: [
        'Recopilamos datos de contacto para agendar servicios HVAC, entregar cotizaciones y enviar recordatorios de mantenimiento.',
        'La información se almacena en sistemas cifrados y nunca se vende. Puedes solicitar eliminación escribiendo a privacy@mgmacappliances.com.',
        'Usamos cookies para analítica y personalización. Al seguir usando el sitio, aceptas su uso.'
      ]
    },
    termsPage: {
      metaTitle: 'Términos y condiciones | MGM A/C Appliances',
      title: 'Términos y condiciones',
      paragraphs: [
        'MGM A/C Appliances presta servicios según las propuestas firmadas. Las reservaciones en línea son solicitudes hasta que despacho confirme.',
        'Las garantías se anulan si terceros modifican el equipo instalado. Las ofertas de financiamiento dependen de aprobación crediticia.',
        'El uso de este sitio implica aceptar estos términos y la política de privacidad.'
      ]
    },
    notFoundPage: {
      title: 'El aire aquí está vacío.',
      subtitle: 'Vamos a devolverte el confort.',
      cta: 'Volver al inicio'
    },
    booking: {
      title: 'Agenda el servicio en 4 pasos',
      subtitle: '¿Emergencia? Llama al 305-720-8273 para atención prioritaria.'
    },
    bookingWizard: {
      steps: ['Selecciona servicio', 'Datos de la propiedad', 'Contacto', 'Revisión y envío'],
      reviewLabel: 'Revisión',
      confirmHeading: 'Confirma los detalles',
      successTitle: 'Solicitud enviada',
      successBody: 'Despacho recibió tu solicitud. Te llamaremos en menos de 5 minutos con la confirmación y ETA.',
      questions: {
        service: '¿Qué servicio necesitas?',
        property: 'Detalles de la propiedad',
        contact: '¿Cómo te contactamos?'
      },
      prompts: {
        stepLabel: 'Paso',
        selectService: 'Selecciona un servicio',
        propertyType: 'Tipo de propiedad',
        appointmentWindow: 'Franja horaria preferida',
        notes: '¿Alguna nota que debamos saber?'
      },
      propertyTypes: ['Casa unifamiliar', 'Townhome/Condo', 'Comercial', 'Multi-sitio'],
      appointmentWindows: ['Mañana (8a-12p)', 'Tarde (12p-4p)', 'Noche (4p-8p)'],
      fields: {
        service: 'Servicio',
        propertyType: 'Tipo de propiedad',
        address: 'Dirección',
        city: 'Ciudad',
        preferredWindow: 'Ventana preferida',
        contactName: 'Nombre completo',
        contactEmail: 'Correo electrónico',
        contactPhone: 'Teléfono',
        notes: 'Notas'
      }
    },
    contact: {
      title: 'Hablemos de tu HVAC',
      subtitle:
        'Llama al 305-720-8273 o envíanos un mensaje para cotizaciones, alianzas o emergencias—siempre contesta alguien de la familia MGM.',
      dispatchTitle: 'Centros de despacho',
      dispatchAreas: 'Miami • Fort Lauderdale • Orlando • Tampa',
      emailLabel: 'Correo',
      successTitle: 'Mensaje recibido',
      successBody: 'Te responderemos en menos de una hora hábil.',
      form: {
        name: 'Nombre completo',
        email: 'Correo electrónico',
        phone: 'Teléfono',
        notes: '¿Cómo podemos ayudar?',
        submit: 'Enviar mensaje'
      }
    },
    footer: {
      description:
        'Socio HVAC familiar del sur de Florida para Miami, Fort Lauderdale, Orlando y Tampa. Cuadrillas totalmente aseguradas con despacho 24/7.',
      bottomLine: 'Empresa familiar • Totalmente asegurados • BBB A+',
      sections: {
        services: 'Servicios',
        company: 'Compañía',
        legal: 'Legal'
      },
      links: {
        acRepair: 'Reparación de AC',
        acInstallation: 'Instalación de AC',
        maintenancePlans: 'Planes de mantenimiento',
        commercial: 'HVAC comercial',
        about: 'Quiénes somos',
        blog: 'Blog',
        gallery: 'Galería',
        careers: 'Oportunidades',
        privacy: 'Privacidad',
        terms: 'Términos'
      }
    },
    common: {
      labels: {
        serviceArea: 'Zona de servicio'
      },
      actions: {
        exploreService: 'Ver servicio →',
        viewResponseTimes: 'Ver tiempos de respuesta →',
        readArticle: 'Leer artículo →',
        enrollNow: 'Inscribirse ahora',
        requestProposal: 'Solicitar propuesta',
        startApplication: 'Iniciar solicitud',
        talkToCommercialTeam: 'Hablar con el equipo comercial',
        continueToBooking: 'Continuar a la reservación',
        backToHomepage: 'Volver al inicio',
        back: 'Atrás',
        next: 'Siguiente',
        submitRequest: 'Enviar solicitud'
      }
    }
  }
} as const
