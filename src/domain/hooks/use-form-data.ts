import { useState, useCallback, type Dispatch } from "preact/hooks";
import type { ValidationResult } from "../validation/validators";

export interface UseFormDataOptions<T> {
  initialData: T;
  onChange?: (data: T, isValid?: boolean) => void;
  validate?: (data: T) => ValidationResult;
}

export interface UseFormDataReturn<T> {
  data: T;
  setData: Dispatch<T>;
  update: <K extends keyof T>(key: K, value: T[K]) => void;
  errors: Record<string, string>;
  setErrors: Dispatch<Record<string, string>>;
  handleBlur: () => void;
  handleUpdate: <K extends keyof T>(field: K, value: T[K]) => void;
}

export function useFormData<T extends Record<string, any>>({
  initialData,
  onChange,
  validate,
}: UseFormDataOptions<T>): UseFormDataReturn<T> {
  const [data, setData] = useState<T>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = <K extends keyof T>(key: K, value: T[K]) => {
    const nextData = { ...data, [key]: value } as T;
    setData(nextData);
    onChange?.(nextData);
  };

  const handleBlur = useCallback(() => {
    if (validate) {
      const validation = validate(data);
      setErrors(validation.errors);
    }
  }, [data, validate]);

  const handleUpdate = useCallback(
    <K extends keyof T>(field: K, value: T[K]) => {
      const newData = { ...data, [field]: value } as T;
      update(field, value);
      if (validate) {
        const validation = validate(newData);
        setErrors(validation.errors);
      }
    },
    [data, update, validate]
  );

  return { data, setData, update, errors, setErrors, handleBlur, handleUpdate };
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
