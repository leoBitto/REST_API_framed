
//ERROR handling MIDDLEWARE
module.exports = errorHandlers;
function errorHandlers(err, req, res, next) {
    switch(err){
        case typeof(err) === 'string' :
            return res.status(400).json({message:err});
            break;
        case (err === 'ValidationError') :
            return res.status(400).json({message:err.message});
            break;
        case (err === 'UnauthorizedError') :
            return res.status(401).json({message:'invalid token'});
            break;
        default:
            return res.status(500).json({message:err.message});

    }
     
}
