const stepTypes = [
  {
    value: "hotel",
    label: "Hotels",
  },
  {
    value: "flight",
    label: "Flight",
  },
  {
    value: "restaurant",
    label: "Food",
  },
  {
    value: "bar",
    label: "Drinks",
  },
  {
    value: "museum",
    label: "Culture",
  },
];

const validateStepType = function (type) {
  const simpleTypes = stepTypes.map((type) => type.value);
  if (!simpleTypes.includes(type)) return "hotel";
  return type;
};

export { stepTypes, validateStepType };
