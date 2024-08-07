import { Modal } from "./modal.js";

export function App() {
  // TODO: for some reason new DOM elements don't appear in root with createDocumentFragment
  // const element = document.createDocumentFragment();
  const element = document.createElement("div");
  element.style.width = "100wh";
  element.style.height = "100vh";
  element.style.position = "relative";

  return {
    element,
  };
}

App.render = ({ element, liba }) => {
  const { useState } = liba;
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [name, setName] = useState("Anton");

  const button = document.createElement("button");

  button.addEventListener("click", function (e) {
    setIsInfoModalOpen((currentValue) => !currentValue);
  });

  const text = isInfoModalOpen ? `Close modal` : `Open modal`;
  const buttonText = document.createTextNode(text);
  button.appendChild(buttonText);
  button.style.margin = "0";
  button.style.position = "absolute";
  button.style.top = "50%";
  button.style.left = "50%";
  element.append(button);

  const modalComponent = liba.create(Modal, {
    name,
    setName,
    isInfoModalOpen,
    setIsInfoModalOpen,
  });

  element.append(modalComponent.element);
};
