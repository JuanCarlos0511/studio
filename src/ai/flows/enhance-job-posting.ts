'use server';

/**
 * @fileOverview This file defines a Genkit flow for enhancing job postings with relevant keywords and phrases.
 *
 * The flow uses an AI model to analyze the job posting and suggest improvements based on current industry trends.
 *
 * @exports enhanceJobPosting - An async function that takes a job posting as input and returns an enhanced version.
 * @exports EnhanceJobPostingInput - The input type for the enhanceJobPosting function.
 * @exports EnhanceJobPostingOutput - The output type for the enhanceJobPosting function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhanceJobPostingInputSchema = z.object({
  jobTitle: z.string().describe('The title of the job posting.'),
  jobDescription: z.string().describe('The description of the job posting.'),
  jobRequirements: z.string().describe('The requirements for the job posting.'),
});
export type EnhanceJobPostingInput = z.infer<typeof EnhanceJobPostingInputSchema>;

const EnhanceJobPostingOutputSchema = z.object({
  enhancedJobTitle: z.string().describe('The enhanced title of the job posting.'),
  enhancedJobDescription: z.string().describe('The enhanced description of the job posting.'),
  enhancedJobRequirements: z.string().describe('The enhanced requirements for the job posting.'),
});
export type EnhanceJobPostingOutput = z.infer<typeof EnhanceJobPostingOutputSchema>;

export async function enhanceJobPosting(input: EnhanceJobPostingInput): Promise<EnhanceJobPostingOutput> {
  return enhanceJobPostingFlow(input);
}

const enhanceJobPostingPrompt = ai.definePrompt({
  name: 'enhanceJobPostingPrompt',
  input: {schema: EnhanceJobPostingInputSchema},
  output: {schema: EnhanceJobPostingOutputSchema},
  prompt: `You are an AI-powered tool that helps recruiters enhance their job postings with relevant keywords and phrases based on current industry trends.

  Analyze the following job posting and suggest improvements to the title, description, and requirements to attract more qualified candidates.

  Job Title: {{{jobTitle}}}
  Job Description: {{{jobDescription}}}
  Job Requirements: {{{jobRequirements}}}

  Enhanced Job Title:
  Enhanced Job Description:
  Enhanced Job Requirements:`,
});

const enhanceJobPostingFlow = ai.defineFlow(
  {
    name: 'enhanceJobPostingFlow',
    inputSchema: EnhanceJobPostingInputSchema,
    outputSchema: EnhanceJobPostingOutputSchema,
  },
  async input => {
    const {output} = await enhanceJobPostingPrompt(input);
    return output!;
  }
);
