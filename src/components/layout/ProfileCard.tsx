'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Student } from '@/lib/types';
import { Bookmark, Tv } from 'lucide-react';

interface ProfileCardProps {
  student: Student;
}

export default function ProfileCard({ student }: ProfileCardProps) {
  return (
    <Card className="sticky top-20 shadow-sm">
      <CardContent className="p-0 text-center">
        <div className="relative h-20 bg-muted">
            <Image 
                src="https://picsum.photos/seed/bg/400/100" 
                alt="Profile background"
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
                data-ai-hint="profile background"
            />
        </div>
        <div className="p-4 pb-6">
            <div className="relative w-24 h-24 mx-auto -mt-16 mb-2">
                <Image
                    src={student.avatar}
                    alt={student.name}
                    width={96}
                    height={96}
                    className="rounded-full object-cover border-4 border-card"
                    data-ai-hint="profile avatar"
                />
            </div>
            <Link href="/profile">
                <h3 className="text-lg font-headline font-semibold hover:underline">{student.name}</h3>
            </Link>
            <p className="text-sm text-muted-foreground px-4">{student.summary}</p>
        </div>
        <div className="border-t p-4 space-y-3 text-left">
            <Link href="/applications" className="group">
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <p>Mis postulaciones</p>
                    <p className="font-bold text-primary">2</p>
                </div>
            </Link>
            <Link href="#" className="group">
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <p>Vistas de mi perfil</p>
                    <p className="font-bold text-primary">15</p>
                </div>
            </Link>
        </div>
        <div className="border-t p-4">
             <Button variant="ghost" className="w-full justify-start text-sm">
                <Bookmark className="mr-2 h-4 w-4"/>
                Mis elementos guardados
             </Button>
        </div>
      </CardContent>
    </Card>
  );
}
