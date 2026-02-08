import { useFormData, getInputValue } from "../../../domain/hooks/use-form-data";
import type { EventQrData } from "../../../domain/types/qr";

interface EventFormProps {
  onChange?: (data: EventQrData) => void;
}

export default function EventForm({ onChange }: EventFormProps) {
  const { data, update } = useFormData<EventQrData>({
    initialData: {
      title: "",
      description: "",
      location: "",
      start: "",
      end: "",
    },
    onChange,
  });

  return (
    <>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Título
        </label>
        <input
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 hover:border-[#0352D1] focus:outline-none focus:ring-2 focus:ring-[#0352D1]"
          placeholder="Título del evento"
          value={data.title}
          onChange={(e) => update("title", getInputValue(e))}
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Descripción
        </label>
        <input
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 hover:border-[#0352D1] focus:outline-none focus:ring-2 focus:ring-[#0352D1]"
          placeholder="Descripción del evento"
          value={data.description}
          onChange={(e) => update("description", getInputValue(e))}
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Ubicación
        </label>
        <input
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 hover:border-[#0352D1] focus:outline-none focus:ring-2 focus:ring-[#0352D1]"
          placeholder="Ubicación del evento"
          value={data.location}
          onChange={(e) => update("location", getInputValue(e))}
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Inicio
        </label>
        <input
          type="datetime-local"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 hover:border-[#0352D1] focus:outline-none focus:ring-2 focus:ring-[#0352D1]"
          value={data.start}
          onChange={(e) => update("start", getInputValue(e))}
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Fin</label>
        <input
          type="datetime-local"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 hover:border-[#0352D1] focus:outline-none focus:ring-2 focus:ring-[#0352D1]"
          value={data.end}
          onChange={(e) => update("end", getInputValue(e))}
        />
      </div>
    </>
  );
}
