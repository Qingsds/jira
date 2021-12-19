import { useCallback, useMemo, useState } from "react";

export const useUndo = <T>(initPresent: T) => {
  const [state, setState] = useState({
    past: [] as T[],
    present: initPresent,
    future: [] as T[],
  });

  const canUndo = useMemo(() => {
    return state.past.length !== 0;
  }, [state.past.length]);

  const canRedo = useMemo(() => {
    return state.future.length !== 0;
  }, [state.future.length]);

  const undo = useCallback(() => {
    setState((current) => {
      const { past, present, future } = current;
      if (past.length === 0) return current;
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    });
  }, []);

  const redo = useCallback(() => {
    setState((current) => { 
      const { past, present, future } = current;
      if (future.length === 0) return current;
      const next = future[0];
      const newFuture = future.slice(1);
      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    });
  }, []);

  const set = useCallback((newValue: T) => {
    setState((current) => {
      const { past, present } = current;
      return {
        past: [...past, present],
        present: newValue,
        future: [],
      };
    });
  }, []);

  const reset = useCallback((newValue: T) => {
    setState(() => {
      return {
        past: [],
        present: newValue,
        future: [],
      };
    });
  }, []);

  return [ state , { set, reset, undo, redo, canRedo, canUndo }] as const;
};
