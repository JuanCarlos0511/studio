import type { Company, Student, Job, Application } from './types';
import { engineeringCareers } from './skills';

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
  {
    id: 'comp4',
    name: 'Quantum Dynamics',
    logo: 'https://picsum.photos/seed/comp4/100/100',
    description: 'Pioneros en computación cuántica y IA.',
    sector: 'Tecnología',
    location: 'Remoto',
    website: 'https://quantumdynamics.com',
  },
  {
    id: 'comp5',
    name: 'EcoSistemas S.A.',
    logo: 'https://picsum.photos/seed/comp5/100/100',
    description: 'Desarrollo de tecnologías para la sostenibilidad.',
    sector: 'Energías Renovables',
    location: 'Querétaro, México',
    website: 'https://ecosistemas.com',
  },
  {
    id: 'comp6',
    name: 'Constructora Nacional',
    logo: 'https://picsum.photos/seed/comp6/100/100',
    description: 'Líder en proyectos de infraestructura y edificación.',
    sector: 'Construcción',
    location: 'Tampico, Tamps',
    website: 'https://constructoranacional.com',
  },
  {
    id: 'comp7',
    name: 'Logística Total',
    logo: 'https://picsum.photos/seed/comp7/100/100',
    description: 'Soluciones integrales de cadena de suministro.',
    sector: 'Logística',
    location: 'Altamira, Tamps',
    website: 'https://logisticatotal.com',
  }
];

export const students: Student[] = [
  {
    id: 'stu1',
    name: 'Ana Pérez',
    avatar: 'https://picsum.photos/seed/stu1/100/100',
    email: 'ana.perez@email.com',
    career: 'ISC',
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
        institution: 'Facultad de Ingeniería de Tampico (UAT)',
        degree: 'Ingeniería en Sistemas Computacionales',
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
    career: 'IIS',
    summary: 'Estudiante de Ingeniería Industrial enfocado en la optimización de procesos y la cadena de suministro.',
    workExperience: [],
    education: [
      {
        institution: 'Facultad de Ingeniería de Tampico (UAT)',
        degree: 'Ingeniería Industrial y de Sistemas',
        duration: '2019 - 2023',
      },
    ],
    cvUrl: '/path/to/cv_carlos_garcia.pdf',
    preferredTags: ['Logística', 'AutoCAD', 'Optimización de Procesos'],
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
    company: companies[6],
    title: 'Analista de Cadena de Suministro',
    description: 'Oportunidad para egresado de Ing. Industrial para optimizar rutas y procesos en nuestro centro de distribución.',
    requirements: ['Ingeniería Industrial o afín', 'Excelente manejo de Excel', 'Capacidad analítica', 'Proactividad'],
    contractType: 'Prácticas',
    location: 'Altamira, Tamps',
    applyDeadline: '2024-08-15',
    tags: ['Logística', 'Cadena de Suministro', 'Excel', 'Recién Egresado'],
    imageUrl: 'https://picsum.photos/seed/job2/800/400',
    postedAt: '2024-07-18',
    scouter: { name: 'Sofía Reyes', contact: 'sofia.reyes@logisticatotal.com' }
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
    company: companies[5],
    title: 'Residente de Obra',
    description: 'Buscamos un Ing. Civil o pasante para supervisar la construcción de un nuevo complejo habitacional.',
    requirements: ['Ing. Civil (pasante o titulado)', 'Manejo de AutoCAD y Civil 3D', 'Conocimiento de normativas de construcción', 'Disponibilidad de tiempo'],
    contractType: 'Tiempo Completo',
    location: 'Tampico, Tamps',
    applyDeadline: '2024-08-25',
    tags: ['Construcción', 'AutoCAD', 'Civil 3D', 'Residente de Obra'],
    imageUrl: 'https://picsum.photos/seed/job4/800/400',
    postedAt: '2024-07-15',
    scouter: { name: 'Elena Garza', contact: 'elena.garza@constructoranacional.com' }
  },
  {
    id: 'job5',
    company: companies[3],
    title: 'Ingeniero de Datos (Python y SQL)',
    description: 'Forma parte de nuestro equipo de I+D y trabaja en pipelines de datos y modelos analíticos. Experiencia en Python, SQL y plataformas en la nube es esencial.',
    requirements: ['Ingeniería en Sistemas, Ciencia de Datos o afín', 'Experiencia con Python, Pandas, SQL', 'Conocimiento de GCP o Azure'],
    contractType: 'Tiempo Completo',
    salary: { min: 80000, max: 120000, currency: 'MXN' },
    location: 'Remoto',
    applyDeadline: '2024-09-30',
    tags: ['Ciencia de Datos', 'Python', 'SQL', 'GCP', 'ETL'],
    imageUrl: 'https://picsum.photos/seed/job5/800/400',
    postedAt: '2024-07-25',
    scouter: { name: 'Dr. Alan Turing', contact: 'alan.turing@quantumdynamics.com' }
  },
  {
    id: 'job6',
    company: companies[4],
    title: 'Ingeniero de Calidad',
    description: 'Asegurar la calidad de los procesos de manufactura, aplicando metodologías como Six Sigma y Lean Manufacturing.',
    requirements: ['Ingeniería Industrial', '+2 años de experiencia en calidad', 'Certificación Green Belt (deseable)', 'Conocimiento de ISO 9001'],
    contractType: 'Tiempo Completo',
    salary: { min: 45000, max: 60000, currency: 'MXN' },
    location: 'Monterrey, México',
    applyDeadline: '2024-09-01',
    tags: ['Calidad', 'Six Sigma', 'Lean Manufacturing', 'ISO 9001'],
    imageUrl: 'https://picsum.photos/seed/job6/800/400',
    postedAt: '2024-07-19',
    scouter: { name: 'Valeria Rios', contact: 'valeria.rios@ecosistemas.com' }
  },
  {
    id: 'job7',
    company: companies[1],
    title: 'Desarrollador Backend (Node.js)',
    description: 'Estamos expandiendo nuestro equipo de tecnología financiera. Necesitamos un desarrollador Backend con experiencia sólida en Node.js, microservicios y bases de datos SQL.',
    requirements: ['+3 años de experiencia con Node.js', 'Experiencia con Express o NestJS', 'Manejo de PostgreSQL o MySQL', 'Conocimientos de Docker'],
    contractType: 'Tiempo Completo',
    location: 'Monterrey, México',
    applyDeadline: '2024-08-20',
    tags: ['Backend', 'Node.js', 'Fintech', 'SQL'],
    imageUrl: 'https://picsum.photos/seed/job7/800/400',
    postedAt: '2024-07-21',
    scouter: { name: 'Sofía Reyes', contact: 'sofia.reyes@finanzasglobales.com' }
  }
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
