import { useEffect } from "react";
import { CheckCircle, X } from '@/components/Icons';

interface ToastProps {
  message: string;
  visible: boolean;
  onClose: () => void;
}

export default function Toast({ message, visible, onClose }: ToastProps) {
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div
      className="fixed left-0 right-0 flex justify-center"
      style={{
        top: "56px",
        zIndex: 100,
        animation: "toastSlideDown 0.3s ease",
      }}
    >
      <div
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl"
        style={{
          backgroundColor: "#10b981",
          boxShadow: "0 4px 20px rgba(16, 185, 129, 0.3)",
        }}
      >
        <CheckCircle size={16} color="#ffffff" />
        <span
          style={{
            fontSize: "13px",
            fontWeight: 600,
            color: "#ffffff",
          }}
        >
          {message}
        </span>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "2px",
            marginLeft: "4px",
          }}
        >
          <X size={14} color="rgba(255,255,255,0.7)" />
        </button>
      </div>

      <style>{`
        @keyframes toastSlideDown {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
