import Link from 'next/link';
import type { Job } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Briefcase, Clock, Bookmark, MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const timeSince = (date: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) {
      return `hace ${Math.floor(interval)} años`;
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return `hace ${Math.floor(interval)} meses`;
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return `hace ${Math.floor(interval)} días`;
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return `hace ${Math.floor(interval)} horas`;
    }
    interval = seconds / 60;
    if (interval > 1) {
      return `hace ${Math.floor(interval)} min`;
    }
    return `hace ${Math.floor(seconds)} seg`;
  }

  return (
    <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-md">
       <CardHeader className="p-4 flex flex-row items-start gap-4 space-y-0">
          <Link href={`/jobs/${job.id}`}>
            <Avatar className="w-12 h-12 border rounded-md">
              <AvatarImage src={job.company.logo} alt={job.company.name} data-ai-hint="company logo" />
              <AvatarFallback>{job.company.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex-grow">
            <h3 className="text-md font-headline font-semibold hover:text-primary leading-tight">
              <Link href={`/jobs/${job.id}`}>{job.title}</Link>
            </h3>
            <p className="text-sm text-muted-foreground">{job.company.name}</p>
             <div className="text-xs text-muted-foreground mt-1">
                <span>{job.location}</span>
                <span className="mx-1.5">•</span>
                <span>{timeSince(job.postedAt)}</span>
            </div>
          </div>
           <Button variant="ghost" size="icon" className="w-8 h-8">
                <MoreHorizontal className="h-4 w-4" />
            </Button>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <p className="text-sm text-foreground/90 line-clamp-3">
          {job.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="secondary" className="font-normal border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200">
            <Briefcase className="h-3 w-3 mr-1.5"/>
            {job.contractType}
          </Badge>
          {job.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="font-normal">{tag}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-2 bg-muted/50 flex justify-end gap-2 border-t">
         <Button variant="ghost" size="sm">
            <Bookmark className="mr-2 h-4 w-4"/>
            Guardar
        </Button>
        <Button asChild size="sm">
          <Link href={`/jobs/${job.id}`}>Ver y Postular</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
