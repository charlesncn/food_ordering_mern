const express = require('express')
const multer = require('multer')
const router = express.Router()
const MenuCardDate = require('./../models/menuDb')
const Menu = require('./../models/menuDb')
const path = require('path')


// define storage for the images
const storage = multer.diskStorage({
    // destination for uploaded files
    destination:function (req, file, callback){
        callback(null, './public/img/uploads')
    },
    // adding the extention
    filename:function(req, file, callback){
        callback(null, Date.now() + file.originalname)
    },
})

// upload params for multer
const upload = multer({
    storage:storage,
    limits:{
        filesize:1024*1024*10
    },
})


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './public/img/uploads')
//     },
//     filename:(req, file, cb) => {
//         console.log(file)
//         cb(null, Date.now() + path.extname(file.originalname))
//     }
// })

// const upload = multer({storage: storage}).single('imgSrc')
// upload(err =>{
//     if(err){
//         console.log(err)
//     }
//     else(
//         console.log(req.file)
//     )
// })




router.get('/new', (req, res) => {
    res.render('menu/new', { menuCard: new Menu   })
})

router.get('/index', async(req,res) => {
    const menuItems = await MenuCardDate.find().sort({
        dishprice: 'desc'
    })
    
    res.render('menu/index', { menuItems: menuItems })
})

router.get('/home', (req, res) => {
    res.render('menu/home')
})

router.post('/', upload.single('imgSrc'),  async(req,res, next) => {
    req.menuCard = new Menu()
    next()

}, saveItems('new'))
    
function saveItems(path) {
    return async (req,res) => {
        let menuCard = req.menuCard
        if(req.file){
            menuCard.dishname = req.body.dishname
            menuCard.dishdesc = req.body.dishdesc
            menuCard.dishprice = req.body.dishprice
            menuCard.dishcategory = req.body.dishcategory
            menuCard.img = req.file.filename
        }

        
    
        try {
            menuCard = await menuCard.save()
            res.redirect('menu/new')
        }
        catch (e){
            console.log(e)
            res.render('menu/new', { menuCard: menuCard})
        }
    }
}

module.exports = router