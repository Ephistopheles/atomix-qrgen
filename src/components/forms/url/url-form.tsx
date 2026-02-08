import { getInputValue } from "../../../domain/hooks/use-form-data";
import { useFormData } from "../../../domain/hooks/use-form-data";
import { validateUrlQr } from "../../../domain/validation/validators";
import FormInput from "../shared/form-input";
import type { UrlQrData } from "../../../domain/types/qr";

interface UrlFormProps {
  onChange?: (data: UrlQrData) => void;
}

export default function UrlForm({ onChange }: UrlFormProps) {
  const { data, errors, handleBlur, handleUpdate } = useFormData<UrlQrData>({
    initialData: { url: "" },
    onChange,
    validate: validateUrlQr,
  });

  return (
    <>
      <FormInput
        label="URL"
        type="url"
        placeholder="https://example.com"
        value={data.url}
        onInput={(e) => handleUpdate("url", getInputValue(e))}
        onBlur={handleBlur}
        required
        error={errors.url}
      />
    </>
  );
}
