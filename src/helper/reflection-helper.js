function getObjectReflect(value, propertyName) {
  const propertyNames = propertyName ? propertyName.split(".") : [];

  let result = value;

  propertyNames.forEach((property) => {
    if (!result) return;
    result = result[property];
  });

  return result;
}

function getValues(obj, propertyNames) {
  if (!obj || !propertyNames || propertyNames.length <= 0) {
    return Object.create({});
  }

  let result = Object.create({});

  const propertySize = propertyNames.length;

  propertyNames.forEach((propertyName) => {
    propertyName = propertyName.replace(/^\.+/, "");
    propertyName = propertyName.replace(/\.+$/, "");
    const value = getObjectReflect(obj, propertyName);
    const property = propertyName.replace(/^.+\./g, "");
    if (propertySize == 1) {
      result = value;
    } else {
      result[property] = value;
    }
  });

  return result;
}

function hasValue(obj, propertyName) {
  const value = getObjectReflect(obj, propertyName);
  return value ? true : false;
}

function findAnyByIndex(index, contents) {
  return index >= 0 && contents.length > index ? contents[index] : undefined;
}

function deleteProperties(obj, propertyNames) {
  if (!propertyNames || !obj) {
    return;
  }

  const resultObj = { ...obj };

  propertyNames.forEach((propertyName) => {
    delete resultObj[propertyName];
  });

  return resultObj;
}

export const ReflectionHelper = {
  getObjectReflect,
  getValues,
  hasValue,
  findAnyByIndex,
  deleteProperties,
};
