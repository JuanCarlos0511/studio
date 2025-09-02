import Link from 'next/link';
import type { Job } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Briefcase, Clock, Bookmark } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const timeSince = (date: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) {
      return Math.floor(interval) + " años";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " meses";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " días";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " horas";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutos";
    }
    return Math.floor(seconds) + " segundos";
  }

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/30">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Link href={`/jobs/${job.id}`}>
            <Avatar className="w-12 h-12 border rounded-md">
              <AvatarImage src={job.company.logo} alt={job.company.name} data-ai-hint="company logo" />
              <AvatarFallback>{job.company.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex-grow">
            <h3 className="text-lg font-headline font-semibold hover:text-primary">
              <Link href={`/jobs/${job.id}`}>{job.title}</Link>
            </h3>
            <p className="text-sm text-muted-foreground">{job.company.name}</p>
             <div className="flex items-center text-xs text-muted-foreground mt-1">
                <MapPin className="h-3 w-3 mr-1.5 shrink-0" />
                <span>{job.location}</span>
                <span className="mx-2">•</span>
                <Clock className="h-3 w-3 mr-1.5 shrink-0" />
                <span>Hace {timeSince(job.postedAt)}</span>
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="secondary" className="font-normal border-transparent bg-blue-100 text-blue-800">
            <Briefcase className="h-3 w-3 mr-1.5"/>
            {job.contractType}
          </Badge>
          {job.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="font-normal">{tag}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-secondary/30 flex justify-end gap-3">
         <Button variant="outline" size="sm">
            <Bookmark className="mr-2 h-4 w-4"/>
            Guardar
        </Button>
        <Button asChild size="sm">
          <Link href={`/jobs/${job.id}`}>Ver Detalles</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
