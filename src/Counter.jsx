import React from "react";
import { observer } from "mobx-react-lite";
import counterStore from "./store/CounterStore";

const Counter = observer(() => {
  const handleClick = () => {
    counterStore.addCount();
  };
  return (
    <div>
      <p>{counterStore.countValue}</p>
      <button onClick={handleClick}>Add</button>
      {/* <button onClick={counterStore.addCount}>Add</button> */}
      {/* MobX needs the action (addCount) to be called in a context that correctly binds this to the store. When using onClick={counterStore.addCount}, this is not automatically bound to counterStore. Instead, it's bound to the DOM element, which causes the error. */}
    </div>
  );
});

export default Counter;
