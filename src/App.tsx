import { useState, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from "./router";
import { GlobalStyle } from "./styles/theme";
import { LoginModal } from "./components/LoginModal";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: unknown) => {
        // 401 Unauthorized는 재시도 안 함
        if ((error as { response?: { status: number } })?.response?.status === 401) return false;
        return failureCount < 1;
      },
      staleTime: 1000 * 60,
    },
  },
});

export const App = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const handleUnauth = () => setShowLoginModal(true);
    window.addEventListener("auth:unauthorized", handleUnauth);
    return () => window.removeEventListener("auth:unauthorized", handleUnauth);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <GlobalStyle />
      {showLoginModal && (
        <LoginModal />
      )}
    </QueryClientProvider>
  );
};
