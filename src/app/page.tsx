'use client';

import { useState, useEffect } from 'react';
import { JobCard } from '@/components/JobCard';
import { JobFilters } from '@/components/JobFilters';
import { jobs, students } from '@/lib/data';
import type { Job, Student } from '@/lib/types';
import { Card } from '@/components/ui/card';
import ProfileCard from '@/components/layout/ProfileCard';
import SuggestionsCard from '@/components/layout/SuggestionsCard';

export default function Home() {
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobs);
  const [userType, setUserType] = useState<'student' | 'company' | null>(null);
  
  // Mocking the student for the profile card
  const student: Student = students[0];

  useEffect(() => {
    const storedUserType = localStorage.getItem('userType') as 'student' | 'company' | null;
    setUserType(storedUserType);
  }, []);

  return (
    <div className="bg-muted/40">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          <aside className="hidden lg:block lg:col-span-1">
             {userType === 'student' ? (
                <ProfileCard student={student} />
             ) : (
                <JobFilters allJobs={jobs} onFilterChange={setFilteredJobs} />
             )}
          </aside>

          <main className="lg:col-span-2">
            <h2 className="text-2xl font-headline font-semibold mb-6 sr-only">
              Feed de Empleos
            </h2>
            {filteredJobs.length > 0 ? (
              <div className="flex flex-col gap-4">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
                <Card className="text-center p-10">
                    <p className="text-muted-foreground">
                        No se encontraron vacantes con esos criterios.
                    </p>
                </Card>
            )}
          </main>
          
          <aside className="hidden lg:block lg:col-span-1">
            <SuggestionsCard />
          </aside>

        </div>
      </div>
    </div>
  );
}
