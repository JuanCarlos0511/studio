'use client';

import { applications as initialApplications, students } from "@/lib/data";
import type { Application } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { FileText, Search } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ApplicationsPage() {
  const [myApplications, setMyApplications] = useState<Application[]>([]);
  
  useEffect(() => {
    const userType = localStorage.getItem('userType');
    if (userType !== 'student') return;

    const studentProfile = localStorage.getItem('tempStudentProfile') 
        ? JSON.parse(localStorage.getItem('tempStudentProfile')!) 
        : students[0];

    const allApplications = [...initialApplications, ...JSON.parse(localStorage.getItem('applications') || '[]')];
    const studentApplications = allApplications.filter(app => app.student.id === studentProfile.id);
    
    // Sort by date, most recent first
    studentApplications.sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime());

    setMyApplications(studentApplications);
  }, []);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Aceptado':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'En Revisión':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Visto':
          return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Rechazado':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-headline font-bold text-primary flex items-center gap-3">
            <FileText className="w-8 h-8"/>
            Mis Postulaciones
        </h1>
        <p className="mt-2 text-muted-foreground">
          Aquí puedes ver el historial y estado de todas tus postulaciones.
        </p>
      </header>
      {myApplications.length > 0 ? (
        <Card className="shadow-md">
            <CardContent className="p-0">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead className="w-[40%]">Puesto</TableHead>
                    <TableHead>Empresa</TableHead>
                    <TableHead>Fecha de Postulación</TableHead>
                    <TableHead className="text-right">Estado</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {myApplications.map((app) => (
                    <TableRow key={app.id}>
                    <TableCell className="font-medium">
                        <Link href={`/jobs/${app.job.id}`} className="hover:underline hover:text-primary">
                            {app.job.title}
                        </Link>
                    </TableCell>
                    <TableCell>{app.job.company.name}</TableCell>
                    <TableCell>
                        {new Date(app.appliedAt).toLocaleDateString("es-MX", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        })}
                    </TableCell>
                    <TableCell className="text-right">
                        <Badge variant="outline" className={cn("text-sm", getStatusVariant(app.status))}>
                        {app.status}
                        </Badge>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </CardContent>
        </Card>
      ) : (
        <Card className="text-center p-12 border-dashed">
            <div className="mx-auto bg-secondary text-secondary-foreground rounded-full p-4 w-fit mb-4">
                <Search className="w-10 h-10" />
            </div>
            <CardTitle className="text-xl">No tienes postulaciones</CardTitle>
            <CardContent className="p-0 pt-2">
                <p className="text-muted-foreground">Aún no te has postulado a ninguna vacante.</p>
                 <Button asChild className="mt-4">
                    <Link href="/">Explorar Empleos</Link>
                </Button>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
