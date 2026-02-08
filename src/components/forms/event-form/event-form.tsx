import { useFormData, getInputValue } from "../../../domain/hooks/use-form-data";
import type { EventQrData } from "../../../domain/types/qr";

interface EventFormProps {
  onChange?: (data: EventQrData) => void;
}

export default function EventForm({ onChange }: EventFormProps) {
  const { data, update, errors } = useFormData<EventQrData>({
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
          Título <span class="text-red-500">*</span>
        </label>
        <input
          type="text"
          class={`w-full px-3 py-2 border rounded-lg text-gray-900 hover:border-[#0352D1] focus:outline-none focus:ring-2 focus:ring-[#0352D1] ${
            errors.title ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Título del evento"
          value={data.title}
          onChange={(e) => update("title", getInputValue(e))}
        />
        {errors.title && (
          <p class="text-red-500 text-xs mt-1">{errors.title}</p>
        )}
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
          Ubicación <span class="text-red-500">*</span>
        </label>
        <input
          type="text"
          class={`w-full px-3 py-2 border rounded-lg text-gray-900 hover:border-[#0352D1] focus:outline-none focus:ring-2 focus:ring-[#0352D1] ${
            errors.location ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Ubicación del evento"
          value={data.location}
          onChange={(e) => update("location", getInputValue(e))}
        />
        {errors.location && (
          <p class="text-red-500 text-xs mt-1">{errors.location}</p>
        )}
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Inicio <span class="text-red-500">*</span>
        </label>
        <input
          type="datetime-local"
          class={`w-full px-3 py-2 border rounded-lg text-gray-900 hover:border-[#0352D1] focus:outline-none focus:ring-2 focus:ring-[#0352D1] ${
            errors.start ? "border-red-500" : "border-gray-300"
          }`}
          value={data.start}
          onChange={(e) => update("start", getInputValue(e))}
        />
        {errors.start && (
          <p class="text-red-500 text-xs mt-1">{errors.start}</p>
        )}
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Fin <span class="text-red-500">*</span>
        </label>
        <input
          type="datetime-local"
          class={`w-full px-3 py-2 border rounded-lg text-gray-900 hover:border-[#0352D1] focus:outline-none focus:ring-2 focus:ring-[#0352D1] ${
            errors.end ? "border-red-500" : "border-gray-300"
          }`}
          value={data.end}
          onChange={(e) => update("end", getInputValue(e))}
        />
        {errors.end && (
          <p class="text-red-500 text-xs mt-1">{errors.end}</p>
        )}
      </div>
    </>
  );
}
