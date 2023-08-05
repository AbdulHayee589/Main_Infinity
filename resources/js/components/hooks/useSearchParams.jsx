import { useEffect, useState } from "react";

const useSearchParams = () => {
  const [searchParams, setSearchParams] = useState("");

  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    const params = {};

    for (const [key, value] of search) {
      params[key] = value;
    }

    setSearchParams(params);
  }, [window.location.search]);

  return { searchParams };
};
export default useSearchParams;
