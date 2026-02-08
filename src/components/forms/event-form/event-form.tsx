import { getInputValue } from "../../../domain/hooks/use-form-data";
import { useFormData } from "../../../domain/hooks/use-form-data";
import { validateEventQr } from "../../../domain/validation/validators";
import FormInput from "../shared/form-input";
import type { EventQrData } from "../../../domain/types/qr";

interface EventFormProps {
  onChange?: (data: EventQrData) => void;
}

export default function EventForm({ onChange }: EventFormProps) {
  const { data, errors, handleBlur, handleUpdate, update } = useFormData<EventQrData>({
    initialData: {
      title: "",
      description: "",
      location: "",
      start: "",
      end: "",
    },
    onChange,
    validate: validateEventQr,
  });

  return (
    <>
      <FormInput
        label="Título"
        type="text"
        placeholder="Título del evento"
        value={data.title}
        onInput={(e) => handleUpdate("title", getInputValue(e))}
        onBlur={handleBlur}
        required
        error={errors.title}
      />
      <FormInput
        label="Descripción"
        type="text"
        placeholder="Descripción del evento"
        value={data.description}
        onInput={(e) => update("description", getInputValue(e))}
      />
      <FormInput
        label="Ubicación"
        type="text"
        placeholder="Ubicación del evento"
        value={data.location}
        onInput={(e) => handleUpdate("location", getInputValue(e))}
        onBlur={handleBlur}
        required
        error={errors.location}
      />
      <FormInput
        label="Inicio"
        type="datetime-local"
        placeholder=""
        value={data.start}
        onInput={(e) => handleUpdate("start", getInputValue(e))}
        onBlur={handleBlur}
        required
        error={errors.start}
      />
      <FormInput
        label="Fin"
        type="datetime-local"
        placeholder=""
        value={data.end}
        onInput={(e) => handleUpdate("end", getInputValue(e))}
        onBlur={handleBlur}
        required
        error={errors.end}
      />
    </>
  );
}
