import styled, { keyframes, css } from "styled-components";

const bounceInUp = keyframes`
  0% { 
    transform: translate3d(0, 120%, 0);
    opacity: 0;
  }
  70% { 
    transform: translate3d(0, -5px, 0);
    opacity: 0.95;
  }
  100% { 
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
`;

const fadeOutUp = keyframes`
  0% { 
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  100% { 
    transform: translate3d(0, -120%, 0);
    opacity: 0;
  }
`;

const fadeOutDown = keyframes`
  0% { 
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  100% { 
    transform: translate3d(0, 120%, 0);
    opacity: 0;
  }
`;

const progress = keyframes`
  from { width: 100%; }
  to { width: 0%; }
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
  padding: 12px 24px;
  border-radius: 6px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15), 0 3px 3px rgba(0, 0, 0, 0.08);
  color: white;
  font-weight: 500;
  font-size: 0.925rem;
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 300px;
  max-width: 480px;
  position: relative;
  animation: ${bounceInUp} 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
  margin: 8px 0;

  &[data-state="exiting"] {
    animation: ${fadeOutDown} 0.4s ease-out forwards;
  }

  .progress-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 4px;
    width: 100%;
    background: rgba(255, 255, 255, 0.4);
    transform-origin: left;
    animation: ${progress} ${({ autoHideDuration }) => autoHideDuration}ms
      linear;
    will-change: width;
  }

  &:hover {
    .progress-bar {
      animation-play-state: paused;
    }
  }
`;

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  flex-shrink: 0;
`;

export { ToastStyle, IconWrapper };
