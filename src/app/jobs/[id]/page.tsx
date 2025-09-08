'use client';

import { jobs as initialJobs, students, applications as initialApplications } from '@/lib/data';
import type { Job, Application } from '@/lib/types';
import { notFound, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
  Clock,
  CheckSquare,
  Building,
  Mail,
  Loader2,
  Check,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const [job, setJob] = useState<Job | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const allJobs = [...initialJobs, ...JSON.parse(localStorage.getItem('jobs') || '[]')];
    const foundJob = allJobs.find((j) => j.id === params.id) || null;
    setJob(foundJob);

    const userType = localStorage.getItem('userType');
    if (userType !== 'student') return;

    const allApplications = [...initialApplications, ...JSON.parse(localStorage.getItem('applications') || '[]')];
    const studentProfile = localStorage.getItem('tempStudentProfile') 
        ? JSON.parse(localStorage.getItem('tempStudentProfile')!) 
        : students[0];

    if (allApplications.some(app => app.job.id === params.id && app.student.id === studentProfile.id)) {
        setHasApplied(true);
    }

  }, [params.id]);


  if (!job) {
    // Optional: show a loading state
    return <div className="container mx-auto px-4 py-12">Cargando...</div>;
  }

  const handleApply = () => {
    const userType = localStorage.getItem('userType');
    if (!userType) {
        toast({ variant: 'destructive', title: 'No has iniciado sesión', description: 'Por favor, inicia sesión para postularte.'});
        router.push('/login');
        return;
    }
    if (userType !== 'student') {
        toast({ variant: 'destructive', title: 'Acción no permitida', description: 'Solo los estudiantes pueden postularse a vacantes.'});
        return;
    }

    setIsApplying(true);
    // Simulate API call
    setTimeout(() => {
        const studentProfile = localStorage.getItem('tempStudentProfile') 
            ? JSON.parse(localStorage.getItem('tempStudentProfile')!) 
            : students[0];
        
        const newApplication: Application = {
            id: `app-${Date.now()}`,
            job: job,
            student: studentProfile,
            appliedAt: new Date().toISOString(),
            status: 'En Revisión',
        };

        const existingApplications = JSON.parse(localStorage.getItem('applications') || '[]');
        localStorage.setItem('applications', JSON.stringify([...existingApplications, newApplication]));
        
        setHasApplied(true);
        setIsApplying(false);
        toast({ title: '¡Postulación Exitosa!', description: `Tu postulación para ${job.title} ha sido enviada.`});
    }, 1000);
  };

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {job.imageUrl && (
              <div className="mb-8 overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={job.imageUrl}
                  alt={job.title}
                  width={800}
                  height={400}
                  className="w-full object-cover"
                  data-ai-hint="job image"
                />
              </div>
            )}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="font-headline text-3xl text-primary">{job.title}</CardTitle>
                <p className="text-md text-muted-foreground">{job.company.name} - {job.location}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {job.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none text-foreground">
                  <h3 className="font-headline text-xl font-semibold mb-2 mt-4">Descripción del Puesto</h3>
                  <p>{job.description}</p>
                  <h3 className="font-headline text-xl font-semibold mb-2 mt-6">Requisitos</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {job.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1">
            <Card className="sticky top-20 shadow-md">
              <CardHeader>
                <CardTitle className="font-headline text-xl">Resumen del Puesto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-start">
                  <Briefcase className="h-5 w-5 mr-3 mt-1 shrink-0 text-primary" />
                  <div>
                    <p className="font-semibold">Tipo de Contrato</p>
                    <p className="text-muted-foreground">{job.contractType}</p>
                  </div>
                </div>
                {job.salary && (
                  <div className="flex items-start">
                    <DollarSign className="h-5 w-5 mr-3 mt-1 shrink-0 text-primary" />
                    <div>
                      <p className="font-semibold">Salario</p>
                      <p className="text-muted-foreground">
                        ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()} {job.salary.currency}
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 mt-1 shrink-0 text-primary" />
                  <div>
                    <p className="font-semibold">Ubicación</p>
                    <p className="text-muted-foreground">{job.location}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 mr-3 mt-1 shrink-0 text-primary" />
                  <div>
                    <p className="font-semibold">Fecha Límite</p>
                    <p className="text-muted-foreground">{new Date(job.applyDeadline).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                </div>
                 <div className="flex items-start">
                  <Clock className="h-5 w-5 mr-3 mt-1 shrink-0 text-primary" />
                  <div>
                    <p className="font-semibold">Publicado</p>
                    <p className="text-muted-foreground">{new Date(job.postedAt).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                </div>
                <div className="!mt-6">
                    <Button 
                        className="w-full bg-accent hover:bg-accent/90"
                        onClick={handleApply}
                        disabled={isApplying || hasApplied}
                    >
                        {isApplying ? (
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        ) : hasApplied ? (
                            <Check className="mr-2 h-5 w-5" />
                        ) : (
                            <CheckSquare className="mr-2 h-5 w-5" />
                        )}
                        {isApplying ? 'Enviando...' : hasApplied ? 'Ya te postulaste' : 'Postular Ahora'}
                    </Button>
                </div>
                
                <div className="pt-4 mt-4 border-t">
                    <h4 className="font-headline text-lg mb-4">Acerca de la Empresa</h4>
                     <div className="flex items-start">
                      <Building className="h-5 w-5 mr-3 mt-1 shrink-0 text-primary" />
                      <div>
                        <p className="font-semibold">{job.company.name}</p>
                        <p className="text-muted-foreground">{job.company.sector}</p>
                      </div>
                    </div>
                     <div className="flex items-start mt-4">
                      <Mail className="h-5 w-5 mr-3 mt-1 shrink-0 text-primary" />
                      <div>
                        <p className="font-semibold">Contacto (Scouter)</p>
                        <p className="text-muted-foreground">{job.scouter.name}</p>
                         <a href={`mailto:${job.scouter.contact}`} className="text-primary hover:underline">{job.scouter.contact}</a>
                      </div>
                    </div>
                </div>

              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
