function compare(a, b) {
  const nameA = a.user.name.toUpperCase();
  const nameB = b.user.name.toUpperCase();

  let comparison = 0;
  if (nameA > nameB) {
    comparison = 1;
  } else if (nameA < nameB) {
    comparison = -1;
  }
  return comparison;
}

module.exports = compare;
