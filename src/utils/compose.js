const pipe = (functions) => (data) => functions.reduce((value, func: (arg0) => any) => func(value), data);

export { pipe };
