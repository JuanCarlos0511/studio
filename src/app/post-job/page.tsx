'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, PlusCircle, Sparkles, Upload } from 'lucide-react';
import { enhanceJobPosting } from '@/ai/flows/enhance-job-posting';
import type { Job } from '@/lib/types';
import { companies } from '@/lib/data';
import { useRouter } from 'next/navigation';

const jobPostSchema = z.object({
  jobTitle: z.string().min(5, 'El título debe tener al menos 5 caracteres.'),
  jobDescription: z.string().min(50, 'La descripción debe tener al menos 50 caracteres.'),
  jobRequirements: z.string().min(20, 'Los requisitos deben tener al menos 20 caracteres.'),
  contractType: z.enum(['Tiempo Completo', 'Medio Tiempo', 'Prácticas', 'Contrato']),
  salaryMin: z.coerce.number().optional(),
  salaryMax: z.coerce.number().optional(),
  applyDeadline: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Fecha inválida',
  }),
  tags: z.string().min(3, 'Agrega al menos una etiqueta.'),
});

export default function PostJobPage() {
  const { toast } = useToast();
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof jobPostSchema>>({
    resolver: zodResolver(jobPostSchema),
    defaultValues: {
      jobTitle: '',
      jobDescription: '',
      jobRequirements: '',
      tags: '',
      contractType: 'Tiempo Completo',
    },
  });

  const onSubmit = (values: z.infer<typeof jobPostSchema>) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
        const newJob: Job = {
            id: `job-${Date.now()}`,
            company: companies[0], // Assuming the logged in company is the first one
            title: values.jobTitle,
            description: values.jobDescription,
            requirements: values.jobRequirements.split('\n').filter(req => req.trim() !== ''),
            contractType: values.contractType,
            salary: values.salaryMin && values.salaryMax ? {
                min: values.salaryMin,
                max: values.salaryMax,
                currency: 'MXN'
            } : undefined,
            location: 'Remoto', // Default value
            applyDeadline: values.applyDeadline,
            tags: values.tags.split(',').map(tag => tag.trim()),
            imageUrl: `https://picsum.photos/seed/job-${Date.now()}/800/400`,
            postedAt: new Date().toISOString(),
            scouter: { name: 'Reclutador', contact: 'recruiter@innovatech.com'}
        };

        const existingJobs = JSON.parse(localStorage.getItem('jobs') || '[]');
        localStorage.setItem('jobs', JSON.stringify([...existingJobs, newJob]));

        setIsSubmitting(false);
        toast({
        title: 'Vacante Publicada',
        description: 'Tu vacante ha sido publicada exitosamente.',
        });
        router.push('/dashboard');
    }, 1000);
  };
  
  const handleEnhanceWithAI = async () => {
      const { jobTitle, jobDescription, jobRequirements } = form.getValues();
      if (!jobTitle || !jobDescription || !jobRequirements) {
        toast({
            variant: "destructive",
            title: "Campos incompletos",
            description: "Por favor, completa el título, descripción y requisitos para usar la IA.",
        });
        return;
      }

      setIsAiLoading(true);
      try {
        const result = await enhanceJobPosting({ jobTitle, jobDescription, jobRequirements });
        form.setValue('jobTitle', result.enhancedJobTitle);
        form.setValue('jobDescription', result.enhancedJobDescription);
        form.setValue('jobRequirements', result.enhancedJobRequirements);
        toast({
            title: "¡Mejora aplicada!",
            description: "La vacante ha sido optimizada con IA.",
        });
      } catch (error) {
        console.error("Error enhancing job posting:", error);
        toast({
            variant: "destructive",
            title: "Error de IA",
            description: "No se pudo procesar la mejora. Intenta de nuevo.",
        });
      } finally {
        setIsAiLoading(false);
      }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-4xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center gap-2">
            <PlusCircle className="w-7 h-7 text-primary" />
            Publicar una Nueva Vacante
          </CardTitle>
          <CardDescription>
            Completa el formulario para encontrar al candidato ideal.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-12 md:gap-4">
                    <div className="md:col-span-8 space-y-4">
                        <FormField
                        control={form.control}
                        name="jobTitle"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Título del Puesto</FormLabel>
                            <FormControl>
                                <Input placeholder="Ej: Desarrollador Frontend" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="jobDescription"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Descripción del Puesto</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Describe las responsabilidades y el rol." className="min-h-[120px]" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                         <FormField
                        control={form.control}
                        name="jobRequirements"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Requisitos (uno por línea)</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Lista las habilidades, experiencia y educación necesarias." className="min-h-[120px]" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                    <div className="md:col-span-4 p-4 bg-secondary rounded-lg">
                        <h3 className="font-headline font-semibold flex items-center gap-2 mb-2"><Sparkles className="w-5 h-5 text-primary"/> Potenciar con IA</h3>
                        <p className="text-sm text-muted-foreground mb-4">Mejora tu publicación para atraer a los mejores talentos.</p>
                         <Button type="button" onClick={handleEnhanceWithAI} disabled={isAiLoading} className="w-full">
                            {isAiLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Sparkles className="mr-2 h-4 w-4"/>}
                            Mejorar Publicación
                        </Button>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                    control={form.control}
                    name="contractType"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Tipo de Contrato</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona un tipo" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="Tiempo Completo">Tiempo Completo</SelectItem>
                                <SelectItem value="Medio Tiempo">Medio Tiempo</SelectItem>
                                <SelectItem value="Prácticas">Prácticas</SelectItem>
                                <SelectItem value="Contrato">Contrato</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="applyDeadline"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Fecha Límite para Postular</FormLabel>
                        <FormControl>
                            <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                 <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex gap-4">
                        <FormField
                        control={form.control}
                        name="salaryMin"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Salario Mínimo (Opcional)</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Ej: 30000" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                         <FormField
                        control={form.control}
                        name="salaryMax"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Salario Máximo (Opcional)</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Ej: 50000" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                     <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Etiquetas / Palabras Clave</FormLabel>
                            <FormControl>
                                <Input placeholder="react, nodejs, figma (separadas por coma)" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormItem>
                    <FormLabel>Imagen de la Vacante (Opcional)</FormLabel>
                    <FormControl>
                        <div className="flex items-center justify-center w-full">
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-secondary hover:bg-muted">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Upload className="w-8 h-8 mb-2 text-muted-foreground"/>
                                    <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Haz clic para subir</span> o arrastra y suelta</p>
                                    <p className="text-xs text-muted-foreground">PNG, JPG o WEBP (MAX. 800x400px)</p>
                                </div>
                                <Input id="dropzone-file" type="file" className="hidden" />
                            </label>
                        </div> 
                    </FormControl>
                </FormItem>

              <Button type="submit" size="lg" className="w-full !mt-8" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                {isSubmitting ? 'Publicando...' : 'Publicar Vacante'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
