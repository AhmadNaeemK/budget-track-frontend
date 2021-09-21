export const getRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export const categoryColor = {
  Income: '#000',
  Drink: '#c0c93c',
  Fuel: '#c93c41',
  Healthcare: '#64c93c',
  Travel: '#3cc9aa',
  Food: '#8c3cc9',
  Grocery: '#c97b3c',
  Other: '#a5a5a5'
}