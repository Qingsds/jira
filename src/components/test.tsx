import { useUndo } from "utils/use-undo";

export const Test = () => {
  const [state, { set, reset, undo, redo, canRedo, canUndo }] = useUndo(0);

  return (
    <div>
      <h3>{state.present}</h3>
      <button onClick={() => set(state.present + 1)}>+1</button>
      <button onClick={undo} disabled={!canUndo}>
        undo
      </button>
      <button onClick={redo} disabled={!canRedo}>
        redo
      </button>
      <button onClick={() => reset(state.present + 1)}>reset</button>
    </div>
  );
};
