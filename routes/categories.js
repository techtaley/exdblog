const router = require("express").Router()
const Category = require("./../models/Category")

//Create new categories
router.post("/", async (req, res) => {
    const newCat = new Category(req.body) 

    try {
        const savedCat = await newCat.save()  
        res.status(200).json(savedCat)
    } catch(err) {
        res.status(500).json(err) 
    }
})

//GET ALL CATEGORIES
router.get("/", async (req, res) => {    
    try{
        const cats = await Category.find() 
        res.status(200).json(cats)
    } catch(err){
        res.status(500).json(err)
    }
})

//UPDATE CATEGORIES By Id
router.put("/:id", async (req, res) => {
    const cat = await Category.findById(req.params.id)
    if(cat.name){
        try {
            const updatedCat = await Category.findByIdAndUpdate(req.params.id, { 
                $set: req.body,  
            })
    
            res.status(200).json(updatedCat)
        } catch(err){
            res.status(500).json(err)
        }    
    } else {
        res.status(401).json("You can only update your categories...")
    }
})

//DELETE CATEGORY
router.delete("/:id", async (req, res) => {
    try{
        const delCat = await Category.findById(req.params.id)
        if(delCat.name === req.body.name){ //if category from db matches req.body.name
            try {
                delCat.delete()  
                res.status(200).json("Category has been deleted...")    
            } catch(err){
                res.status(500).json(err)
            }
        } else {
            res.status(401).json("You can delete only your categories!")   
        }
    } catch(err){
        res.status(500).json(err)
    }
})

module.exports = router