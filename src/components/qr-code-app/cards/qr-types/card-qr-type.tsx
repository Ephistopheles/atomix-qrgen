import TextIcon from "../../../../assets/icons/qr-types/text.svg";
import LinkIcon from "../../../../assets/icons/qr-types/link.svg";
import WifiIcon from "../../../../assets/icons/qr-types/wifi.svg";
import ContactIcon from "../../../../assets/icons/qr-types/contact.svg";
import BankIcon from "../../../../assets/icons/qr-types/bank.svg";
import CalendarIcon from "../../../../assets/icons/qr-types/calendar.svg";
import { QrTypeKey } from "../../../../domain/types/qr";

interface QrType {
  icon: { src: string };
  label: string;
  key: QrTypeKey;
  disabled?: boolean;
}

interface CardQrTypeProps {
  selected: QrTypeKey | null;
  onSelect: (key: QrTypeKey) => void;
}

export default function CardQrType({ selected, onSelect }: CardQrTypeProps) {
  const qrTypes: QrType[] = [
    { icon: TextIcon, label: "Texto plano", key: QrTypeKey.PlainText },
    { icon: LinkIcon, label: "URL / Link", key: QrTypeKey.Url },
    { icon: WifiIcon, label: "Wi-Fi", key: QrTypeKey.Wifi },
    { icon: ContactIcon, label: "vCard / Contacto", key: QrTypeKey.VCard },
    { icon: BankIcon, label: "Pago / Banco", key: QrTypeKey.Payment, disabled: true },
    { icon: CalendarIcon, label: "Evento / Calendar", key: QrTypeKey.Event, disabled: true },
  ];

  return (
    <section class="space-y-6">
      <article class="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition h-fit">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Tipos de QR</h2>

        <ul class="space-y-2">
          {qrTypes.map((type) => {
            const isSelected = selected === type.key;
            const hasSelection = selected !== null;
            const isDisabled = type.disabled;

            let styles = "";
            if (isDisabled) {
              styles = "text-gray-400 bg-gray-50 cursor-not-allowed";
            } else if (!hasSelection) {
              styles = "text-gray-700 hover:bg-blue-100 cursor-pointer";
            } else if (isSelected) {
              styles = "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer";
            } else {
              styles = "text-gray-500 hover:bg-blue-100 hover:text-gray-800 cursor-pointer";
            }

            return (
              <li key={type.key}>
                <button
                  class={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${styles}`}
                  onClick={() => !isDisabled && onSelect(type.key)}
                  disabled={isDisabled}
                >
                  <img
                    src={type.icon.src}
                    alt={type.label}
                    class={`w-5 h-5 ${
                      isDisabled
                        ? "opacity-30"
                        : isSelected
                          ? "opacity-100"
                          : hasSelection
                            ? "opacity-50"
                            : "opacity-80"
                    }`}
                    style={{
                      filter: `brightness(0) saturate(100%) ${
                        isDisabled
                          ? "brightness(0.9)"
                          : isSelected
                            ? "invert(1)"
                            : hasSelection
                              ? "brightness(0.6)"
                              : "brightness(0.8)"
                      }`,
                    }}
                  />
                  <span class="text-sm font-medium flex-1 text-left">{type.label}</span>
                  {isDisabled && (
                    <span class="text-xs px-2 py-0.5 bg-gray-200 text-gray-500 rounded-full font-semibold">
                      Soon
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </article>
    </section>
  );
}
