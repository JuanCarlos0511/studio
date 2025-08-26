import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { jobs, applications, companies } from '@/lib/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Briefcase, BarChart2, FileText, Eye, Users, Edit, Trash2 } from 'lucide-react';

export default function DashboardPage() {
  const companyJobs = jobs.filter((job) => job.company.id === companies[0].id);
  const applicantsByJob = (jobId: string) => applications.filter(app => app.job.id === jobId).length;

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-headline font-bold text-primary">
          Panel de Empresa
        </h1>
        <p className="mt-2 text-muted-foreground">
          Gestiona tus vacantes y revisa las postulaciones.
        </p>
      </header>

      <Tabs defaultValue="active">
        <TabsList className="grid w-full grid-cols-3 max-w-lg">
          <TabsTrigger value="active">
            <Briefcase className="mr-2 h-4 w-4" /> Activas
          </TabsTrigger>
          <TabsTrigger value="drafts">
            <FileText className="mr-2 h-4 w-4" /> Borradores
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart2 className="mr-2 h-4 w-4" /> Analíticas
          </TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyJobs.map((job) => (
              <Card key={job.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="font-headline text-lg">{job.title}</CardTitle>
                  <CardDescription>{job.location}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{applicantsByJob(job.id)} Postulaciones</span>
                    </div>
                     <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        <span>250 Vistas</span>
                    </div>
                  </div>
                  <div>
                    <Badge variant="outline">Activa</Badge>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline" size="sm" className="w-full">
                    <Edit className="mr-2 h-4 w-4" /> Editar
                  </Button>
                  <Button variant="destructive" size="sm" className="w-full">
                    <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                  </Button>
                </CardFooter>
              </Card>
            ))}
             <Card className="flex flex-col items-center justify-center border-dashed text-center p-6">
                <Link href="/post-job" className="w-full">
                    <Button variant="outline" className="w-full h-full flex flex-col gap-2 py-8">
                        <Briefcase className="w-8 h-8 text-primary"/>
                        <span className="text-md font-semibold">Publicar Nueva Vacante</span>
                    </Button>
                </Link>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="drafts" className="mt-6">
           <Card className="text-center p-10 border-dashed">
                <CardTitle>No hay borradores</CardTitle>
                <CardDescription className="mt-2">Comienza a crear una nueva vacante para guardarla aquí.</CardDescription>
            </Card>
        </TabsContent>
        <TabsContent value="analytics" className="mt-6">
             <Card className="text-center p-10 border-dashed">
                <CardTitle>Analíticas Próximamente</CardTitle>
                <CardDescription className="mt-2">Estamos trabajando en un panel de analíticas para darte más información.</CardDescription>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
