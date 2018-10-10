const Data = require('../models/models');


module.exports = {

    getAllData: async (req, res, next) => {
        const allData = await Data.find({/*se vuoto, cerca tutti*/});
        res.status(200).json(allData);

    },

    newData: async (req, res, next) => {
        const postedData = await Data.create(req.body);
        res.status(200).json(postedData);
     
    },

    updateData: async (req, res, next) => {
        const resData = await Data.findByIdAndUpdate({_id:req.params.id}, req.body, {new:true});
        res.status(200).json(resData);
              
    },

    deleteData: async (req, res, next) => {
        await Data.findByIdAndRemove({_id:req.params.id});
        res.status(200).send({type: 'DELETE'});

    }

}