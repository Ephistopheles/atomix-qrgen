import { useState, type Dispatch } from "preact/hooks";

export interface UseFormDataOptions<T> {
  initialData: T;
  onChange?: (data: T, isValid?: boolean) => void;
}

export interface UseFormDataReturn<T> {
  data: T;
  setData: Dispatch<T>;
  update: <K extends keyof T>(key: K, value: T[K]) => void;
  errors: Record<string, string>;
  setErrors: Dispatch<Record<string, string>>;
}

export function useFormData<T extends Record<string, any>>({
  initialData,
  onChange,
}: UseFormDataOptions<T>): UseFormDataReturn<T> {
  const [data, setData] = useState<T>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = <K extends keyof T>(key: K, value: T[K]) => {
    const nextData = { ...data, [key]: value } as T;
    setData(nextData);
    onChange?.(nextData);
  };

  return { data, setData, update, errors, setErrors };
}

export function getInputValue(e: Event): string {
  const target =
    (e.target as
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement
      | null) ?? null;
  return target?.value ?? "";
}
