import { z } from 'zod/v4'

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.email('Invalid email address'),
  phone: z.string().max(20).optional(),
  service: z.string().optional(),
  message: z.string().min(1, 'Message is required').max(2000),
})

export type ContactFormData = z.infer<typeof contactSchema>
