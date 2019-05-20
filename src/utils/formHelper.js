export function FieldHelper({ type, label, name, values }) {
  this.type = type;
  this.label = label;
  this.name = name;
  if (values) {
    this.values = values;
  }
}

FieldHelper.getNames = function(array) {
  let names = {};
  for (let i = 0; i < array.length; i++) {
    names[array[i].name] = "";
  }
  return names;
};
