import web3 from 'web3';

export const validateCSV = data => {
  let validCSV = true;
  const header = data[0].split(',');
  let _totalAmount = 0;
  let endNull = 1;

  if (
    header.length === 2 &&
    header[0].trim() === 'address' &&
    header[1].trim() === 'amount' &&
    data.length >= 3
  ) {
    for (let i = 1; i < data.length; i++) {
      if (data[i] !== '') {
        const rowData = data[i].split(',');
        if (
          web3.utils.isAddress(rowData[0].trim()) &&
          !isNaN(rowData[1].trim()) &&
          rowData[1].trim() !== '' &&
          Number(rowData[1].trim()) > 0
        ) {
          _totalAmount += Number(rowData[1]);
        } else {
          validCSV = false;
          break;
        }
      } else {
        endNull += 1;
      }
    }
  } else {
    validCSV = false;
  }
  return { validCSV, _totalAmount, _totalAddress: data.length - endNull };
};
