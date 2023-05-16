import { createContext, useContext, useState, ReactNode } from 'react';

const KeyboardContext = createContext<{
  isKeyboardVisible: boolean;
  setKeyboardVisible: (value: boolean) => void;
}>({
  isKeyboardVisible: false,
  setKeyboardVisible: (mode) => {
    console.log();
  },
});

export function useKeyboardContext() {
  return useContext(KeyboardContext);
}

export function KeyboardContextProvider({ children }: { children: ReactNode }) {
  const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);
  return (
    <KeyboardContext.Provider value={{ isKeyboardVisible, setKeyboardVisible }}>
      {children}
    </KeyboardContext.Provider>
  );
}
