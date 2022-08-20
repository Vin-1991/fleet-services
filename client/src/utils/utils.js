import exportFromJSON from "export-from-json";

export const jsonToExcel = (data, fileName) => {
  exportFromJSON({ data, fileName, exportType: "xls" });
};
