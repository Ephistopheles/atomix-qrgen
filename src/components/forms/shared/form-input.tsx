interface FormInputProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string | number;
  onInput?: (e: Event) => void;
  onChange?: (e: Event) => void;
  onBlur?: (e: Event) => void;
  required?: boolean;
  error?: string;
  maxLength?: number;
  min?: number;
  rows?: number;
}

export default function FormInput({
  label,
  type = "text",
  placeholder,
  value,
  onInput,
  onChange,
  onBlur,
  required = false,
  error,
  maxLength,
  min,
  rows,
}: FormInputProps) {
  const isTextarea = rows !== undefined;
  const InputComponent = isTextarea ? "textarea" : "input";

  return (
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span class="text-red-500">*</span>}
      </label>
      <InputComponent
        type={isTextarea ? undefined : type}
        rows={rows}
        class="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 hover:border-[#0352D1] focus:outline-none focus:ring-2 focus:ring-[#0352D1]"
        placeholder={placeholder}
        value={value}
        onInput={onInput}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        maxLength={maxLength}
        min={min}
      />
      {error && <p class="text-red-500 text-xs font-bold mt-1">{error}</p>}
    </div>
  );
}
