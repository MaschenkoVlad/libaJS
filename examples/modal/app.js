import { Modal } from "./modal.js";

export function App(_, libaConfig) {
  const {
    liba: { useState },
  } = libaConfig;
  const element = document.createDocumentFragment();

  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [name, setName] = useState("Anton");

  console.log("isInfoModalOpen", isInfoModalOpen);

  // TODO: props and state???
  return {
    element,
    localState: {},
    props: { name, setName, isInfoModalOpen, setIsInfoModalOpen },
  };
}

App.render = ({ element, liba, props, localState }) => {
  const { isInfoModalOpen, setIsInfoModalOpen } = props;
  console.log("App props", props);

  const wrapper = document.createElement("div");
  wrapper.style.width = "100wh";
  wrapper.style.height = "100vh";
  wrapper.style.position = "relative";

  const button = document.createElement("button");

  button.addEventListener("click", function (e) {
    setIsInfoModalOpen((currentValue) => !currentValue);
  });

  const text = isInfoModalOpen ? "Close modal" : "Open modal";
  console.log("text", text);
  const buttonText = document.createTextNode(text);
  button.appendChild(buttonText);
  button.style.margin = "0";
  button.style.position = "absolute";
  button.style.top = "50%";
  button.style.left = "50%";
  wrapper.append(button);

  const modalComponent = liba.create(Modal, props);

  wrapper.append(modalComponent.element);

  console.log("wrapper", wrapper);
  element.appendChild(wrapper);

  // TODO:
  // document.getElementById("root").append(element);
};
