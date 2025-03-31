import { useEffect } from "react";
import { AnimatedList } from "@magic-ui/react";
import { X } from "lucide-react";

const Notification = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatedList className="fixed top-5 right-5 w-80">
      <div className="flex items-center gap-3 p-4 rounded-lg bg-blue-600 text-white shadow-lg">
        <span>{message}</span>
        <button onClick={onClose}>
          <X className="w-5 h-5" />
        </button>
      </div>
    </AnimatedList>
  );
};

export default Notification;
