
exports.pathError = (req, res) => {
    return res.status(404).send({msg: 'Path Not Found'});
}

exports.handlePsqlErrors = (err, req, res, next) => {
    console.log(err.code);
    if (err.code === '22P02' || err.code === '23502') {
      res.status(400).send({ msg: 'Bad Request' });
    } else next(err);
  };

exports.handleCustomErrors = (err, req, res, next) => {
    if (err.status && err.msg) {
      res.status(err.status).send({ msg: err.msg });
    } else next(err);
  };

  exports.handle500Errors = (err, req, res, next) => {
    console.log(err);
    res.status(500).send({msg: 'Server Error'});
  };
  
