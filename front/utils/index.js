const stepTypes = [
  {
    value: "hotel",
    label: "Hotels",
    icon: "home",
  },
  {
    value: "flight",
    label: "Flight",
    icon: "wind",
  },
  {
    value: "restaurant",
    label: "Food",
    icon: "coffee",
  },
  {
    value: "bar",
    label: "Drinks",
    icon: "coffee",
  },
  {
    value: "museum",
    label: "Culture",
    icon: "book",
  },
];

const validateStepType = function (type) {
  const simpleTypes = stepTypes.map((type) => type.value);
  if (!simpleTypes.includes(type)) return "hotel";
  return type;
};

export { stepTypes, validateStepType };
