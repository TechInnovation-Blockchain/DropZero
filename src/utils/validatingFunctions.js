import web3 from 'web3';

export const validateCSV = data => {
  let validCSV = true;
  const header = data[0].split(',');
  let _totalAmount = 0;

  if (
    header.length === 2 &&
    header[0].trim() === 'address' &&
    header[1].trim() === 'amount' &&
    data.length > 2
  ) {
    for (let i = 1; i < data.length - 1; i++) {
      const rowData = data[i].split(',');
      if (
        !web3.utils.isAddress(rowData[0].trim()) ||
        isNaN(rowData[1].trim()) ||
        rowData[1].trim() === ''
      ) {
        validCSV = false;
        break;
      } else {
        _totalAmount += Number(rowData[1]);
      }
    }
  } else {
    validCSV = false;
  }
  return { validCSV, _totalAmount, _totalAddress: data.length - 2 };
};
