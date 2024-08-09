import styled, { keyframes } from "styled-components";

// Define the keyframes for a fast slide-in animation
const fancySlideIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(100%) scale(0.5) rotate(-15deg);
  }
  70% {
    opacity: 1;
    transform: translateY(0) scale(1.05) rotate(0);
  }
  100% {
    transform: translateY(0) scale(1) rotate(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

interface SnackbarProps {
  variant: "success" | "error" | "info" | "warning";
  autoHideDuration: number;
  dense?: boolean;
}

const ToastStyle = styled.div<SnackbarProps>`
  background: ${({ variant }) =>
    variant === "success"
      ? "#4caf50"
      : variant === "error"
      ? "#f44336"
      : variant === "info"
      ? "#2196f3"
      : "#ff9800"};
  color: white;
  padding: ${({ dense }) => (dense ? "8px" : "16px")};
  border-radius: 4px;
  animation: ${fancySlideIn} 0.15s cubic-bezier(0.25, 0.8, 0.25, 1) forwards,
    ${fadeOut} 0.5s ease-in forwards
      ${({ autoHideDuration }) => autoHideDuration - 500}ms;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  font-size: ${({ dense }) => (dense ? "0.875rem" : "1rem")};
  margin: 4px 0;
  display: flex;
  align-items: center;
`;

export default ToastStyle;
