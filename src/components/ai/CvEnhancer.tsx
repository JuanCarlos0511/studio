"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2, Copy } from 'lucide-react';
import { enhanceCV } from '@/ai/flows/enhance-cv';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

const formSchema = z.object({
  cvText: z.string().min(50, 'El CV debe tener al menos 50 caracteres.'),
  industryTrends: z.string().min(10, 'Las tendencias deben tener al menos 10 caracteres.'),
});

export default function CvEnhancer() {
  const [isLoading, setIsLoading] = useState(false);
  const [enhancedCv, setEnhancedCv] = useState('');
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cvText: '',
      industryTrends: 'Tecnologías en la nube, inteligencia artificial, desarrollo sostenible.',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setEnhancedCv('');
    try {
      const result = await enhanceCV(values);
      setEnhancedCv(result.enhancedCVText);
    } catch (error) {
      console.error('Error enhancing CV:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo mejorar el CV. Inténtalo de nuevo.',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(enhancedCv);
    toast({
        title: 'Copiado',
        description: 'El CV mejorado se ha copiado al portapapeles.',
    });
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="font-headline text-xl flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          Mejora tu CV con IA
        </CardTitle>
        <CardDescription>
          Potencia tu currículum con palabras clave relevantes según las tendencias actuales del mercado.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="cvText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pega tu CV aquí</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Escribe o pega el contenido de tu CV..."
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="industryTrends"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tendencias de la Industria</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ej: inteligencia artificial, fintech, energías renovables..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Mejorar CV
            </Button>
          </form>
        </Form>
        {enhancedCv && (
          <div className="mt-6">
            <Alert>
                <Sparkles className="h-4 w-4" />
                <AlertTitle className="font-headline">CV Mejorado</AlertTitle>
                <AlertDescription className="mt-2 relative">
                    <Button variant="ghost" size="icon" className="absolute top-0 right-0 h-7 w-7" onClick={handleCopy}>
                        <Copy className="h-4 w-4"/>
                    </Button>
                    <p className="whitespace-pre-wrap text-sm text-foreground pr-8">{enhancedCv}</p>
                </AlertDescription>
            </Alert>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
