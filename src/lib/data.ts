import type { Company, Student, Job, Application } from './types';

export const companies: Company[] = [
  {
    id: 'comp1',
    name: 'Innovatech Solutions',
    logo: 'https://picsum.photos/seed/comp1/100/100',
    description: 'Líderes en soluciones de software y consultoría tecnológica.',
    sector: 'Tecnología',
    location: 'Ciudad de México, México',
    website: 'https://innovatech.com',
  },
  {
    id: 'comp2',
    name: 'Finanzas Globales',
    logo: 'https://picsum.photos/seed/comp2/100/100',
    description: 'Consultoría financiera para el mercado internacional.',
    sector: 'Finanzas',
    location: 'Monterrey, México',
    website: 'https://finanzasglobales.com',
  },
  {
    id: 'comp3',
    name: 'Salud Integral',
    logo: 'https://picsum.photos/seed/comp3/100/100',
    description: 'Proveedores de servicios de salud y bienestar.',
    sector: 'Salud',
    location: 'Guadalajara, México',
    website: 'https://saludintegral.com',
  },
];

export const students: Student[] = [
  {
    id: 'stu1',
    name: 'Ana Pérez',
    avatar: 'https://picsum.photos/seed/stu1/100/100',
    email: 'ana.perez@email.com',
    summary: 'Desarrolladora de software junior con pasión por el desarrollo frontend y UX/UI.',
    workExperience: [
      {
        title: 'Pasante de Desarrollo Web',
        company: 'Web Solutions Inc.',
        duration: 'Jun 2023 - Dic 2023',
        description: 'Colaboré en el desarrollo y mantenimiento de aplicaciones web usando React y Node.js.',
      },
    ],
    education: [
      {
        institution: 'Universidad Nacional Autónoma de México',
        degree: 'Ingeniería en Computación',
        duration: '2020 - 2024',
      },
    ],
    cvUrl: '/path/to/cv_ana_perez.pdf',
    portfolioUrl: 'https://github.com/anaperez',
    preferredTags: ['React', 'JavaScript', 'Frontend', 'UX'],
  },
  {
    id: 'stu2',
    name: 'Carlos García',
    avatar: 'https://picsum.photos/seed/stu2/100/100',
    email: 'carlos.garcia@email.com',
    summary: 'Analista financiero con experiencia en modelado y análisis de datos.',
    workExperience: [],
    education: [
      {
        institution: 'Tecnológico de Monterrey',
        degree: 'Licenciatura en Finanzas',
        duration: '2019 - 2023',
      },
    ],
    cvUrl: '/path/to/cv_carlos_garcia.pdf',
    preferredTags: ['Finanzas', 'Excel', 'Análisis de Datos'],
  }
];

export const jobs: Job[] = [
  {
    id: 'job1',
    company: companies[0],
    title: 'Desarrollador Frontend React',
    description: 'Buscamos un desarrollador Frontend con experiencia en React para unirse a nuestro equipo de innovación. Serás responsable de crear interfaces de usuario atractivas y funcionales para nuestros productos.',
    requirements: ['+2 años de experiencia con React', 'Conocimiento de TypeScript', 'Experiencia con Git y metodologías ágiles', 'Inglés intermedio'],
    contractType: 'Tiempo Completo',
    salary: { min: 35000, max: 45000, currency: 'MXN' },
    location: 'Remoto',
    applyDeadline: '2024-08-31',
    tags: ['React', 'Frontend', 'TypeScript', 'Desarrollo Web'],
    imageUrl: 'https://picsum.photos/seed/job1/800/400',
    postedAt: '2024-07-20',
    scouter: { name: 'Luis Morales', contact: 'luis.morales@innovatech.com' }
  },
  {
    id: 'job2',
    company: companies[1],
    title: 'Analista Financiero Junior',
    description: 'Oportunidad para recién egresados de finanzas. Apoyarás en el análisis de estados financieros, proyecciones y reportes para clientes.',
    requirements: ['Licenciatura en Finanzas o afín', 'Excelente manejo de Excel', 'Capacidad analítica', 'Proactividad'],
    contractType: 'Prácticas',
    location: 'Monterrey, México',
    applyDeadline: '2024-08-15',
    tags: ['Finanzas', 'Análisis', 'Excel', 'Recién Egresado'],
    imageUrl: 'https://picsum.photos/seed/job2/800/400',
    postedAt: '2024-07-18',
    scouter: { name: 'Sofía Reyes', contact: 'sofia.reyes@finanzasglobales.com' }
  },
  {
    id: 'job3',
    company: companies[0],
    title: 'Diseñador UI/UX Senior',
    description: 'Únete a nuestro equipo para liderar el diseño de experiencias de usuario para nuestras aplicaciones móviles y web. Debes tener un portafolio sólido que demuestre tu experiencia en diseño centrado en el usuario.',
    requirements: ['+5 años de experiencia en UI/UX', 'Dominio de Figma, Sketch o Adobe XD', 'Experiencia en investigación de usuarios', 'Portafolio robusto'],
    contractType: 'Tiempo Completo',
    salary: { min: 50000, max: 70000, currency: 'MXN' },
    location: 'Ciudad de México, México',
    applyDeadline: '2024-09-10',
    tags: ['UI', 'UX', 'Diseño', 'Figma', 'Móvil'],
    imageUrl: 'https://picsum.photos/seed/job3/800/400',
    postedAt: '2024-07-22',
    scouter: { name: 'Luis Morales', contact: 'luis.morales@innovatech.com' }
  },
  {
    id: 'job4',
    company: companies[2],
    title: 'Coordinador de Marketing Digital',
    description: 'Buscamos un experto en marketing digital para gestionar nuestras campañas en redes sociales, SEO/SEM y email marketing.',
    requirements: ['+3 años de experiencia en marketing digital', 'Certificación en Google Ads y Analytics', 'Experiencia con CRM', 'Excelentes habilidades de comunicación'],
    contractType: 'Medio Tiempo',
    location: 'Remoto',
    applyDeadline: '2024-08-25',
    tags: ['Marketing', 'SEO', 'Redes Sociales', 'Google Ads'],
    imageUrl: 'https://picsum.photos/seed/job4/800/400',
    postedAt: '2024-07-15',
    scouter: { name: 'Elena Garza', contact: 'elena.garza@saludintegral.com' }
  },
];

export const applications: Application[] = [
    {
        id: 'app1',
        job: jobs[0],
        student: students[0],
        appliedAt: '2024-07-21',
        status: 'En Revisión'
    },
    {
        id: 'app2',
        job: jobs[2],
        student: students[0],
        appliedAt: '2024-07-23',
        status: 'Visto'
    }
]
