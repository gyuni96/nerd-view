"use client"

import { Search } from "lucide-react"
import { useSearchForm } from "../_hooks/useSearchForm"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const SearchForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useSearchForm()
  return (
    <form onSubmit={handleSubmit} className="mb-6 sm:mb-8">
      <div className="flex flex-col items-center sm:flex-row gap-2 bg-white rounded-xl shadow-lg p-2">
        <div className="flex-1 flex items-center gap-3 px-3 sm:px-4 min-h-[44px] w-full">
          <Search className="text-muted-foreground flex-shrink-0" size={20} />
          <Input
            {...register("search")}
            placeholder="공연장 검색"
            aria-label="공연장 검색"
            className="border-0 shadow-none focus-visible:ring-0 text-base sm:text-lg"
          />
        </div>
        <Button
          type="submit"
          size="lg"
          className="px-6 sm:px-8 w-full sm:w-auto"
          disabled={isSubmitting}
        >
          {isSubmitting ? "검색 중..." : "검색"}
        </Button>
      </div>
      {errors.search && (
        <p className="text-sm text-destructive mt-2 text-center">{errors.search.message}</p>
      )}
    </form>
  )
}

export default SearchForm
