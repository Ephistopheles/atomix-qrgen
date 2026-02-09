import { useState } from "preact/hooks";
import { getInputValue } from "../../../domain/hooks/use-form-data";
import { useFormData } from "../../../domain/hooks/use-form-data";
import { validateWifiQr } from "../../../domain/validation/validators";
import FormInput from "../shared/form-input";
import type { WifiQrData } from "../../../domain/types/qr";

interface WifiFormProps {
  onChange?: (data: WifiQrData) => void;
}

export default function WifiForm({ onChange }: WifiFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { data, errors, handleBlur, handleUpdate, update } = useFormData<WifiQrData>({
    initialData: {
      ssid: "",
      password: "",
      security: "WPA",
    },
    onChange,
    validate: validateWifiQr,
  });

  return (
    <>
      <FormInput
        label="SSID"
        type="text"
        placeholder="Nombre de la red"
        value={data.ssid}
        onInput={(e) => handleUpdate("ssid", getInputValue(e))}
        onBlur={handleBlur}
        required
        error={errors.ssid}
        maxLength={32}
      />

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Contraseña {data.security !== "nopass" && <span class="text-red-500">*</span>}
        </label>
        <div class="relative">
          <input
            type={showPassword ? "text" : "password"}
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 hover:border-[#0352D1] focus:outline-none focus:ring-2 focus:ring-[#0352D1] pr-10"
            placeholder="Contraseña"
            value={data.password}
            onInput={(e) => handleUpdate("password", getInputValue(e))}
            onBlur={handleBlur}
            maxLength={63}
          />
          <button
            type="button"
            class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            ) : (
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>
        {errors.password && <p class="text-red-500 text-xs font-bold mt-1">{errors.password}</p>}
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Tipo de seguridad
        </label>
        <div class="relative">
          <select
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 hover:border-[#0352D1] focus:outline-none focus:ring-2 focus:ring-[#0352D1] appearance-none bg-white cursor-pointer pr-10"
            value={data.security}
            onChange={(e) =>
              update("security", getInputValue(e) as "WPA" | "WEP" | "nopass")
            }
          >
            <option value="WPA">WPA / WPA2</option>
            <option value="WEP">WEP</option>
            <option value="nopass">Ninguna</option>
          </select>
          <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
