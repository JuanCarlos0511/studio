import { applications } from "@/lib/data";
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
import { FileText } from "lucide-react";

export default function ApplicationsPage() {
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
              {applications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">{app.job.title}</TableCell>
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
      {applications.length === 0 && (
        <Card>
            <CardHeader>
                <CardTitle>No hay postulaciones</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Aún no te has postulado a ninguna vacante. ¡Explora las ofertas y encuentra tu próximo empleo!</p>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
