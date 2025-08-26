import { students } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  User,
  Mail,
  Briefcase,
  GraduationCap,
  Download,
  ExternalLink,
  Pencil,
} from "lucide-react";
import CvEnhancer from "@/components/ai/CvEnhancer";

export default function ProfilePage() {
  const student = students[0]; // Mocking logged in student

  if (!student) {
    notFound();
  }

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-8">
            <Card className="shadow-md text-center">
              <CardContent className="p-6">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <Image
                    src={student.avatar}
                    alt={student.name}
                    width={128}
                    height={128}
                    className="rounded-full object-cover border-4 border-primary"
                    data-ai-hint="profile avatar"
                  />
                </div>
                <h1 className="text-2xl font-headline font-bold">{student.name}</h1>
                <p className="text-muted-foreground">{student.email}</p>
                <Button variant="outline" className="mt-4 w-full">
                    <Pencil className="mr-2 h-4 w-4"/>
                    Editar Perfil
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle className="font-headline text-lg">Documentos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {student.cvUrl && (
                        <Button variant="secondary" className="w-full justify-start">
                            <Download className="mr-2 h-4 w-4"/>
                            Descargar CV
                        </Button>
                    )}
                    {student.portfolioUrl && (
                        <a href={student.portfolioUrl} target="_blank" rel="noopener noreferrer">
                           <Button variant="secondary" className="w-full justify-start">
                                <ExternalLink className="mr-2 h-4 w-4"/>
                                Ver Portafolio
                           </Button>
                        </a>
                    )}
                </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="font-headline text-xl flex items-center gap-2">
                  <User className="w-6 h-6 text-primary" />
                  Resumen Profesional
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{student.summary}</p>
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Preferencias:</h4>
                  <div className="flex flex-wrap gap-2">
                    {student.preferredTags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="font-headline text-xl flex items-center gap-2">
                  <Briefcase className="w-6 h-6 text-primary" />
                  Experiencia Laboral
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {student.workExperience.map((exp, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-1 bg-primary rounded-full" />
                    <div>
                      <h3 className="font-semibold">{exp.title}</h3>
                      <p className="text-sm text-muted-foreground">{exp.company} | {exp.duration}</p>
                      <p className="mt-1 text-sm">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="font-headline text-xl flex items-center gap-2">
                  <GraduationCap className="w-6 h-6 text-primary" />
                  Educación
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {student.education.map((edu, index) => (
                  <div key={index} className="flex gap-4">
                     <div className="w-1 bg-primary rounded-full" />
                     <div>
                      <h3 className="font-semibold">{edu.degree}</h3>
                      <p className="text-sm text-muted-foreground">{edu.institution} | {edu.duration}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <CvEnhancer />

          </div>
        </div>
      </div>
    </div>
  );
}
