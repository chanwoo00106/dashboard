import useSWR from "swr";
import { fetcher } from "./fetcher";

export function useMe() {
  const me = useSWR("/api/me", fetcher);
  return { me };
}
