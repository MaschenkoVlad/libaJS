// import { App } from "./app.js";
import { App } from "./examples/modal/app.js";

import { Liba } from "./liba/Liba.js";

const rootElement = document.getElementById("root");

const appComponent = Liba.create(App);

rootElement.append(appComponent.element);
