import { useFormData, getInputValue } from "../../../domain/hooks/useFormData";
import type { UrlQrData } from "../../../domain/types/qr";

interface UrlFormProps {
  onChange?: (data: UrlQrData) => void;
}

export default function UrlForm({ onChange }: UrlFormProps) {
  const { data, update } = useFormData<UrlQrData>({
    initialData: { url: "" },
    onChange,
  });

  return (
    <>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          URL
        </label>
        <input
          type="url"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 hover:border-[#0352D1] focus:outline-none focus:ring-2 focus:ring-[#0352D1]"
          placeholder="https://example.com"
          value={data.url}
          onInput={(e) => update("url", getInputValue(e))}
              required
            />
          </div>
        </>
    );
  }