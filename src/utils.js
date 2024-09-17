export const timeConverter = (unformatted) => {
  const regex = /\d+-\d+-\d+/;
  const time = unformatted.match(regex);
  return time[0];
};
