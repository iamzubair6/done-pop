import React, { createContext, useCallback, useContext, useState } from "react";
import styled from "styled-components";
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

// Styled-component for the toaster container
const ToasterContainer = styled.div<{
  dense: boolean;
  anchorOrigin: { horizontal: string; vertical: string };
}>`
  position: fixed;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: ${({ dense }) => (dense ? "4px" : "8px")};
  padding: 16px;
  ${({ anchorOrigin }) => `
    ${anchorOrigin.vertical}: 0;
    ${anchorOrigin.horizontal}: 0;
  `}
`;

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
      <ToasterContainer dense={dense} anchorOrigin={anchorOrigin}>
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
      </ToasterContainer>
    </ToasterContext.Provider>
  );
};

export const useToaster = () => {
  const context = useContext(ToasterContext);
  if (!context) {
    throw new Error("useToaster must be used within a ToasterProvider");
  }
  return context;
};
