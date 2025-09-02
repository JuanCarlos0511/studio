'use client';

import { useState } from 'react';
import { JobCard } from '@/components/JobCard';
import { JobFilters } from '@/components/JobFilters';
import { jobs } from '@/lib/data';
import type { Job } from '@/lib/types';
import { Card } from '@/components/ui/card';

export default function Home() {
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobs);

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-headline font-bold text-primary tracking-tight lg:text-5xl">
            Encuentra tu próximo desafío profesional
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Explora miles de oportunidades en las mejores empresas y da el siguiente paso en tu carrera.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <aside className="md:col-span-1">
            <JobFilters allJobs={jobs} onFilterChange={setFilteredJobs} />
          </aside>
          <main className="md:col-span-3">
            <h2 className="text-2xl font-headline font-semibold mb-6">
              {filteredJobs.length > 0 ? 'Resultados' : 'No se encontraron vacantes'} ({filteredJobs.length})
            </h2>
            {filteredJobs.length > 0 ? (
              <div className="flex flex-col gap-6">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
                <Card className="text-center p-10">
                    <p className="text-muted-foreground">
                        Intenta ajustar tus criterios de búsqueda.
                    </p>
                </Card>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
