export const formatText = (text: string) => {
  if (!text) return "";

  const formatted = text.replace(/_/g, " ");

  if (formatted.length <= 2) {
    return formatted.toUpperCase();
  }

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

export const formatUnit = (value: string | number) => {
  if (typeof value !== "string") return value;

  return value.replace(/(\d+)(\s*)([a-zA-Z]+)/, "$1 $3");
};