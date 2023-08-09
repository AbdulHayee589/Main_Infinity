import { useState } from "react";

const useFormState = () => {
  const [formState, setFormState] = useState({
    loading: false,
    error: "",
    disabled: false,
  });

  return [formState, setFormState];
}
export default useFormState