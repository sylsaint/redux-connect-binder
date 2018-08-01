const NAME = /[a-zA-Z0-9]+/;
const ACCESSOR = /([a-zA-Z0-9]+\.)*[a-zA-Z0-9]+/;

const STRING = "string";
const ARRAY = "array";
const FUNCTION = "function";
const OBJECT = "object";

// generate property list from input
export function accessor(dot) {
  if (ACCESSOR.exec(dot)) {
    return dot.split(".");
  }
  return [];
}

// detect object type
export function checkType(obj) {
  return Object.prototype.toString.call(m).slice(8, -1);
}

export function validate(str, regex) {
  return regex.test(str);
}

// get object property via array of proptery names
export function getSequenceProperty(obj, arr) {
  const tmp = obj;
  return arr.reduce(function(prev, key){
    if (checkType(key) === STRING) {
      if(key) {
        return prev[key];
      }
      return prev;
    } else if (checkType(key) === FUNCTION) {
      return key(prev);
    }
  }, tmp)
}
