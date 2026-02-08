import { useEffect, useRef, useState } from "preact/hooks";
import QRCodeStyling from "qr-code-styling";
import printer from "../../../../assets/icons/printer.svg";
import download from "../../../../assets/icons/download.svg";
import { encodeQrData } from "../../../../domain/encoders/encoders";
import { showToast } from "../../../../domain/ui/toast";
import type { QrTypeKey, QrDataUnion } from "../../../../domain/types/qr";

interface CardQrPreviewProps {
  type: QrTypeKey | null;
  data: QrDataUnion | null;
}

type ExportFormat = "png" | "svg";

export default function CardQrPreview({ type, data }: CardQrPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const qr = useRef<QRCodeStyling | null>(null);
  const [format, setFormat] = useState<ExportFormat>("png");
  const isDisabled = !type || !data;

  useEffect(() => {
    qr.current = new QRCodeStyling({
      width: 280,
      height: 280,
      data: "",
      dotsOptions: { type: "rounded", color: "#000" },
      backgroundOptions: { color: "#ffffff" },
    });

    return () => {
      if (qr.current && containerRef.current?.firstChild) {
        try {
          containerRef.current.removeChild(containerRef.current.firstChild);
        } catch {
          // Error esperado al desmontar
        }
      }
      qr.current = null;
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current || !qr.current || isDisabled) return;

    if (containerRef.current.firstChild) return;

    try {
      qr.current.append(containerRef.current);
    } catch (error) {
      console.error("Error al agregar QR al contenedor:", error);
    }
  }, [isDisabled]);

  useEffect(() => {
    if (!qr.current || isDisabled) {
      if (qr.current) {
        qr.current.update({ data: "" });
      }
      return;
    }

    try {
      const encoded = encodeQrData(type, data);
      qr.current.update({ data: encoded });
    } catch (error) {
      console.error("Error al actualizar QR:", error);
      if (qr.current) {
        qr.current.update({ data: "" });
      }
    }
  }, [type, data, isDisabled]);

  const handleDownload = async () => {
    if (!qr.current || isDisabled) return;

    try {
      await qr.current.download({
        name: "qr-code",
        extension: format,
      } as any);
      showToast({
        message: `QR descargado como ${format.toUpperCase()}`,
        type: "success",
      });
    } catch (error) {
      console.error("Error al descargar QR:", error);
      showToast({
        message: "Error al descargar QR. Intenta de nuevo.",
        type: "error",
      });
    }
  };

  const handlePrint = async () => {
    if (!qr.current || isDisabled) return;

    try {
      // Obtener el canvas del contenedor
      const canvas = containerRef.current?.querySelector(
        "canvas",
      ) as HTMLCanvasElement;

      if (!canvas) {
        showToast({
          message: "Error: No se pudo generar la imagen del QR",
          type: "error",
        });
        return;
      }

      const printWindow = window.open("", "_blank");
      if (!printWindow) {
        showToast({
          message: "Por favor, permite las ventanas emergentes para imprimir",
          type: "warning",
        });
        return;
      }

      const dataUrl = canvas.toDataURL("image/png");

      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>Imprimir QR</title>
            <style>
              body { 
                margin: 0; 
                padding: 20px; 
                display: flex; 
                justify-content: center; 
                align-items: center; 
                min-height: 100vh; 
                font-family: system-ui, -apple-system, sans-serif; 
                background: white;
              }
              #qr-container { 
                text-align: center; 
              }
              img { 
                max-width: 600px; 
                width: 100%; 
                height: auto; 
                display: block;
              }
              @media print {
                body { 
                  padding: 0; 
                  margin: 0;
                }
              }
            </style>
          </head>
          <body>
            <div id="qr-container">
              <img src="${dataUrl}" alt="QR Code" onload="setTimeout(function() { window.print(); }, 500);" />
            </div>
          </body>
        </html>
      `;

      printWindow.document.open();
      printWindow.document.write(html);
      printWindow.document.close();

      showToast({
        message: "QR abierto para imprimir",
        type: "info",
      });
    } catch (error) {
      console.error("Error al imprimir QR:", error);
      showToast({
        message: "Error al imprimir QR. Intenta de nuevo.",
        type: "error",
      });
    }
  };

  return (
    <section class="space-y-6">
      <article class="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Vista previa</h2>
        <div class="space-y-6">
          <div class="flex gap-px bg-gray-200 p-px rounded-lg overflow-hidden">
            {["png", "svg"].map((fmt) => (
              <button
                key={fmt}
                onClick={() => setFormat(fmt as ExportFormat)}
                class={`flex-1 py-2 text-xs font-semibold rounded transition uppercase ${
                  format === fmt
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
                aria-pressed={format === fmt}
              >
                {fmt}
              </button>
            ))}
          </div>
          <div class="flex justify-center">
            {isDisabled ? (
              <div class="w-72 h-72 bg-gradient-to-br from-gray-100 to-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                <p class="text-gray-500 text-sm text-center px-4">
                  Selecciona un tipo de QR e ingresa los datos para ver la vista
                  previa
                </p>
              </div>
            ) : (
              <div class="bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200 p-4">
                <div
                  ref={containerRef}
                  class="bg-white rounded border border-gray-300"
                />
              </div>
            )}
          </div>
          <div class="space-y-3">
            <button
              onClick={handleDownload}
              disabled={isDisabled}
              class={`w-full py-3 font-semibold rounded-lg transition flex items-center justify-center gap-2 ${
                isDisabled
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              <img
                src={download.src}
                alt="Descargar"
                class="w-5 h-5"
                style={{
                  filter: isDisabled
                    ? "brightness(0.6)"
                    : "brightness(0) saturate(100%) invert(1)",
                }}
              />
              Descargar QR ({format.toUpperCase()})
            </button>
            <button
              onClick={handlePrint}
              disabled={isDisabled}
              class={`w-full py-3 font-semibold rounded-lg transition flex items-center justify-center gap-2 ${
                isDisabled
                  ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                  : "bg-blue-100 text-blue-600 hover:bg-blue-200"
              }`}
            >
              <img
                src={printer.src}
                alt="Imprimir"
                class="w-5 h-5"
                style={{
                  filter: isDisabled
                    ? "brightness(0.6)"
                    : "brightness(0) saturate(100%)",
                }}
              />
              Imprimir
            </button>
          </div>
          {!isDisabled && (
            <div class="border-t border-gray-200 pt-4 space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">Tamaño</span>
                <span class="font-medium text-gray-900">280x280 px</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Corrección</span>
                <span class="font-medium text-gray-900">Nivel M (15%)</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Formato</span>
                <span class="font-medium text-gray-900">
                  {format.toUpperCase()}
                </span>
              </div>
            </div>
          )}
        </div>
      </article>
    </section>
  );
}
