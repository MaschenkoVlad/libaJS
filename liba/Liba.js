function ensureChildren(parent) {
  if (parent) {
    if (!parent.childrenComponents) parent.childrenComponents = [];
  }
}

function propsTheSame(prevProps, newProps) {
  if (prevProps === newProps) return true;

  if (
    (prevProps == null && newProps != null) ||
    (prevProps != null && newProps == null)
  ) {
    return false;
  }

  const prevKeys = Object.keys(prevProps || {});
  const newKeys = Object.keys(newProps || {});

  if (prevKeys.length !== newKeys.length) {
    return false;
  }

  for (let key of prevKeys) {
    if (prevProps[key] !== newProps[key]) {
      return false;
    }
  }

  return true;
}

function createComponentInstance(ComponentFunction, props, componentLiba) {
  const componentInstance = ComponentFunction(props, { liba: componentLiba });
  componentInstance.type = ComponentFunction;
  componentInstance.refresh = componentLiba.refresh;

  return componentInstance;
}

export const Liba = {
  create(ComponentFunction, props = {}, { parent } = { parent: null }) {
    const renderLiba = {
      stateQueue: [],
      queueIndex: 0,

      create: (ChildrenComponentFunction, props = {}) => {
        componentInstance.childrenIndex++;

        const alreadyExistedComponentInstance =
          componentInstance.childrenComponents?.[
            componentInstance.childrenIndex
          ];

        if (alreadyExistedComponentInstance) {
          if (
            alreadyExistedComponentInstance.type === ChildrenComponentFunction
          ) {
            if (propsTheSame(props, alreadyExistedComponentInstance.props)) {
              return alreadyExistedComponentInstance;
            } else {
              alreadyExistedComponentInstance.props = props;
              alreadyExistedComponentInstance.refresh();
              return alreadyExistedComponentInstance;
            }
          } else {
            delete componentInstance.childrenComponents[
              componentInstance.childrenIndex
            ];
          }
        }

        const childInstance = Liba.create(ChildrenComponentFunction, props, {
          parent: componentInstance,
        });

        return childInstance;
      },
      refresh() {
        // todo: if element doesn't have innerHTML??
        componentInstance.element.innerHTML = "";

        componentInstance.childrenComponents?.forEach((cc) => cc.cleanup?.());
        //componentInstance.childrenComponents = []

        renderComponent();
      },
      useState(initialValue) {
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

          componentInstance = createComponentInstance(
            ComponentFunction,
            props,
            componentLiba
          );
          refresh();
        };

        renderLiba.queueIndex++;

        return [localState, stateUpdater];
      },
    };

    const componentLiba = {
      refresh: renderLiba.refresh,
      useState: renderLiba.useState,
    };

    let componentInstance = createComponentInstance(
      ComponentFunction,
      props,
      componentLiba
    );

    if (parent) {
      ensureChildren(parent);
      parent.childrenComponents[parent.childrenIndex] = componentInstance;
    }

    function renderComponent() {
      componentInstance.childrenIndex = -1;

      ComponentFunction.render({
        element: componentInstance.element,
        localState: componentInstance.localState,
        props: componentInstance.props,
        liba: renderLiba,
      });
    }

    renderComponent();

    return componentInstance;
  },
  refresh() {},
};
