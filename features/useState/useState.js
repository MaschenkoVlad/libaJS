function useState(initialValue) {
  const refresh = renderLiba.refresh;
  const queueIndex = renderLiba.queueIndex;
  const stateQueue = renderLiba.stateQueue;

  if (stateQueue.length <= queueIndex) {
    stateQueue.push(initialValue);
  }

  let localState = stateQueue[queueIndex];

  const stateUpdater = (newValue) => {
    if (newValue instanceof Function) {
      localState = newValue(localState);
    } else {
      localState = newValue;
    }

    stateQueue[queueIndex] = localState;

    renderLiba.queueIndex = 0;

    refresh();
  };

  renderLiba.queueIndex++;

  return [localState, stateUpdater];
}
