import { localTimestamp } from "./Helper";

export const arrayToExcel = async (array, fileName, object = false) => {
  const data = object ? array : array["object"];

  //Column Names
  const auditKeys = [
    "userId",
    "activity",
    "agencyCode",
    "timestamp",
    "page",
    "description",
    "ipAddress",
  ];
  const tableHeaders = `<tr>${auditKeys
    .map((auditKeys) => `<td>${auditKeys.toUpperCase()}</td>`)
    .join("")}</tr>`;

  //table rows
  const tableRows = data
    .map((obj) => [
      `<tr>
      ${auditKeys.map((auditKey) => `<td>${auditKey === 'timestamp' ? localTimestamp(new Date(obj[auditKey])) : obj[auditKey]}</td>`).join("")}
       </tr>`,
    ])
    .join("");

  //table
  const table = `<table>${tableHeaders}${tableRows}</table>`.trim();

  const xmlTable = createXMLTable(table, fileName);
  const downloadURL = createFileUrl(xmlTable);
  return downloadFile(downloadURL, fileName);
};

const createXMLTable = (table, fileName) => {
  const xmlTable = `
          <html xmlns:o="urn:schemas-microsoft-com:office:office xmlns:x="urn:schemas-microsoft-com:office:excel"
         xmlns="http://www.w3.org/TR/REC-html40"
          >
             <meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8"/>
             <head>
                <xml>
                  <x:ExcelWorkbook>
                      <x:ExcelWorksheets>
                          <x:ExcelWorksheet>
                              <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>
                          </x:ExcelWorksheet>
                      </x:ExcelWorksheets>
                  </x:ExcelWorkbook>
                </xml>
             </head>
             <body>
               ${table}
             </body>
          </html> `;
  return xmlTable;
};

const createFileUrl = (xmlTable) => {
  const tableBlob = new Blob([xmlTable], {
    type: "application/vnd.ms-excel;base64,",
  });
  const downloadURL = URL.createObjectURL(tableBlob);
  return downloadURL;
};

const downloadFile = (downloadURL, fileName) => {
  const downloadLink = document.createElement("a");
  document.body.appendChild(downloadLink);
  downloadLink.download = fileName;
  downloadLink.href = downloadURL;
  downloadLink.click();
};
