export const filterObject = (inputObject, filterCriteria) => {
  const filteredObject = {};

  for (const key in inputObject) {
    if (Object.prototype.hasOwnProperty.call(inputObject, key)) {
      if (filterCriteria(inputObject[key])) {
        filteredObject[key] = inputObject[key];
      }
    }
  }

  return filteredObject;
};
