import { getInputValue } from "../../../domain/hooks/use-form-data";
import { useFormData } from "../../../domain/hooks/use-form-data";
import { validatePaymentQr } from "../../../domain/validation/validators";
import FormInput from "../shared/form-input";
import type { PaymentQrData } from "../../../domain/types/qr";

interface PaymentFormProps {
  onChange?: (data: PaymentQrData) => void;
}

export default function PaymentForm({ onChange }: PaymentFormProps) {
  const { data, errors, handleBlur, handleUpdate, update } = useFormData<PaymentQrData>({
    initialData: {
      method: "",
      name: "",
      account: "",
      bank: "",
      amount: 0,
      reference: "",
    },
    onChange,
    validate: validatePaymentQr,
  });

  return (
    <>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Método de pago <span class="text-red-500">*</span>
        </label>
        <div class="relative">
          <select
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 hover:border-[#0352D1] focus:outline-none focus:ring-2 focus:ring-[#0352D1] appearance-none bg-white cursor-pointer pr-10"
            value={data.method}
            onChange={(e) => handleUpdate("method", getInputValue(e))}
            onBlur={handleBlur}
          >
            <option value="">Seleccionar método</option>
            <option value="bank">Banco</option>
            <option value="crypto">Cripto</option>
          </select>
          <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
        {errors.method && (
          <p class="text-red-500 text-xs font-bold mt-1">{errors.method}</p>
        )}
      </div>
      <FormInput
        label="Nombre del destinatario"
        type="text"
        placeholder="Nombre del destinatario"
        value={data.name}
        onInput={(e) => handleUpdate("name", getInputValue(e))}
        onBlur={handleBlur}
        required
        error={errors.name}
      />
      <FormInput
        label="Cuenta o dirección"
        type="text"
        placeholder="Cuenta o dirección"
        value={data.account}
        onInput={(e) => handleUpdate("account", getInputValue(e))}
        onBlur={handleBlur}
        required
        error={errors.account}
      />
      <FormInput
        label="Banco o plataforma"
        type="text"
        placeholder="Banco o plataforma"
        value={data.bank}
        onInput={(e) => handleUpdate("bank", getInputValue(e))}
        onBlur={handleBlur}
        required
        error={errors.bank}
      />
      <FormInput
        label="Monto"
        type="number"
        placeholder="Monto"
        value={data.amount}
        onInput={(e) => handleUpdate("amount", Number(getInputValue(e)))}
        onBlur={handleBlur}
        required
        error={errors.amount}
        min={0.01}
      />
      
      <FormInput
        label="Referencia"
        type="text"
        placeholder="Referencia"
        value={data.reference}
        onInput={(e) => update("reference", getInputValue(e))}
      />
    </>
  );
}
