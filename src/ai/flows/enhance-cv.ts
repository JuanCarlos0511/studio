// This file uses server-side code.
'use server';

/**
 * @fileOverview An AI-powered tool to enhance a CV with relevant keywords and phrases based on current industry trends.
 *
 * - enhanceCV - A function that handles the CV enhancement process.
 * - EnhanceCVInput - The input type for the enhanceCV function.
 * - EnhanceCVOutput - The return type for the enhanceCV function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhanceCVInputSchema = z.object({
  cvText: z
    .string()
    .describe('The text content of the CV to be enhanced.'),
  industryTrends: z
    .string()
    .describe(
      'A description of current industry trends to inform the CV enhancement.'
    ),
});
export type EnhanceCVInput = z.infer<typeof EnhanceCVInputSchema>;

const EnhanceCVOutputSchema = z.object({
  enhancedCVText: z
    .string()
    .describe('The enhanced text content of the CV.'),
});
export type EnhanceCVOutput = z.infer<typeof EnhanceCVOutputSchema>;

export async function enhanceCV(input: EnhanceCVInput): Promise<EnhanceCVOutput> {
  return enhanceCVFlow(input);
}

const prompt = ai.definePrompt({
  name: 'enhanceCVPrompt',
  input: {schema: EnhanceCVInputSchema},
  output: {schema: EnhanceCVOutputSchema},
  prompt: `You are an expert CV enhancer, skilled in incorporating current industry trends into CVs.

  Enhance the following CV text with relevant keywords and phrases based on the provided industry trends.

  Industry Trends: {{{industryTrends}}}

  CV Text: {{{cvText}}}

  Ensure the enhanced CV is professional and appealing to recruiters.
  Focus on hard skills most relevant in the industry.
  
  Return the enhanced CV text.
  `,
});

const enhanceCVFlow = ai.defineFlow(
  {
    name: 'enhanceCVFlow',
    inputSchema: EnhanceCVInputSchema,
    outputSchema: EnhanceCVOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
