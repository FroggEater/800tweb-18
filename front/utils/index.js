const stepTypes = [
  {
    value: "hotel",
    label: "Hotel",
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
    value: "activity",
    label: "Other",
  },
];

const validateStepType = function (type) {
  const simpleTypes = stepTypes.map((type) => type.value);
  if (!simpleTypes.includes(type)) return "hotel";
  return type;
};

export { stepTypes, validateStepType };
