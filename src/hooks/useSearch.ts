'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export type SearchFormData = {
  search: string;
};

export const useSearch = () => {
  const { register, handleSubmit, watch, formState } = useForm<SearchFormData>();
  const router = useRouter();

  const onSubmit = (data: SearchFormData) => {
    if (data.search.trim()) {
      router.push(`/search?q=${encodeURIComponent(data.search.trim())}`);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    watch,
    formState,
  };
};