import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";
import { AppRouter } from "./router/AppRouter";
import { AnalyticsProvider } from "../features/analytics/AnalyticsProvider";
import { ThemeProvider } from "../features/theme/ThemeProvider";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider>
          <AnalyticsProvider>
            <AppRouter />
          </AnalyticsProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
