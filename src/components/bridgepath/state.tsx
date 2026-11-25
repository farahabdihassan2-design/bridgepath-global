import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";
import { initialState, demoState, STORAGE_KEY, type AppState } from "@/lib/bridgepath";
import { toast } from "sonner";
const AppContext = createContext<{
  state: AppState;
  setState: Dispatch<SetStateAction<AppState>>;
  loadDemo: () => void;
} | null>(null);
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(initialState);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (
          parsed &&
          typeof parsed === "object" &&
          parsed.candidate &&
          Array.isArray(parsed.answers) &&
          Array.isArray(parsed.legal) &&
          Array.isArray(parsed.payment) &&
          Array.isArray(parsed.applications) &&
          Array.isArray(parsed.mentors)
        )
          setState({
            ...initialState,
            ...parsed,
            invoice: { ...initialState.invoice, ...parsed.invoice },
          });
      }
    } catch {
      toast.error("Saved progress could not be opened. A fresh session is ready.");
    }
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (loaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch {
        toast.error("This browser cannot save progress. Please enable browser storage.");
      }
    }
  }, [state, loaded]);
  function loadDemo() {
    setState(structuredClone(demoState));
    toast.success("Judge demo loaded", {
      description: "Meet Amina Hassan. All three tracks and the hiring partner view are ready.",
    });
  }
  return (
    <AppContext.Provider value={{ state, setState, loadDemo }}>{children}</AppContext.Provider>
  );
}
export function useBridgePath() {
  const value = useContext(AppContext);
  if (!value) throw new Error("BridgePath provider is missing");
  return value;
}
