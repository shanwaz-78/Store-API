export const notFound = (_, res) => {
  return res.status(404).send({ message: `Not Found.` });
};
