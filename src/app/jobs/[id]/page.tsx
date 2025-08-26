import { jobs } from '@/lib/data';
import type { Job } from '@/lib/types';
import { notFound } from 'next/navigation';
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
} from 'lucide-react';

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const job: Job | undefined = jobs.find((j) => j.id === params.id);

  if (!job) {
    notFound();
  }

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
                    <a href={`mailto:${job.scouter.contact}?subject=Postulación para ${job.title}`}>
                        <Button className="w-full bg-accent hover:bg-accent/90">
                            <CheckSquare className="mr-2 h-5 w-5" />
                            Postular Ahora
                        </Button>
                    </a>
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
