// src/ToastStyle.tsx
import styled, { keyframes } from "styled-components";

// Define the keyframes for slideIn and fadeOut animations
const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(50%) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
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

// Define the ToastStyle component with styled-components
interface SnackbarProps {
  variant: "success" | "error" | "info" | "warning";
  autoHideDuration: number;
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
  padding: 16px;
  border-radius: 4px;
  position: fixed;
  z-index: 9999;
  left: 15px;
  bottom: 15px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  animation: ${slideIn} 0.25s cubic-bezier(0.68, -0.55, 0.27, 1.55),
    ${fadeOut} 0.5s ease-in
      ${({ autoHideDuration }) => autoHideDuration - 250}ms;
  /* Additional styles to replicate the CSS */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

export default ToastStyle;
