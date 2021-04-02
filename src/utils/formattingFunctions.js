import Web3 from 'web3';

export const conciseAddress = address => {
  if (Web3.utils.isAddress(address)) {
    return `${address.slice(0, 6)}...${address.slice(address.length - 3, address.length)}`;
  }
  return '-';
};

// export const ogTrunc = (val, test) => {
//   if (!Number(val)) {
//     return 0;
//   }
//   const _val = val - Math.trunc(val);
//   if (!_val) {
//     return Math.trunc(val);
//   }
//   let decimal = 0;
//   if (_val < 0.000001) {
//     decimal = 7;
//     return parseFloat(val).toFixed(7);
//   } else if (_val < 0.00001) {
//     decimal = 6;
//   } else if (_val < 0.0001) {
//     decimal = 5;
//   } else if (_val < 0.001) {
//     decimal = 4;
//   } else if (_val < 0.01) {
//     decimal = 3;
//   } else if (_val < 1) {
//     decimal = 2;
//   } else {
//     return Math.trunc(val).toString();
//   }
//   return (
//     Math.trunc(val) +
//     parseFloat(_val.toString().match(new RegExp('^-?\\d+(?:.\\d{0,' + decimal + '})?'))[0])
//   ).toFixed(decimal);
// };

export const trunc = (val, test) => {
  let _val = val.toString();
  const _val2 = _val.split('.');
  if (_val2[0].length > 8) {
    const _val = _val2[0].slice(0, 4);
    const __val = _val2[0].slice(_val2.length - 4, val.length);
    let joined = [_val, __val].join('..');
    if (_val2[1]) {
      joined += '.' + _val2[1].slice(0, 2);
    }
    return joined;
  } else if (_val2[1]) {
    const pointValue = _val2[0] + '.' + _val2[1].slice(0, 2);
    return Number(pointValue).toLocaleString();
  } else {
    return Number(_val).toLocaleString();
  }
};

export const truncFileName = (fileName, acceptedLength) => {
  if (fileName.length > acceptedLength) {
    return `${fileName.substring(0, acceptedLength - 4)}...`;
  } else {
    return fileName;
  }
};
