import { useFormData, getInputValue } from "../../../domain/hooks/use-form-data";
import type { VCardQrData } from "../../../domain/types/qr";

interface VCardFormProps {
  onChange?: (data: VCardQrData) => void;
}

export default function VCardForm({ onChange }: VCardFormProps) {
  const { data, update } = useFormData<VCardQrData>({
    initialData: {
      firstName: "",
      lastName: "",
      phone: "",
      mobile: "",
      email: "",
      organization: "",
      title: "",
      website: "",
      address: "",
      note: "",
    },
    onChange,
  });

  return (
    <>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Nombre
        </label>
        <input
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 hover:border-[#0352D1] focus:outline-none focus:ring-2 focus:ring-[#0352D1]"
          placeholder="Nombre"
          value={data.firstName}
          onInput={(e) => update("firstName", getInputValue(e))}
          required
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Apellido
        </label>
        <input
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 hover:border-[#0352D1] focus:outline-none focus:ring-2 focus:ring-[#0352D1]"
          placeholder="Apellido"
          value={data.lastName}
          onInput={(e) => update("lastName", getInputValue(e))}
          required
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Teléfono
        </label>
        <input
          type="tel"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 hover:border-[#0352D1] focus:outline-none focus:ring-2 focus:ring-[#0352D1]"
          placeholder="Teléfono"
          value={data.phone}
          onInput={(e) => update("phone", getInputValue(e))}
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Móvil
        </label>
        <input
          type="tel"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 hover:border-[#0352D1] focus:outline-none focus:ring-2 focus:ring-[#0352D1]"
          placeholder="Móvil"
          value={data.mobile}
          onInput={(e) => update("mobile", getInputValue(e))}
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input
          type="email"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 hover:border-[#0352D1] focus:outline-none focus:ring-2 focus:ring-[#0352D1]"
          placeholder="Email"
          value={data.email}
          onInput={(e) => update("email", getInputValue(e))}
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Organización
        </label>
        <input
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 hover:border-[#0352D1] focus:outline-none focus:ring-2 focus:ring-[#0352D1]"
          placeholder="Organización"
          value={data.organization}
          onInput={(e) => update("organization", getInputValue(e))}
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Cargo
        </label>
        <input
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 hover:border-[#0352D1] focus:outline-none focus:ring-2 focus:ring-[#0352D1]"
          placeholder="Cargo"
          value={data.title}
          onInput={(e) => update("title", getInputValue(e))}
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Sitio web
        </label>
        <input
          type="url"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 hover:border-[#0352D1] focus:outline-none focus:ring-2 focus:ring-[#0352D1]"
          placeholder="Sitio web"
          value={data.website}
          onInput={(e) => update("website", getInputValue(e))}
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Dirección
        </label>
        <textarea
          rows={4}
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 hover:border-[#FF6B6B] focus:outline-none focus:ring-offset-white focus:ring-red"
          placeholder="Dirección"
          value={data.address}
          onInput={(e) => update("address", getInputValue(e))}
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Nota</label>
        <textarea
          rows={4}
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 hover:border-[#FF6B6B] focus:outline-none focus:ring-offset-white focus:ring-red"
          placeholder="Nota"
          value={data.note}
          onInput={(e) => update("note", getInputValue(e))}
        />
      </div>
    </>
  );
}
