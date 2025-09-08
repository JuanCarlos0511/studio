'use client';

import { useEffect, useState } from 'react';
import type { Job } from '@/lib/types';
import { jobs as initialJobs } from '@/lib/data';
import { JobCard } from '@/components/JobCard';
import { Card } from '@/components/ui/card';
import { Bookmark, Search } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function SavedJobsPage() {
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
  
  useEffect(() => {
    // Load all jobs (initial + from localStorage)
    const localJobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    const combinedJobs = [...initialJobs, ...localJobs];
    setAllJobs(combinedJobs);

    // Load saved job IDs
    const localSavedJobIds = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    setSavedJobIds(localSavedJobIds);
    
    // Filter all jobs to get the saved ones
    const saved = combinedJobs.filter(job => localSavedJobIds.includes(job.id));
    setSavedJobs(saved);
  }, []);

  const handleToggleSaveJob = (jobId: string) => {
    const newSavedJobIds = savedJobIds.includes(jobId) 
      ? savedJobIds.filter(id => id !== jobId)
      : [...savedJobIds, jobId];
    
    setSavedJobIds(newSavedJobIds);
    localStorage.setItem('savedJobs', JSON.stringify(newSavedJobIds));
    // Update the displayed list
    setSavedJobs(allJobs.filter(job => newSavedJobIds.includes(job.id)));
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-headline font-bold text-primary flex items-center gap-3">
          <Bookmark className="w-8 h-8" />
          Mis Vacantes Guardadas
        </h1>
        <p className="mt-2 text-muted-foreground">
          Aquí puedes ver las ofertas de empleo que has guardado para postularte más tarde.
        </p>
      </header>
      
      {savedJobs.length > 0 ? (
        <div className="flex flex-col gap-4 max-w-3xl mx-auto">
          {savedJobs.map((job) => (
            <JobCard 
                key={job.id} 
                job={job}
                isSaved={true} // Always true on this page
                onToggleSave={handleToggleSaveJob}
                userType="student" // Assume student for this page
            />
          ))}
        </div>
      ) : (
        <Card className="text-center p-12 border-dashed max-w-3xl mx-auto">
            <div className="mx-auto bg-secondary text-secondary-foreground rounded-full p-4 w-fit mb-4">
                <Search className="w-10 h-10" />
            </div>
            <CardTitle className="text-xl">No tienes vacantes guardadas</CardTitle>
            <CardContent className="p-0 pt-2">
                <p className="text-muted-foreground">Usa el ícono de guardar en una oferta para verla aquí.</p>
                 <Button asChild className="mt-4">
                    <Link href="/">Explorar Empleos</Link>
                </Button>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
