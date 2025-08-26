import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserPlus, Building } from 'lucide-react';

const StudentForm = () => (
  <form className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="student-name">Nombre Completo</Label>
      <Input id="student-name" placeholder="Tu nombre" required />
    </div>
    <div className="space-y-2">
      <Label htmlFor="student-email">Correo Electrónico</Label>
      <Input id="student-email" type="email" placeholder="tu@email.com" required />
    </div>
    <div className="space-y-2">
      <Label htmlFor="student-password">Contraseña</Label>
      <Input id="student-password" type="password" required />
    </div>
    <Button type="submit" className="w-full !mt-6">Crear Cuenta de Estudiante</Button>
  </form>
);

const CompanyForm = () => (
    <form className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="company-name">Nombre de la Empresa</Label>
      <Input id="company-name" placeholder="Tu empresa" required />
    </div>
    <div className="space-y-2">
      <Label htmlFor="company-email">Correo Electrónico Corporativo</Label>
      <Input id="company-email" type="email" placeholder="scouter@empresa.com" required />
    </div>
    <div className="space-y-2">
      <Label htmlFor="company-password">Contraseña</Label>
      <Input id="company-password" type="password" required />
    </div>
    <Button type="submit" className="w-full !mt-6">Crear Cuenta de Empresa</Button>
  </form>
);

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] bg-background px-4 py-12">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-2xl">Crea tu Cuenta</CardTitle>
          <CardDescription>Únete a EnlazaME y conecta con tu futuro.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="student" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="student">
                <UserPlus className="mr-2 h-4 w-4" />
                Estudiante
              </TabsTrigger>
              <TabsTrigger value="company">
                <Building className="mr-2 h-4 w-4" />
                Empresa
              </TabsTrigger>
            </TabsList>
            <TabsContent value="student" className="pt-4">
              <StudentForm />
            </TabsContent>
            <TabsContent value="company" className="pt-4">
              <CompanyForm />
            </TabsContent>
          </Tabs>
          <div className="mt-6 text-center text-sm">
            ¿Ya tienes una cuenta?{' '}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Inicia Sesión
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
