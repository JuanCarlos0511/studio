'use client';

import { useState, useEffect } from 'react';
import { JobCard } from '@/components/JobCard';
import { JobFilters } from '@/components/JobFilters';
import { jobs as initialJobs, students } from '@/lib/data';
import type { Job, Student } from '@/lib/types';
import { Card } from '@/components/ui/card';
import ProfileCard from '@/components/layout/ProfileCard';
import SuggestionsCard from '@/components/layout/SuggestionsCard';

export default function Home() {
  const [allJobs, setAllJobs] = useState<Job[]>(initialJobs);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [userType, setUserType] = useState<'student' | 'company' | null>(null);
  const [student, setStudent] = useState<Student>(students[0]);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);

  useEffect(() => {
    // Load jobs from localStorage and combine with initial jobs
    const localJobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    const combinedJobs = [...initialJobs, ...localJobs];
    setAllJobs(combinedJobs);
    setFilteredJobs(combinedJobs); // Initially, show all jobs

    const storedUserType = localStorage.getItem('userType') as 'student' | 'company' | null;
    setUserType(storedUserType);
    
    if (storedUserType === 'student') {
      const tempProfile = localStorage.getItem('tempStudentProfile');
      if (tempProfile) {
        const tempStudent = JSON.parse(tempProfile);
        setStudent(prevStudent => ({...prevStudent, ...tempStudent}));
      } else {
        setStudent(students[0]);
      }
      const localSavedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
      setSavedJobs(localSavedJobs);
    }
  }, []);

  const handleToggleSaveJob = (jobId: string) => {
    const newSavedJobs = savedJobs.includes(jobId) 
      ? savedJobs.filter(id => id !== jobId)
      : [...savedJobs, jobId];
    setSavedJobs(newSavedJobs);
    localStorage.setItem('savedJobs', JSON.stringify(newSavedJobs));
  };


  return (
    <div className="bg-muted/40">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          <aside className="hidden lg:block lg:col-span-1 space-y-8">
             {userType === 'student' ? (
                <>
                  <ProfileCard student={student} />
                  <JobFilters allJobs={allJobs} onFilterChange={setFilteredJobs} />
                </>
             ) : (
                <JobFilters allJobs={allJobs} onFilterChange={setFilteredJobs} />
             )}
          </aside>

          <main className="lg:col-span-2">
            <h2 className="text-2xl font-headline font-semibold mb-6 sr-only">
              Feed de Empleos
            </h2>
            {filteredJobs.length > 0 ? (
              <div className="flex flex-col gap-4">
                {filteredJobs.map((job) => (
                  <JobCard 
                    key={job.id} 
                    job={job}
                    isSaved={savedJobs.includes(job.id)}
                    onToggleSave={handleToggleSaveJob}
                    userType={userType}
                  />
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
