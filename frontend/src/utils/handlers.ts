import { PROCESS_STATUS } from "../constants/dashboard-constants";

export const getStatusLabel = (status: string) => {
  const statusConfig = {
    [PROCESS_STATUS.PROCESSING]: 'Processing',
    [PROCESS_STATUS.SUCCESSFULL]: 'Successful',
    [PROCESS_STATUS.FAILED]: 'Failed',
  };

  return statusConfig[status as keyof typeof statusConfig];
}

export const readTextFromFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to read file as text.'));
      }
    };
    reader.onerror = () => {
      reject(new Error('Error reading file.'));
    };
    reader.readAsText(file);
  });
}

export const countCsvKeyword = (csvText: string) => {
  const rows = csvText.split(/\r?\n/);

  let count = 0;

  for (const row of rows) {
    // column A is before first comma
    const firstCol = row.split(",")[0].trim();

    if (firstCol) count++;
  }

  return count;
}

export const validateCsvFile = async (file: File, notifyError: (message: string) => void): Promise<boolean> => {
  const isCsv = file.type === 'text/csv' || file.name.endsWith('.csv');
  if (!isCsv) {
    notifyError('You can only upload CSV files!');
    return false;
  }

  try {
    const text = await readTextFromFile(file);
    const rowCount = countCsvKeyword(text);
    if (rowCount > 100) {
      notifyError('The CSV file must not contain more than 100 keywords.');
      return false;
    }
    return true;
  } catch (error) {
    notifyError('Failed to read the CSV file.');
    console.error('Error reading CSV file:', error);
    return false;
  }
}
