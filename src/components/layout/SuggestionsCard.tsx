'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { companies } from '@/lib/data';
import { Plus } from 'lucide-react';

export default function SuggestionsCard() {
  const suggestedCompanies = companies.slice(0, 3); // Get first 3 for suggestions

  return (
    <Card className="sticky top-20 shadow-sm">
      <CardHeader>
        <CardTitle className="font-headline text-md">Añadir a tu feed</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {suggestedCompanies.map(company => (
            <div key={company.id} className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border rounded-md">
                    <AvatarImage src={company.logo} alt={company.name} data-ai-hint="company logo"/>
                    <AvatarFallback>{company.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                    <p className="font-semibold text-sm">{company.name}</p>
                    <p className="text-xs text-muted-foreground">{company.sector}</p>
                </div>
                <Button variant="outline" size="sm" className="rounded-full">
                    <Plus className="mr-1 h-4 w-4" />
                    Seguir
                </Button>
            </div>
        ))}

        <div className="pt-2">
            <Button variant="link" className="w-full text-primary">
                Ver todas las recomendaciones
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
