export function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  function s8() {
    return s4() + s4();
  }

  function s12() {
    return s4() + s4();
  }

  return s8() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s12();
}

export function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
