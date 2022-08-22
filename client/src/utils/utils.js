import exportFromJSON from "export-from-json";

export const jsonToExcel = (data, fileName) => {
  exportFromJSON({ data, fileName, exportType: "xls" });
};

export const newDate = new Date()
  .toISOString()
  .replace("T", "_")
  .substring(0, 19)
  .replace(":", "-");
