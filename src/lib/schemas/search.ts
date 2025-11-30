import { z } from "zod"

export const searchFormSchema = z.object({
  search: z.string().min(1, "검색어를 입력해주세요").trim(),
})

export type SearchFormData = z.infer<typeof searchFormSchema>
