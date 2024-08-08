# Custom Toast Notification Package

## Overview

The `toast-package` provides custom toast notifications for React applications, similar to `notistack`. It allows you to display notifications in a user-friendly manner.

## Installation

To install the package, you can use either npm or yarn:

```bash
npm install done-pop

or

yarn add done-pop
```

## Usage

To use the package in your React application, follow these steps:

1. Import the `useToast` function from 'done-pop'.
2. Create a toast instance using `useToast()`.
3. Call the toast instance to display a notification.

Here's an example:

```jsx
import { useToast } from "done-pop";

const MyComponent = () => {
  const { Toast } = useToaster();

  return (
    <div>
      <button
        onClick={() =>
          Toast("This is a success message!", { variant: "success" })
        }
      >
        Show Success Toast
      </button>
    </div>
  );
};
```

## Wrapping the App

To use the `ToasterProvider` and wrap your app, you can include the following code:

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToasterProvider } from "done-pop";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToasterProvider
      dense
      preventDuplicate
      maxSnack={3}
      autoHideDuration={1800}
      anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
    >
      <App />
    </ToasterProvider>
  </StrictMode>
);

```

## API

### useToast()

The `useToast` function returns a function that can be used to display a toast notification.

Example:

```jsx
const toast = useToast();
toast("This is a notification!");
```

## Files

- `dist/index.cjs.js`: CommonJS module entry point.
- `dist/index.esm.js`: ES module entry point.
- `dist/index.d.ts`: TypeScript type definitions.

## Keywords

- toast
- notification
- react
- snackbar
- Snackify

## Author

Zubair Rahman

## License

Please specify the license under which the package is distributed.

## Contributing

If you would like to contribute to this package, please fork the repository and submit a pull request.

## Issues

If you encounter any issues, please report them on the GitHub repository.

Feel free to expand this documentation with more details specific to your package's functionality and usage.
