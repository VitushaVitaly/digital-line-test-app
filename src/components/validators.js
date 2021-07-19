const isValidName = (value) => /^[a-z-]+$/i.test(value);
const isValidAge = (value) => /^[1-9][0-9]{0,2}$/.test(value);

export {isValidName, isValidAge};