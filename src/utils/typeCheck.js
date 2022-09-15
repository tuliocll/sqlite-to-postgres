const types = require("./types");

function checkTypes(model, tableName = "") {
  if (!model || typeof model !== "object") {
    throw new Error("Model not found");
  }

  Object.keys(model).forEach((key) => {
    const logicalType = types.logicalTypes.find(
      (logicalT) => logicalT === model[key]
    );

    const stringType = types.stringTypes.find(
      (stringT) => stringT === model[key]
    );

    const numberType = types.numberTypes.find(
      (numberT) => numberT === model[key]
    );

    if (!numberType && !stringType && !logicalType) {
      throw new Error(`Invalid type "${model[key]}" on model "${tableName}"`);
    }
  });
}
module.exports = checkTypes;
