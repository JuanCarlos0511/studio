'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import type { Student } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Check, Plus, User, FileText as FileTextIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { students } from '@/lib/data';
import { engineeringCareers } from '@/lib/skills';

export default function SetupProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [summary, setSummary] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [student, setStudent] = useState<Partial<Student> | null>(null);
  const [availableTags, setAvailableTags] = useState<string[]>([]);

  useEffect(() => {
    const tempProfile = localStorage.getItem('tempStudentProfile');
    if (!tempProfile) {
      router.push('/register');
    } else {
      const parsedProfile: Partial<Student> = JSON.parse(tempProfile);
      setStudent(parsedProfile);
      if (parsedProfile.career && engineeringCareers[parsedProfile.career]) {
          setAvailableTags(engineeringCareers[parsedProfile.career].tags);
      } else {
          // Fallback or redirect if career is not set
          toast({ variant: 'destructive', title: 'Error', description: 'No se ha seleccionado una carrera.' });
          router.push('/register');
      }
    }
  }, [router, toast]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (summary.length < 20) {
      toast({
        variant: 'destructive',
        title: 'Resumen muy corto',
        description: 'Por favor, escribe un resumen profesional de al menos 20 caracteres.',
      });
      return;
    }
    if (selectedTags.length < 3) {
      toast({
        variant: 'destructive',
        title: 'Selecciona tus intereses',
        description: 'Por favor, elige al menos 3 etiquetas de tus habilidades e intereses.',
      });
      return;
    }

    const updatedProfile: Partial<Student> = {
      ...student,
      summary,
      preferredTags: selectedTags,
    };

    localStorage.setItem('tempStudentProfile', JSON.stringify(updatedProfile));
    toast({
      title: '¡Perfil completado!',
      description: 'Bienvenido a la bolsa de trabajo de la F.I.T. ¡Tu futuro empieza ahora!',
    });
    router.push('/');
  };
  
  if (!student) return null; // or a loading skeleton

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] bg-background px-4 py-12">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-2xl">Configura tu Perfil</CardTitle>
          <CardDescription>
            ¡Hola, {student.name}! Ayúdanos a conocerte mejor para recomendarte las mejores oportunidades.
          </CardDescription>
           <Badge variant="secondary" className="max-w-fit mx-auto mt-2">{student.career ? engineeringCareers[student.career].name : ''}</Badge>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
             <div className="space-y-4">
              <h3 className="font-headline text-lg flex items-center gap-2"><User className="w-5 h-5 text-primary"/>Paso 1: Resumen Profesional</h3>
              <div className="space-y-2 pl-7">
                <Label htmlFor="summary">Describe tus objetivos, pasiones y lo que te hace un gran candidato.</Label>
                <Textarea
                  id="summary"
                  placeholder="Ej: Apasionado desarrollador con interés en crear soluciones innovadoras..."
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="min-h-[100px]"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-headline text-lg flex items-center gap-2"><FileTextIcon className="w-5 h-5 text-primary"/>Paso 2: Mis Habilidades e Intereses</h3>
               <div className="space-y-2 pl-7">
                <Label>Selecciona las etiquetas que mejor te describan (mínimo 3).</Label>
                <div className="flex flex-wrap gap-2 pt-2">
                  {availableTags.map((tag) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                          type="button"
                          key={tag}
                          onClick={() => handleTagToggle(tag)}
                          className={cn(
                              "flex items-center justify-center rounded-full border px-3 py-1.5 text-sm transition-colors",
                              isSelected ? "bg-primary text-primary-foreground border-transparent" : "bg-secondary hover:bg-muted"
                          )}
                      >
                        {isSelected ? <Check className="mr-1.5 h-4 w-4"/> : <Plus className="mr-1.5 h-4 w-4"/>}
                          {tag}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full !mt-10" size="lg">Finalizar y Entrar</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
