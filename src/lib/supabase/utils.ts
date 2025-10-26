import { z } from "zod"
import { PostgrestError } from "@supabase/supabase-js"

// Supabase 응답 타입
export interface SupabaseResponse<T> {
  data: T | null
  error: PostgrestError | null
}

// 데이터 검증 유틸
export async function validateSupabaseData<T>(
  response: SupabaseResponse<unknown>,
  schema: z.ZodSchema<T>,
  errorMessage?: string
): Promise<T> {
  const { data, error } = response

  // Supabase 에러 체크
  if (error) {
    console.error("Supabase 에러:", error)
    throw error
  }

  // 데이터 검증
  const result = schema.safeParse(data)

  if (!result.success) {
    console.error("❌ 데이터 검증 실패")
    console.error("에러 상세:", result.error.flatten())
    console.error("받은 데이터:", JSON.stringify(data, null, 2))

    if (process.env.NODE_ENV === "development") {
      console.table(result.error.issues)
    }

    throw new Error(errorMessage || "서버에서 받은 데이터 형식이 올바르지 않습니다")
  }

  console.log("✅ 데이터 검증 성공")
  return result.data
}

// 안전한 데이터 변환
export function safeParseData<T>(data: unknown, schema: z.ZodSchema<T>): T | null {
  const result = schema.safeParse(data)
  return result.success ? result.data : null
}
