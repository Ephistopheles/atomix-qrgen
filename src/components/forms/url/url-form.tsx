import { useFormData, getInputValue } from "../../../domain/hooks/use-form-data";
import { validateUrlQr } from "../../../domain/validation/validators";
import FormInput from "../shared/form-input";
import type { UrlQrData } from "../../../domain/types/qr";

interface UrlFormProps {
  onChange?: (data: UrlQrData) => void;
}

export default function UrlForm({ onChange }: UrlFormProps) {
  const { data, update, errors, setErrors } = useFormData<UrlQrData>({
    initialData: { url: "" },
    onChange,
  });

  const handleBlur = () => {
    const validation = validateUrlQr(data);
    setErrors(validation.errors);
  };

  const handleInput = (value: string) => {
    update("url", value);
    const validation = validateUrlQr({ url: value });
    setErrors(validation.errors);
  };

  return (
    <>
      <FormInput
        label="URL"
        type="url"
        placeholder="https://example.com"
        value={data.url}
        onInput={(e) => handleInput(getInputValue(e))}
        onBlur={handleBlur}
        required
        error={errors.url}
      />
    </>
  );
}
