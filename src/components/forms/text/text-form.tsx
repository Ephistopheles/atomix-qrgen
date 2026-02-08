import { getInputValue } from "../../../domain/hooks/use-form-data";
import { useFormData } from "../../../domain/hooks/use-form-data";
import { validateTextQr } from "../../../domain/validation/validators";
import FormInput from "../shared/form-input";
import type { TextQrData } from "../../../domain/types/qr";

interface TextFormProps {
  onChange?: (data: TextQrData) => void;
}

export default function TextForm({ onChange }: TextFormProps) {
  const { data, errors, handleBlur, handleUpdate } = useFormData<TextQrData>({
    initialData: { text: "" },
    onChange,
    validate: validateTextQr,
  });

  return (
    <>
      <FormInput
        label="Texto"
        type="text"
        placeholder="Texto a codificar"
        value={data.text}
        onInput={(e) => handleUpdate("text", getInputValue(e))}
        onBlur={handleBlur}
        required
        error={errors.text}
        maxLength={2953}
      />
    </>
  );
}
