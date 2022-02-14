exports.serverError = (err, req, res, next) => {
    if (err instanceof NotFound) {
        res.status(404).send('Path Not Found');
    }
    else if (err) {
        return res.status(500).send({msg: 'Internal Server Error'});
    } else {
        next(err);
    }
}

exports.pathError = (req, res) => {
    return res.status(404).send({msg: 'Path Not Found'});
}