export function Input(props) {
  const element = document.createElement("div");

  return {
    element,
    props,
  };
}

Input.render = ({ props, element, liba }) => {
  const { setName } = props;
  const inputElement = document.createElement("input");
  inputElement.classList.add("textField");
  const button = document.createElement("button");
  const buttonText = document.createTextNode("Set name");
  button.appendChild(buttonText);

  button.addEventListener("click", function (e) {
    const inputElement = document.querySelector(".textField");

    if (inputElement && inputElement.value) {
      setName(inputElement.value);
    }
  });

  element.append(inputElement);
  element.append(button);
};
