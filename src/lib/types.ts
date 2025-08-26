export interface Company {
  id: string;
  name: string;
  logo: string;
  description: string;
  sector: string;
  location: string;
  website: string;
}

export interface Student {
  id: string;
  name: string;
  avatar: string;
  email: string;
  summary: string;
  workExperience: {
    title: string;
    company: string;
    duration: string;
    description: string;
  }[];
  education: {
    institution: string;
    degree: string;
    duration: string;
  }[];
  cvUrl?: string;
  portfolioUrl?: string;
  preferredTags: string[];
}

export type User = (Company | Student) & { userType: 'company' | 'student' };

export interface Job {
  id: string;
  company: Company;
  title: string;
  description: string;
  requirements: string[];
  contractType: 'Tiempo Completo' | 'Medio Tiempo' | 'Prácticas' | 'Contrato';
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  location: string;
  applyDeadline: string;
  tags: string[];
  imageUrl?: string;
  postedAt: string;
  scouter: {
    name: string;
    contact: string;
  };
}

export interface Application {
  id: string;
  job: Job;
  student: Student;
  appliedAt: string;
  status: 'En Revisión' | 'Visto' | 'Rechazado' | 'Aceptado';
}
