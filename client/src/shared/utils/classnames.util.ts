export const cn = (list: any[]): string => {
  return list.filter(Boolean).join(" ");
};
