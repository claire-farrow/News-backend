
exports.pathError = (req, res) => {
    return res.status(404).send({msg: 'Path Not Found'});
}