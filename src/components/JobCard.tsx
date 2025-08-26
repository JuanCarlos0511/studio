import Link from 'next/link';
import Image from 'next/image';
import type { Job } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Briefcase, Clock, Calendar } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      <CardHeader className="flex flex-row items-start gap-4 p-4">
        <Avatar className="w-16 h-16 border rounded-lg">
          <AvatarImage src={job.company.logo} alt={job.company.name} data-ai-hint="company logo" />
          <AvatarFallback>{job.company.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <CardTitle className="text-lg font-headline hover:text-primary">
            <Link href={`/jobs/${job.id}`}>{job.title}</Link>
          </CardTitle>
          <p className="text-sm text-muted-foreground">{job.company.name}</p>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4 pt-0 space-y-3">
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-2 shrink-0" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Briefcase className="h-4 w-4 mr-2 shrink-0" />
          <span>{job.contractType}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-2 shrink-0" />
            <span>Publicado: {new Date(job.postedAt).toLocaleDateString('es-MX')}</span>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          {job.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="font-normal">{tag}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-secondary/50">
        <Button asChild className="w-full">
          <Link href={`/jobs/${job.id}`}>Ver Detalles</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
