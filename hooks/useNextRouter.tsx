import { useRouter } from "next/router";

export default function useNextRouter() {
  const router = useRouter();
  const { query } = router;

  const addQueryParam = (name: string, value: string) => {
    let updatedQuery = { ...query };
    updatedQuery[name] = value;
    router.push({ query: updatedQuery });
  };

  const removeQueryParam = (name: string) => {
    let updatedQuery = { ...query };
    delete updatedQuery[name];
    router.push({ query: updatedQuery });
  };

  return { router, addQueryParam, removeQueryParam };
}
