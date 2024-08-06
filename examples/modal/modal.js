export function Modal(props, libaConfig) {
  const element = document.createDocumentFragment();

  return {
    element,
    props,
  };
}

Modal.render = ({ element, props }) => {
  const { isInfoModalOpen, setIsInfoModalOpen, name } = props;

  const dialogElement = document.createElement("dialog");
  dialogElement.style.position = "absolute";
  dialogElement.style.top = "35%";
  dialogElement.style.zIndex = "99";

  if (isInfoModalOpen) {
    dialogElement.setAttribute("open", "open");
  } else {
    dialogElement.removeAttribute("open");
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

  dialogElement.append(paragraph);
  dialogElement.append(button);

  element.appendChild(dialogElement);
};
