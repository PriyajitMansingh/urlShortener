const express=require("express")
const { handleGenerateShortUrl }=require("../controllers/url")
const router = require("express").Router();


router.post("/",handleGenerateShortUrl)

module.exports = router;