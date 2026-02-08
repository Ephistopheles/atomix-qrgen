import { useFormData, getInputValue } from "../../../domain/hooks/use-form-data";
import type { PaymentQrData } from "../../../domain/types/qr";

interface PaymentFormProps {
  onChange?: (data: PaymentQrData) => void;
}

export default function PaymentForm({ onChange }: PaymentFormProps) {
  const { data, update, errors } = useFormData<PaymentQrData>({
    initialData: {
      method: "",
      name: "",
      account: "",
      bank: "",
      amount: 0,
      reference: "",
    },
    onChange,
  });

  return (
    <>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Método de pago <span class="text-red-500">*</span>
        </label>
        <select
          class={`w-full px-3 py-2 border rounded-lg text-gray-900 hover:border-[#0352D1] focus:outline-none focus:ring-2 focus:ring-[#0352D1] ${
            errors.method ? "border-red-500" : "border-gray-300"
          }`}
          value={data.method}
          onChange={(e) => update("method", getInputValue(e))}
        >
          <option value="">Seleccionar método</option>
          <option value="bank">Banco</option>
          <option value="crypto">Cripto</option>
        </select>
        {errors.method && (
          <p class="text-red-500 text-xs mt-1">{errors.method}</p>
        )}
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Nombre del destinatario <span class="text-red-500">*</span>
        </label>
        <input
          type="text"
          class={`w-full px-3 py-2 border rounded-lg text-gray-900 hover:border-[#0352D1] focus:outline-none focus:ring-2 focus:ring-[#0352D1] ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Nombre del destinatario"
          value={data.name}
          onChange={(e) => update("name", getInputValue(e))}
          required
        />
        {errors.name && (
          <p class="text-red-500 text-xs mt-1">{errors.name}</p>
        )}
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Cuenta o dirección <span class="text-red-500">*</span>
        </label>
        <input
          type="text"
          class={`w-full px-3 py-2 border rounded-lg text-gray-900 hover:border-[#0352D1] focus:outline-none focus:ring-2 focus:ring-[#0352D1] ${
            errors.account ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Cuenta o dirección"
          value={data.account}
          onChange={(e) => update("account", getInputValue(e))}
          required
        />
        {errors.account && (
          <p class="text-red-500 text-xs mt-1">{errors.account}</p>
        )}
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Banco o plataforma <span class="text-red-500">*</span>
        </label>
        <input
          type="text"
          class={`w-full px-3 py-2 border rounded-lg text-gray-900 hover:border-[#0352D1] focus:outline-none focus:ring-2 focus:ring-[#0352D1] ${
            errors.bank ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Banco o plataforma"
          value={data.bank}
          onChange={(e) => update("bank", getInputValue(e))}
          required
        />
        {errors.bank && (
          <p class="text-red-500 text-xs mt-1">{errors.bank}</p>
        )}
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Monto <span class="text-red-500">*</span>
        </label>
        <input
          type="number"
          class={`w-full px-3 py-2 border rounded-lg text-gray-900 hover:border-[#0352D1] focus:outline-none focus:ring-2 focus:ring-[#0352D1] ${
            errors.amount ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Monto"
          value={data.amount}
          onChange={(e) => update("amount", Number(getInputValue(e)))}
          required
        />
        {errors.amount && (
          <p class="text-red-500 text-xs mt-1">{errors.amount}</p>
        )}
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Referencia
        </label>
        <input
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 hover:border-[#0352D1] focus:outline-none focus:ring-2 focus:ring-[#0352D1]"
          placeholder="Referencia"
          value={data.reference}
          onChange={(e) => update("reference", getInputValue(e))}
          required
        />
      </div>
    </>
  );
}
