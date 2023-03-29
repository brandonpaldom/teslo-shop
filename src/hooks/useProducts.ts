import { ProductInterface } from '@/interfaces'
import useSWR, { SWRConfiguration } from 'swr'

export const useProducts = (url: string, config: SWRConfiguration = {}) => {
  const { data, error, isLoading } = useSWR<ProductInterface[]>(`/api/${url}`, config)

  return {
    products: data || [],
    isLoading,
    error,
  }
}
