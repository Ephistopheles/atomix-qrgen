import { useState, useEffect } from "preact/hooks";
import { QrTypeKey } from "../../../../domain/qr/qr";
import { qrSchemas } from "../../../../domain/schema/schema";

interface CardContentInputProps {
  selectedType: QrTypeKey | null;
  onChange?: (data: any) => void;
}

export default function CardContentInput({
  selectedType,
  onChange,
}: CardContentInputProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});

  if (!selectedType) {
    return (
      <section class="space-y-6">
        <article class="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Contenido</h2>
          <div class="text-gray-500 text-sm">
            Selecciona un tipo de QR para comenzar.
          </div>
        </article>
      </section>
    );
  }

  const schema = qrSchemas[selectedType];

  const updateField = (key: string, value: string) => {
    const next = { ...formData, [key]: value };
    setFormData(next);
    onChange?.(next);
  };

  useEffect(() => {
    setFormData({});
    onChange?.({});
  }, [selectedType]);

  return (
    <section class="space-y-6">
      <article class="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">{schema.title}</h2>

        <div class="space-y-4">
          {schema.fields.map((field) => (
            <div key={field.key}>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                {field.label}
              </label>

              {field.type === "textarea" ? (
                <textarea
                  placeholder={field.placeholder}
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                  value={formData[field.key] || ""}
                  onInput={(e) =>
                    updateField(
                      field.key,
                      (e.target as HTMLTextAreaElement).value,
                    )
                  }
                />
              ) : (
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                  value={formData[field.key] || ""}
                  onInput={(e) =>
                    updateField(field.key, (e.target as HTMLInputElement).value)
                  }
                />
              )}
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
