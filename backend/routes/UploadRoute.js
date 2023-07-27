const {Router} = require('express');
const UploadModel = require('../models/UploadModel');
const uploadMiddleware = require('../middlewares/MulterMiddleware');

const router = Router(); 

// setting routes

//getting data from database
router.get('/api/get', async(req, res) => {
    const getDatas = await UploadModel.find().sort({createdAt:'descending'})
    res.status(200).send(getDatas)
})

//saving data to database
router.post('/api/save',uploadMiddleware.single('photo'), (req, res) => {
    const photo = req.file.filename
    console.log(photo);

    UploadModel.create({...req.body, photo})
    .then((data) => {
        console.log('Upload Succesfully')
        console.log(data)
        res.send(data)
    })
    .catch((err) => {
        console.log(err)
    })
})

module.exports = router;