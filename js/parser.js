let x = "0002010102121531**999166**999166****M000000000126720019NG.COM.NIBSS-PLC.QR0111S000000000102309991662005210922520163783561015204000053035665402105802NG5913Test Merchant6007Nigeria6304A54A";

// let x = "000201010212021341318320274435204729953035665802NG5919Nez Stores and more6012LAGOS ISLAND63045D48";

let ln = 2;
let obj = {};
let valueLength = 0;
let startIndex = 0;
let endIndex = 0;
let keyStartIndex = 0;
let keyEndIndex = 0;
let stepper = ln;
let singleIndex = 1;
const parser = (x) => {
  for(let i = 0; i < x.length; i++) {
    if(i + singleIndex === ln) {
      keyStartIndex = i - singleIndex;
      keyEndIndex = i + singleIndex;
      valueLength = i > singleIndex ? parseInt(x.slice(ln, ln + stepper)) : parseInt(x.slice(ln, [i + ln + singleIndex]));
      startIndex = i > singleIndex ? (i + singleIndex) + stepper : (i + singleIndex) + ln;
      endIndex = startIndex + valueLength
      obj[x.slice(keyStartIndex, keyEndIndex)] = x.slice(startIndex, endIndex);
      ln = endIndex + stepper;
    }
  }
  return obj;
}

console.log(parser(x))