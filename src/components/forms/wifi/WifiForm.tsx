import { useState } from "preact/hooks";

export default function WifiForm({ onChange }) {
  const [data, setData] = useState({
    ssid: "",
    password: "",
    security: "WPA",
  });

  const update = (k: string, v: string) => {
    const next = { ...data, [k]: v };
    setData(next);
    onChange?.(next);
  };

  return (
    <>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">SSID</label>
        <input
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 hover:border-[#0352D1] focus:outline-none focus:ring-2 focus:ring-[#0352D1]"
          placeholder="Nombre de la red"
          value={data.ssid}
          onInput={(e) => update("ssid", e.target.value)}
          required
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Contraseña
        </label>
        <input
          type="password"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 hover:border-[#0352D1] focus:outline-none focus:ring-2 focus:ring-[#0352D1]"
          placeholder="Contraseña"
          value={data.password}
          onInput={(e) => update("password", e.target.value)}
          required
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Tipo de seguridad
        </label>
        <select
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 hover:border-[#0352D1] focus:outline-none focus:ring-2 focus:ring-[#0352D1]"
          value={data.security}
          onChange={(e) => update("security", e.target.value)}
        >
          <option value="WPA">WPA / WPA2</option>
          <option value="WEP">WEP</option>
          <option value="nopass">Ninguna</option>
        </select>
      </div>
    </>
  );
}
