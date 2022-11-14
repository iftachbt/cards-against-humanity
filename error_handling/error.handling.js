export const errorMid = (err, req, res, next) => {
  if (!err.code) return res.status(500).send({ msg: err.message });
  res.status(err.code).send({ msg: err.message });
};
