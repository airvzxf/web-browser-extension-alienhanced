function isJSON(value) {
    if (typeof value === "string") {
        if ((value.startsWith("{") && value.endsWith("}"))
            || (value.startsWith("[") && value.endsWith("]"))) {
            try {
                JSON.parse(value);
                return true;
            } catch (e) {
                return false;
            }
        }
    }

    return false;
}

function transformJsonToJs(data) {
    const information = {};

    for (const dataKey in data) {
        if (typeof data[dataKey] === "object") {
            information[dataKey] = transformJsonToJs(data[dataKey]);
        } else if (isJSON(data[dataKey])) {
            data[dataKey] = JSON.parse(data[dataKey]);
            information[dataKey] = transformJsonToJs(data[dataKey]);
        } else {
            information[dataKey] = data[dataKey];
        }
    }

    return information;
}

export {transformJsonToJs};
