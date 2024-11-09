export let generateMessage = (
  from: string,
  text: string,
): {
  from: string;
  text: string;
  createdAt: number;
} => {
  return {
    from,
    text,
    createdAt: new Date().getTime(),
  };
};

export let generateLocationMessage = (from, lat, lng) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${lat},${lng}`,
    createdAt: new Date().getTime(),
  };
};
