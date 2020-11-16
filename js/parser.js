let x = "0002010102121531**999166**999166****M000000000126720019NG.COM.NIBSS-PLC.QR0111S000000000102309991662005210922520163783561015204000053035665402105802NG5913Test Merchant6007Nigeria6304A54A";

// let x = "000201010212021341318320274435204729953035665802NG5919Nez Stores and more6012LAGOS ISLAND63045D48";

// let x = "00020102124037531553535204599953035665802NG5917Taos Beauty Brand6005Lekki6304FB30"

// let x = "000201021040375331165204563153035665802NG5924Ebanking Welfare Account6005Lagos6304B927"

const parser = (qrData) => {
  let ln = 2, obj = {}, valueLength = 0, valueStartIndex = 0, valueEndIndex = 0, keyStartIndex = 0, keyEndIndex = 0, stepper = ln, singleIndex = 1;
  for(let i = 0; i < qrData.length; i++) {
    if(i + singleIndex === ln) {
      keyStartIndex = i - singleIndex;
      keyEndIndex = i + singleIndex;
      valueLength = setValueLength(i, singleIndex, qrData, ln, stepper);
      valueStartIndex = setStartIndex(i, singleIndex, stepper, ln);
      valueEndIndex = valueStartIndex + valueLength
      obj[qrData.slice(keyStartIndex, keyEndIndex)] = qrData.slice(valueStartIndex, valueEndIndex);
      ln = valueEndIndex + stepper;
    }
  }
  return obj;
}

const setValueLength = (i, singleIndex, qrData, ln, stepper) => {
  return i > singleIndex ? parseInt(qrData.slice(ln, ln + stepper)) : parseInt(qrData.slice(ln, [i + ln + singleIndex]));
}

const setStartIndex = (i, singleIndex, stepper, ln) => {
  return i > singleIndex ? (i + singleIndex) + stepper : (i + singleIndex) + ln;
}

const parseResult = (qrData) => {
  let result = parser(qrData);
  if(result['26']) {
    result['subdomains'] = parser(result['26']);
  }
  return result;
}

console.log(parseResult(x));