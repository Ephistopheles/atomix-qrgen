import { useFormData, getInputValue } from "../../../domain/hooks/use-form-data";
import { validateEventQr } from "../../../domain/validation/validators";
import FormInput from "../shared/form-input";
import type { EventQrData } from "../../../domain/types/qr";

interface EventFormProps {
  onChange?: (data: EventQrData) => void;
}

export default function EventForm({ onChange }: EventFormProps) {
  const { data, update, errors, setErrors } = useFormData<EventQrData>({
    initialData: {
      title: "",
      description: "",
      location: "",
      start: "",
      end: "",
    },
    onChange,
  });

  const handleBlur = () => {
    const validation = validateEventQr(data);
    setErrors(validation.errors);
  };

  const handleUpdate = (field: keyof EventQrData, value: string) => {
    const newData = { ...data, [field]: value };
    update(field, value);
    const validation = validateEventQr(newData);
    setErrors(validation.errors);
  };

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
