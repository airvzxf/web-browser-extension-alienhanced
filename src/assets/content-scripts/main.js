console.debug("Content-Scripts: main.js");

const itemScriptRelativePath = "assets/content-scripts/modules/item.js";
const itemScriptAbsolutePath = browser.runtime.getURL(itemScriptRelativePath);
const mainScript = document.createElement("script");
mainScript.setAttribute("type", "module");
mainScript.textContent = `import {getItemInformation} from '${itemScriptAbsolutePath}';\n`;
mainScript.textContent += "getItemInformation();";
document.body.insertAdjacentElement('beforeend', mainScript);
