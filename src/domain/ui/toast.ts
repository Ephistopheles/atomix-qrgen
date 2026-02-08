type ToastType = "success" | "error" | "info" | "warning";

interface ToastConfig {
  message: string;
  type: ToastType;
  duration?: number;
}

let toastElement: HTMLElement | null = null;

function initializeToastElement() {
  if (toastElement) return;

  const container = document.createElement("div");
  container.id = "toast-container";
  container.style.cssText = `
    position: fixed;
    top: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    pointer-events: none;
  `;
  document.body.appendChild(container);

  toastElement = container;
}

function getToastStyles(type: ToastType): {
  bgColor: string;
  textColor: string;
  emoji: string;
} {
  const styles = {
    success: {
      bgColor: "#10b981",
      textColor: "#ffffff",
      emoji: "✅",
    },
    error: {
      bgColor: "#ef4444",
      textColor: "#ffffff",
      emoji: "❌",
    },
    warning: {
      bgColor: "#f59e0b",
      textColor: "#ffffff",
      emoji: "⚠️",
    },
    info: {
      bgColor: "#3b82f6",
      textColor: "#ffffff",
      emoji: "ℹ️",
    },
  };

  return styles[type];
}

export function showToast({
  message,
  type = "info",
  duration = 3000,
}: ToastConfig) {
  initializeToastElement();

  if (!toastElement) return;

  const { bgColor, textColor, emoji } = getToastStyles(type);

  const toastDiv = document.createElement("div");
  toastDiv.style.cssText = `
    background-color: ${bgColor};
    color: ${textColor};
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-size: 0.875rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
    animation: slideDown 0.3s ease-out;
    pointer-events: auto;
  `;

  toastDiv.innerHTML = `<span>${emoji}</span><span>${message}</span>`;

  if (!document.querySelector("style[data-toast-animation]")) {
    const style = document.createElement("style");
    style.setAttribute("data-toast-animation", "true");
    style.textContent = `
      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes slideUp {
        from {
          opacity: 1;
          transform: translateY(0);
        }
        to {
          opacity: 0;
          transform: translateY(-10px);
        }
      }
    `;
    document.head.appendChild(style);
  }

  toastElement.appendChild(toastDiv);

  setTimeout(() => {
    toastDiv.style.animation = "slideUp 0.3s ease-out forwards";
    setTimeout(() => {
      toastDiv.remove();
    }, 300);
  }, duration);
}
