// ─── Form Validation Schemas ──────────────────────────────────────────────────
// Zod schemas for all forms. Import these alongside React Hook Form's resolver.
// Usage: const form = useForm({ resolver: zodResolver(contactSchema) })

import { z } from 'zod';

// ─── Contact form ─────────────────────────────────────────────────────────────
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(80, 'Name is too long'),

  email: z
    .string()
    .email('Please enter a valid email address'),

  phone: z
    .string()
    .regex(/^[+\d\s\-()]{7,15}$/, 'Please enter a valid phone number')
    .optional()
    .or(z.literal('')),

  subject: z
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .max(120, 'Subject is too long'),

  message: z
    .string()
    .min(20, 'Message must be at least 20 characters')
    .max(2000, 'Message is too long'),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// ─── Admission enquiry form ───────────────────────────────────────────────────
export const admissionEnquirySchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters'),

  email: z
    .string()
    .email('Please enter a valid email address'),

  phone: z
    .string()
    .regex(/^[+\d\s\-()]{10,15}$/, 'Please enter a valid phone number'),

  programme: z.enum(['UG', 'PG', 'PhD'] as const, {
    error: 'Please select a programme',
  }),

  department: z.string().optional(),

  message: z.string().max(500, 'Message too long').optional(),
});

export type AdmissionEnquiryData = z.infer<typeof admissionEnquirySchema>;
