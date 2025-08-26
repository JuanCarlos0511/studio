"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "./ui/button";
import { Search, MapPin, Briefcase } from "lucide-react";

export function JobFilters() {
  return (
    <Card className="sticky top-20 shadow-md">
      <CardHeader>
        <CardTitle className="font-headline text-lg">Filtrar Vacantes</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="keywords" className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground"/>
              Palabras Clave
            </Label>
            <Input id="keywords" placeholder="Título, empresa, etc." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground"/>
              Ubicación
            </Label>
            <Input id="location" placeholder="Ciudad o 'Remoto'" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contract-type" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-muted-foreground"/>
                Tipo de Contrato
            </Label>
            <Select>
              <SelectTrigger id="contract-type">
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Tiempo Completo</SelectItem>
                <SelectItem value="part-time">Medio Tiempo</SelectItem>
                <SelectItem value="internship">Prácticas</SelectItem>
                <SelectItem value="contract">Contrato</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
            <Search className="mr-2 h-4 w-4"/>
            Buscar
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
