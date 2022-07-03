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
    icon: "columns",
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

const navLinks = [
  {
    label: "Home",
    icon: "home",
    id: "home",
    action: () => {},
  },
  {
    label: "Download",
    icon: "download",
    id: "download",
    action: () => {},
  },
  {
    label: "Maps",
    icon: "map",
    id: "maps",
    action: () => {
      const url = "https://www.google.com/maps";
      window.open(url, "_blank").focus();
    },
  },
];

const validateStepType = function (type) {
  const simpleTypes = stepTypes.map((type) => type.value);
  if (!simpleTypes.includes(type)) return "hotel";
  return type;
};

export { stepTypes, navLinks, validateStepType };
