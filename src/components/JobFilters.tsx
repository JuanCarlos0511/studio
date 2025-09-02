"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "./ui/button";
import { Search, MapPin, Briefcase, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import type { Job } from "@/lib/types";

interface JobFiltersProps {
    allJobs: Job[];
    onFilterChange: (filteredJobs: Job[]) => void;
}

export function JobFilters({ allJobs, onFilterChange }: JobFiltersProps) {
    const [keywords, setKeywords] = useState('');
    const [location, setLocation] = useState('');
    const [contractType, setContractType] = useState('');

    useEffect(() => {
        const handleFilter = () => {
            let filtered = allJobs;

            if (keywords) {
                const lowerKeywords = keywords.toLowerCase();
                filtered = filtered.filter(job =>
                    job.title.toLowerCase().includes(lowerKeywords) ||
                    job.company.name.toLowerCase().includes(lowerKeywords) ||
                    job.tags.some(tag => tag.toLowerCase().includes(lowerKeywords))
                );
            }

            if (location) {
                const lowerLocation = location.toLowerCase();
                 filtered = filtered.filter(job =>
                    job.location.toLowerCase().includes(lowerLocation)
                );
            }

            if (contractType) {
                 filtered = filtered.filter(job => job.contractType === contractType);
            }

            onFilterChange(filtered);
        };
        handleFilter();
    }, [keywords, location, contractType, allJobs, onFilterChange]);
    
    const handleReset = () => {
        setKeywords('');
        setLocation('');
        setContractType('');
    }

  return (
    <Card className="sticky top-20 shadow-md">
      <CardHeader>
        <CardTitle className="font-headline text-lg">Filtrar Vacantes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="keywords" className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground"/>
              Palabras Clave
            </Label>
            <Input 
                id="keywords" 
                placeholder="Título, empresa, etc."
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground"/>
              Ubicación
            </Label>
            <Input 
                id="location" 
                placeholder="Ciudad o 'Remoto'"
                value={location}
                onChange={(e) => setLocation(e.target.value)} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contract-type" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-muted-foreground"/>
                Tipo de Contrato
            </Label>
            <Select value={contractType} onValueChange={setContractType}>
              <SelectTrigger id="contract-type">
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tiempo Completo">Tiempo Completo</SelectItem>
                <SelectItem value="Medio Tiempo">Medio Tiempo</SelectItem>
                <SelectItem value="Prácticas">Prácticas</SelectItem>
                <SelectItem value="Contrato">Contrato</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleReset} variant="ghost" className="w-full text-muted-foreground">
            <X className="mr-2 h-4 w-4"/>
            Limpiar Filtros
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
