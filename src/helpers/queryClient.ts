import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

async function invalidate(keys: string[]): Promise<void> {
  return queryClient.invalidateQueries({
    queryKey: keys,
  });
}
