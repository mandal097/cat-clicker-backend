const router = require('express').Router();
const CatModel = require('../models/Mycat');

//creating new cat
router.post('/create-cat', async (req, res) => {
    const { catName, nickNames, clicks, catImg } = req.body;
    if (!catName || !nickNames || !clicks || !catImg) {
        return res.json({
            status: 'err',
            message: 'ALl fields are required'
        })
    }

    try {
        const newCat = new CatModel({
            catName,
            nickNames,
            catImg,
            clicks
        })
        const savedCat = await newCat.save();
        return res.json({
            status: 'success',
            message: 'Successfully added',
            data: savedCat
        })
    } catch (error) {

    }
    return res.json({
        status: 'success',
        message: 'Successfully added'
    })
})


//list of all cats
router.get('/all-list', async (req, res) => {
    const list = await CatModel.find();
    return res.json({
        status: 'success',
        message: 'Successfully fetched data',
        data: list
    })
})


//update cat
router.put('/update-cat/:id', async (req, res) => {
    const { id } = req.params;
    const cat = await CatModel.findOne({ _id: id })
    if (!cat) {
        return res.json({
            status: 'err',
            message: 'Cat not found or maybe deleted'
        })
    }
    try {

        const updatedCat = await CatModel.findByIdAndUpdate(id, {
            $set: req.body
        },
            { new: true }
        )
        return res.json({
            status: 'success',
            message: 'Successfully updated',
            data: updatedCat
        })
    } catch (error) {
        return res.json({
            status: 'err',
            message: 'server err',
        })
    }

})

//increment count
router.put('/inrement-count/:id', async (req, res) => {
    const { id } = req.params;
    const cat = await CatModel.findOne({ _id: id })
    if (!cat) {
        return res.json({
            status: 'err',
            message: 'Data not found for this Id'
        })
    }
    try {
        await CatModel.findByIdAndUpdate(id, {
            $inc: { clicks: 1 }
        },
            { new: true }
        )
        return res.json({
            status: 'success',
            message: 'Successfully incremented by 1',
        })

    } catch (error) {
        return res.json({
            status: 'err',
            message: 'server err',
        })
    }
})


//delete cat
router.delete('/delete-cat/:id', async (req, res) => {
    const { id } = req.params;
    const cat = await CatModel.findOne({ _id: id })
    if (!cat) {
        return res.json({
            status: 'err',
            message: 'Cat not found or maybe deleted'
        })
    }
    try {
        await CatModel.findByIdAndDelete(id)
        return res.json({
            status: 'success',
            message: 'Delete successfully',
        })

    } catch (error) {
        return res.json({
            status: 'err',
            message: 'server err',
        })
    }
})


module.exports = router;