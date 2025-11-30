"use client"

import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { searchFormSchema, type SearchFormData } from "@/lib/schemas/search"
import { zodResolver } from "@hookform/resolvers/zod"

export const useSearchForm = () => {
  const { register, handleSubmit, watch, formState } = useForm<SearchFormData>({
    resolver: zodResolver(searchFormSchema),
    mode: "onSubmit",
  })
  const router = useRouter()

  const onSubmit = (data: SearchFormData) => {
    router.push(`/search?q=${encodeURIComponent(data.search)}`)
  }

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    watch,
    formState,
  }
}
