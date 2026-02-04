type FieldType =
  | "text"
  | "textarea"
  | "password"
  | "number"
  | "select"
  | "email"
  | "date";

interface FieldRule {
  required?: boolean;
  pattern?: RegExp;
  message: string;
}

interface FormField {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: { value: string; label: string }[];
  rules?: FieldRule[];
}

export interface FormSchema {
  title: string;
  fields: FormField[];
}
