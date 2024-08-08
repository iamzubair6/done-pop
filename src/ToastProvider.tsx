import React, { createContext, useCallback, useContext, useState } from "react";
import ToastStyle from "./ToastStyle";

interface ToastProviderProps {
  children: React.ReactNode;
  dense?: boolean;
  preventDuplicate?: boolean;
  maxSnack?: number;
  autoHideDuration?: number;
  anchorOrigin?: {
    horizontal: "left" | "center" | "right";
    vertical: "top" | "bottom";
  };
}

interface ToastOptions {
  variant: "success" | "error" | "info" | "warning";
}

interface Toaster {
  message: string;
  options: ToastOptions;
}

interface ToasterContextProps {
  Toast: (message: string, options: ToastOptions) => void;
}

const ToasterContext = createContext<ToasterContextProps | undefined>(
  undefined
);

export const ToasterProvider: React.FC<ToastProviderProps> = ({
  children,
  dense = false,
  preventDuplicate = false,
  maxSnack = 3,
  autoHideDuration = 5000,
  anchorOrigin = { horizontal: "left", vertical: "bottom" },
}) => {
  const [snacks, setSnacks] = useState<Toaster[]>([]);

  const Toast = useCallback(
    (message: string, options: ToastOptions) => {
      if (
        preventDuplicate &&
        snacks.find((snack) => snack.message === message)
      ) {
        return;
      }
      setSnacks((prevSnacks) => {
        const newSnacks = [...prevSnacks, { message, options }];
        return newSnacks.slice(-maxSnack);
      });
    },
    [preventDuplicate, snacks, maxSnack]
  );

  const removeSnackbar = useCallback((index: number) => {
    setSnacks((prevSnacks) => prevSnacks.filter((_, i) => i !== index));
  }, []);

  return (
    <ToasterContext.Provider value={{ Toast }}>
      {children}
      <div
        className={`toaster-container ${dense ? "dense" : ""}`}
        style={anchorOrigin as React.CSSProperties}
      >
        {snacks.map((snack, index) => (
          <ToastStyle
            key={index}
            variant={snack.options.variant}
            autoHideDuration={autoHideDuration}
            style={{
              animationDuration: `${autoHideDuration}ms`,
            }}
            onAnimationEnd={() => removeSnackbar(index)}
          >
            {snack.message}
          </ToastStyle>
        ))}
      </div>
    </ToasterContext.Provider>
  );
};

export const useToaster = () => {
  const context = useContext(ToasterContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a ToasterProvider");
  }
  return context;
};
