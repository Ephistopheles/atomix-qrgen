import { useState } from "preact/hooks";
import TextIcon from "../../../assets/icons/text.svg";
import LinkIcon from "../../../assets/icons/link.svg";
import WifiIcon from "../../../assets/icons/wifi.svg";
import ContactIcon from "../../../assets/icons/contact.svg";
import BankIcon from "../../../assets/icons/bank.svg";
import CalendarIcon from "../../../assets/icons/calendar.svg";

interface QrType {
  icon: any;
  label: string;
  value: string;
}

interface CardQrTypeProps {
  onSelect?: (value: string) => void;
}

export default function CardQrType({ onSelect }: CardQrTypeProps) {
  const qrTypes: QrType[] = [
    { icon: TextIcon, label: "Texto plano", value: "PT" },
    { icon: LinkIcon, label: "URL / Link", value: "UL" },
    { icon: WifiIcon, label: "Wi-Fi", value: "WF" },
    { icon: ContactIcon, label: "vCard / Contacto", value: "VC" },
    { icon: BankIcon, label: "Pago / Banco", value: "PB" },
    { icon: CalendarIcon, label: "Evento / Calendar", value: "EV" },
  ];

  const [selectedQr, setSelectedQr] = useState<string | null>(null);

  const handleSelect = (value: string) => {
    console.log(value);

    setSelectedQr(value);
    if (onSelect) onSelect(value);
  };

  return (
    <section class="space-y-6">
      <article class="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition h-fit">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Tipos de QR</h2>
        <ul class="space-y-2">
          {qrTypes.map((type) => {
            const isSelected = selectedQr === type.value;
            const hasSelection = selectedQr !== null;

            let styles = "";

            if (!hasSelection) {
              styles = "text-gray-700 hover:bg-blue-100";
            } else if (isSelected) {
              styles = "bg-blue-600 text-white hover:bg-blue-700";
            } else {
              styles =
                "bg-blue-50 text-gray-500 hover:bg-blue-100 hover:text-gray-800";
            }

            return (
              <li>
                <button
                  class={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${styles}`}
                  onClick={() => handleSelect(type.value)}
                >
                  <img
                    src={type.icon.src}
                    alt={type.label}
                    class={`w-5 h-5 ${
                      isSelected
                        ? "opacity-100"
                        : hasSelection
                          ? "opacity-50"
                          : "opacity-80"
                    }`}
                  />
                  <span class="text-sm font-medium">{type.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </article>
    </section>
  );
}
