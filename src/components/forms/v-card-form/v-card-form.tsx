import { useFormData, getInputValue } from "../../../domain/hooks/use-form-data";
import { validateVCardQr } from "../../../domain/validation/validators";
import FormInput from "../shared/form-input";
import type { VCardQrData } from "../../../domain/types/qr";

interface VCardFormProps {
  onChange?: (data: VCardQrData) => void;
}

export default function VCardForm({ onChange }: VCardFormProps) {
  const { data, update, errors, setErrors } = useFormData<VCardQrData>({
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

  const handleBlur = () => {
    const validation = validateVCardQr(data);
    setErrors(validation.errors);
  };

  const handleUpdate = (field: keyof VCardQrData, value: string) => {
    const newData = { ...data, [field]: value };
    update(field, value);
    const validation = validateVCardQr(newData);
    setErrors(validation.errors);
  };

  return (
    <>
      <FormInput
        label="Nombre"
        type="text"
        placeholder="Nombre"
        value={data.firstName}
        onInput={(e) => handleUpdate("firstName", getInputValue(e))}
        onBlur={handleBlur}
        required
        error={errors.firstName}
      />
      <FormInput
        label="Apellido"
        type="text"
        placeholder="Apellido"
        value={data.lastName}
        onInput={(e) => handleUpdate("lastName", getInputValue(e))}
        onBlur={handleBlur}
        required
        error={errors.lastName}
      />
      <FormInput
        label="Teléfono"
        type="tel"
        placeholder="Teléfono"
        value={data.phone}
        onInput={(e) => handleUpdate("phone", getInputValue(e))}
        onBlur={handleBlur}
        error={errors.phone}
      />
      <FormInput
        label="Móvil"
        type="tel"
        placeholder="Móvil"
        value={data.mobile}
        onInput={(e) => handleUpdate("mobile", getInputValue(e))}
        onBlur={handleBlur}
        error={errors.mobile}
      />
      <FormInput
        label="Email"
        type="email"
        placeholder="Email"
        value={data.email}
        onInput={(e) => handleUpdate("email", getInputValue(e))}
        onBlur={handleBlur}
        error={errors.email}
      />
      <FormInput
        label="Organización"
        type="text"
        placeholder="Organización"
        value={data.organization}
        onInput={(e) => update("organization", getInputValue(e))}
      />
      <FormInput
        label="Cargo"
        type="text"
        placeholder="Cargo"
        value={data.title}
        onInput={(e) => update("title", getInputValue(e))}
      />
      <FormInput
        label="Sitio web"
        type="url"
        placeholder="Sitio web"
        value={data.website}
        onInput={(e) => update("website", getInputValue(e))}
        onBlur={handleBlur}
        error={errors.website}
      />
      <FormInput
        label="Dirección"
        placeholder="Dirección"
        value={data.address}
        onInput={(e) => update("address", getInputValue(e))}
        rows={3}
      />
      <FormInput
        label="Nota"
        placeholder="Nota"
        value={data.note}
        onInput={(e) => update("note", getInputValue(e))}
        rows={3}
      />
    </>
  );
}
