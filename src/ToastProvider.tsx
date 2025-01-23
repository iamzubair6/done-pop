import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useRef,
} from "react";
import styled from "styled-components";
import { ToastStyle, IconWrapper } from "./ToastStyle";

interface ToastProviderProps {
  children: React.ReactNode;
  dense?: boolean;
  preventDuplicate?: boolean;
  maxSnack?: number;
  autoHideDuration?: number; // This will now be the global duration setting
  anchorOrigin?: {
    horizontal: "left" | "center" | "right";
    vertical: "top" | "bottom";
  };
}

interface ToastOptions {
  variant: "success" | "error" | "info" | "warning";
}

type ToastState = "entering" | "entered" | "exiting";

interface Toaster {
  message: string;
  options: ToastOptions;
  state: ToastState;
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
  pointer-events: none;
  max-height: 100vh;
  padding: 12px;
  transition: all 0.23s ease;

  & > * {
    pointer-events: auto;
  }

  ${({ anchorOrigin }) => `
    ${anchorOrigin.vertical}: 24px;
    ${
      anchorOrigin.horizontal === "center"
        ? `
          left: 50%;
          transform: translateX(-50%);
        `
        : `${anchorOrigin.horizontal}: 24px;`
    }
  `}
`;

export const ToasterProvider: React.FC<ToastProviderProps> = ({
  children,
  dense = false,
  preventDuplicate = false,
  maxSnack = Infinity, // Changed to Infinity to remove limit
  autoHideDuration = 6000, // Changed default to 6 seconds
  anchorOrigin = { horizontal: "right", vertical: "top" },
}) => {
  const [snacks, setSnacks] = useState<Toaster[]>([]);
  const pausedRef = useRef<boolean>(false);

  // Ensure minimum duration is 3 seconds (3000ms)
  const globalDuration = Math.max(autoHideDuration, 3000);

  const Toast = useCallback(
    (message: string, options: ToastOptions) => {
      if (
        preventDuplicate &&
        snacks.find((snack) => snack.message === message)
      ) {
        return;
      }
      const newToast: Toaster = {
        message,
        options,
        state: "entering" as ToastState,
      };
      setSnacks((prevSnacks) => [...prevSnacks, newToast]);
    },
    [preventDuplicate, snacks]
  );

  const startExit = useCallback((index: number) => {
    setSnacks((prev) =>
      prev.map((snack, i) =>
        i === index ? { ...snack, state: "exiting" as ToastState } : snack
      )
    );
    // Add timeout to ensure removal after animation
    setTimeout(() => removeSnackbar(index), 400);
  }, []);

  const removeSnackbar = useCallback((index: number) => {
    setSnacks((prevSnacks) => prevSnacks.filter((_, i) => i !== index));
  }, []);

  const getIcon = (variant: string) => {
    switch (variant) {
      case "success":
        return "✓";
      case "error":
        return "×";
      case "info":
        return "i";
      case "warning":
        return "!";
      default:
        return null;
    }
  };

  const handleProgressEnd = useCallback((index: number) => {
    const toast = document.querySelector(`[data-toast-index="${index}"]`);
    if (toast) {
      toast.setAttribute("data-leaving", "true");
    }
  }, []);

  return (
    <ToasterContext.Provider value={{ Toast }}>
      {children}
      <ToasterContainer
        dense={dense}
        anchorOrigin={anchorOrigin}
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
      >
        {snacks.map((snack, index) => (
          <ToastStyle
            key={`toast-${index}-${snack.message}`} // Improved key for better React reconciliation
            data-state={snack.state}
            variant={snack.options.variant}
            autoHideDuration={globalDuration} // Using the global duration
            dense={dense}
            data-testid="toast"
            onAnimationEnd={(e) => {
              if (e.animationName.includes("fadeOutDown")) {
                removeSnackbar(index);
              }
            }}
          >
            <IconWrapper>{getIcon(snack.options.variant)}</IconWrapper>
            {snack.message}
            <div
              className="progress-bar"
              onAnimationEnd={() => startExit(index)}
            />
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
