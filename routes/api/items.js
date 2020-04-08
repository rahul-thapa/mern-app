const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')


// Item model

const Item = require('../../models/Item')

// ROUTES

// @route GET api/item
// @desc Get All items
// @access Public

router.get('/', (req,res)=>{
    Item.find()
        .sort({date:-1})
        .then(items=>res.json(items))
})

// @route POST api/item
// @desc create a item
// @access Private

router.post('/', auth, (req,res)=>{
    const newItem = new Item({
        name: req.body.name
    })
    newItem.save().then(item=>res.json(item))
})

// @route DELETE api/item
// @desc delete an item
// @access Private

router.delete('/:id', auth, (req,res)=>{
    Item.findById(req.params.id)
        .then(item=> item.remove())
        .then(()=>res.json({success:true}))
        .catch(err=>res.status(404).json({success:false}))
})


module.exports = router