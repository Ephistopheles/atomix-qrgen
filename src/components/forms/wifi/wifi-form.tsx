import { useFormData, getInputValue } from "../../../domain/hooks/use-form-data";
import type { WifiQrData } from "../../../domain/types/qr";

interface WifiFormProps {
  onChange?: (data: WifiQrData) => void;
}

export default function WifiForm({ onChange }: WifiFormProps) {
  const { data, update, errors } = useFormData<WifiQrData>({
    initialData: {
      ssid: "",
      password: "",
      security: "WPA",
    },
    onChange,
  });

  return (
    <>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          SSID <span class="text-red-500">*</span>
        </label>
        <input
          type="text"
          class={`w-full px-3 py-2 border rounded-lg text-gray-900 hover:border-[#0352D1] focus:outline-none focus:ring-2 focus:ring-[#0352D1] ${
            errors.ssid ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Nombre de la red"
          value={data.ssid}
          onInput={(e) => update("ssid", getInputValue(e))}
          required
        />
        {errors.ssid && (
          <p class="text-red-500 text-xs mt-1">{errors.ssid}</p>
        )}
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Contraseña {data.security !== "nopass" && <span class="text-red-500">*</span>}
        </label>
        <input
          type="password"
          class={`w-full px-3 py-2 border rounded-lg text-gray-900 hover:border-[#0352D1] focus:outline-none focus:ring-2 focus:ring-[#0352D1] ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Contraseña"
          value={data.password}
          onInput={(e) => update("password", getInputValue(e))}
          required={data.security !== "nopass"}
        />
        {errors.password && (
          <p class="text-red-500 text-xs mt-1">{errors.password}</p>
        )}
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Tipo de seguridad
        </label>
        <select
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 hover:border-[#0352D1] focus:outline-none focus:ring-2 focus:ring-[#0352D1]"
          value={data.security}
          onChange={(e) =>
            update("security", getInputValue(e) as "WPA" | "WEP" | "nopass")
          }
        >
          <option value="WPA">WPA / WPA2</option>
          <option value="WEP">WEP</option>
          <option value="nopass">Ninguna</option>
        </select>
      </div>
    </>
  );
}
