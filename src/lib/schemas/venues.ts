import { z } from "zod"

export const venuesSchema = z.object({
  id: z.string() || undefined,
  address: z.string().optional(),
  description: z.string().optional(),
  name: z.string().optional(),
  image_url: z.string().optional(),
  contact_info: z.string().optional(),
  view_count: z.number().optional(),
  capacity: z.number().optional(),
})

export type Venues = z.infer<typeof venuesSchema>

export const venueSectionsSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  color: z.string().optional(),
  section_group: z.string().optional(),
  svg_path: z.string().optional(),
  d: z.string().optional(),
  type: z.string().optional(),
})

export type VenueSections = z.infer<typeof venueSectionsSchema>
