'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

// API 응답 타입 정의
export type SearchResult = {
  address: string;
  description: string;
  id: string;
  name: string;
  image_url: string;
};

export const getSearch = async (query: string): Promise<SearchResult[]> => {
  if (!query || query.trim() === '') {
    throw new Error('콘서트장을 입력해주세요.');
  }

  const dbSupabase = await createClient();
  const { data, error } = await dbSupabase
    .from('venues')
    .select('id , address , description , name , image_url')
    .like('name', `%${query}%`);

  if (error) {
    throw error;
  }

  return data as SearchResult[];
};
