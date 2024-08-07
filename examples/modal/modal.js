import { Input } from "./input.js";

export function Modal(props) {
  const dialogElement = document.createElement("dialog");
  dialogElement.style.position = "absolute";
  dialogElement.style.top = "35%";
  dialogElement.style.zIndex = "99";

  return {
    element: dialogElement,
    props,
  };
}

Modal.render = ({ element, props, liba }) => {
  const { isInfoModalOpen, setIsInfoModalOpen, name, setName } = props;

  if (isInfoModalOpen) {
    element.setAttribute("open", "open");
  } else {
    element.removeAttribute("open");
  }

  const button = document.createElement("button");
  button.addEventListener("click", function (e) {
    setIsInfoModalOpen(false);
  });
  const buttonText = document.createTextNode("Close modal");
  button.appendChild(buttonText);

  const paragraph = document.createElement("p");
  const paragraphText = document.createTextNode(
    `Dear ${name} lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur, est.`
  );
  paragraph.appendChild(paragraphText);

  const inputElement = liba.create(Input, { setName });

  element.append(paragraph);
  element.append(button);
  element.append(inputElement.element);
};
