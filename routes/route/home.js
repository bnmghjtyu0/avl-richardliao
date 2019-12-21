const express = require("express");
const router = express.Router();
const Home = require("../../api/models/Home");
const mongoose = require("mongoose");

// 新增
router.post("/", (req, res, next) => {
  const home = new Home({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title
  });

  home
    .save()
    .then(result => {
      console.log(result);
    })
    .catch(err => console.log(err));

  res.status(200).json({
    retCode: 1,
    retMsg: "新增成功",
    retData: []
  });
});

// 查詢
router.get("/", function(req, res, next) {
  Home.find()
    .exec()
    .then(docs => {
      res.status(200).json({
        retCode: 1,
        retMsg: "成功",
        retData: docs
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// 修改
router.patch("/:id", (req, res, next) => {
  const id = req.params.id;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Home.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(doc => {
      //   res.status(200).json(doc);
      res.status(200).json({
        retCode: 1,
        retMsg: "更新成功"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});
module.exports = router;
