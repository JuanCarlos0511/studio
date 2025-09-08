'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import type { Application, Job, Student } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Check, Download, ExternalLink, Mail, User, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { engineeringCareers } from '@/lib/skills';

interface ViewApplicantsModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job;
  applicants: Application[];
  onStatusChange: (applicationId: string, status: "Aceptado" | "Rechazado") => void;
}

const ApplicantCard = ({ application, onStatusChange }: { application: Application, onStatusChange: ViewApplicantsModalProps['onStatusChange'] }) => {
    const { student } = application;
    const { toast } = useToast();
    const [status, setStatus] = useState<Application['status']>(application.status);

    const handleAccept = () => {
        onStatusChange(application.id, "Aceptado");
        setStatus("Aceptado");
        toast({ title: "Candidato Aceptado", description: `Se ha notificado a ${student.name}.` });
    };

    const handleReject = () => {
        onStatusChange(application.id, "Rechazado");
        setStatus("Rechazado");
        toast({ title: "Candidato Rechazado" });
    };

  return (
    <div className="border rounded-lg p-4 flex flex-col sm:flex-row gap-4">
        <div className="flex-shrink-0">
            <Avatar className="h-20 w-20 mx-auto sm:mx-0">
                <AvatarImage src={student.avatar} alt={student.name} />
                <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
            </Avatar>
        </div>
        <div className="flex-grow text-center sm:text-left">
            <h4 className="font-bold text-lg">{student.name}</h4>
            <p className="text-sm text-muted-foreground">{student.career ? engineeringCareers[student.career].name : ''}</p>
            <p className="text-sm text-muted-foreground">{student.email}</p>
            <p className="text-xs mt-2 italic text-muted-foreground">Postulado el {new Date(application.appliedAt).toLocaleDateString('es-MX')}</p>
            
            <div className="mt-3 flex flex-wrap gap-2 justify-center sm:justify-start">
                {student.cvUrl && (
                    <Button size="sm" variant="outline"><Download className="mr-2"/> Descargar CV</Button>
                )}
                {student.portfolioUrl && (
                    <a href={student.portfolioUrl} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" variant="outline"><ExternalLink className="mr-2"/> Portafolio</Button>
                    </a>
                )}
            </div>
        </div>
        <div className="flex flex-col gap-2 justify-center items-center flex-shrink-0">
            {status === "En Revisión" || status === "Visto" ? (
                <>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                             <Button size="sm" className="w-full bg-green-600 hover:bg-green-700"><Check className="mr-2"/> Aceptar</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>¿Confirmar y contactar al candidato?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Al aceptar, el estado de la postulación cambiará y se te proporcionará una plantilla de correo para que te comuniques con <span className="font-bold">{student.name}</span>.
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={handleAccept} asChild>
                                <a href={`mailto:${student.email}?subject=Notificación de tu postulación para ${application.job.title}&body=¡Hola, ${student.name}!%0D%0A%0D%0ATenemos buenas noticias sobre tu postulación para el puesto de ${application.job.title} en ${application.job.company.name}.%0D%0A%0D%0A¡Nos gustaría avanzar a la siguiente etapa del proceso!%0D%0A%0D%0A[Agrega aquí los siguientes pasos, como agendar una entrevista].%0D%0A%0D%0AAtentamente,%0D%0AEl equipo de ${application.job.company.name}`}>
                                    Confirmar y Enviar Correo
                                </a>
                            </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                    <Button size="sm" variant="destructive" className="w-full" onClick={handleReject}><X className="mr-2"/> Rechazar</Button>
                </>
            ) : (
                <Badge variant={status === 'Aceptado' ? 'default' : 'destructive'} className={cn(status === 'Aceptado' && 'bg-green-600')}>
                    {status}
                </Badge>
            )}
        </div>
    </div>
  )
}

export default function ViewApplicantsModal({ isOpen, onClose, job, applicants, onStatusChange }: ViewApplicantsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">Postulaciones para "{job.title}"</DialogTitle>
          <DialogDescription>
            {applicants.length} candidato(s) se han postulado para esta vacante.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto pr-2">
            {applicants.length > 0 ? (
                 <div className="space-y-4">
                    {applicants.map(app => (
                        <ApplicantCard key={app.id} application={app} onStatusChange={onStatusChange} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center text-center h-full p-10 border-2 border-dashed rounded-lg">
                    <User className="w-16 h-16 text-muted-foreground mb-4"/>
                    <h3 className="font-semibold text-lg">Sin Postulaciones</h3>
                    <p className="text-muted-foreground">Aún no hay candidatos para esta vacante.</p>
                </div>
            )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
