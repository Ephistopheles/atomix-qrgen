import { useFormData, getInputValue } from "../../../domain/hooks/use-form-data";
import { validateTextQr } from "../../../domain/validation/validators";
import FormInput from "../shared/form-input";
import type { TextQrData } from "../../../domain/types/qr";

interface TextFormProps {
  onChange?: (data: TextQrData) => void;
}

export default function TextForm({ onChange }: TextFormProps) {
  const { data, update, errors, setErrors } = useFormData<TextQrData>({
    initialData: { text: "" },
    onChange,
  });

  const handleBlur = () => {
    const validation = validateTextQr(data);
    setErrors(validation.errors);
  };

  const handleInput = (value: string) => {
    update("text", value);
    const validation = validateTextQr({ text: value });
    setErrors(validation.errors);
  };

  return (
    <>
      <FormInput
        label="Texto"
        type="text"
        placeholder="Texto a codificar"
        value={data.text}
        onInput={(e) => handleInput(getInputValue(e))}
        onBlur={handleBlur}
        required
        error={errors.text}
        maxLength={2953}
      />
    </>
  );
}
