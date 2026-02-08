import { useFormData, getInputValue } from "../../../domain/hooks/use-form-data";
import type { TextQrData } from "../../../domain/types/qr";

interface TextFormProps {
  onChange?: (data: TextQrData) => void;
}

export default function TextForm({ onChange }: TextFormProps) {
  const { data, update } = useFormData<TextQrData>({
    initialData: { text: "" },
    onChange,
  });

  return (
    <>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Texto
        </label>
        <input
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 hover:border-[#0352D1] focus:outline-none focus:ring-2 focus:ring-[#0352D1]"
          placeholder="Texto a codificar"
          value={data.text}
          onInput={(e) => update("text", getInputValue(e))}
          required
        />
      </div>
    </>
  );
}
