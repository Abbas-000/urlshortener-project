var Site = require("../model/sites");
var express = require("express");
var dns = require("dns");
var router = express.Router();
var randomNumGen = require("../function/randomNumGen");

router.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


router.post("/api/shorturl/new", function (req, res) {
  var recURL = req.body.url;
  var tempURL = recURL.slice(recURL.indexOf(".")+1);
  var testURL = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/.test(recURL);
  if (testURL) {
    dns.lookup(tempURL, (err, address, family) => {
      if (err) return res.json({"error": "invalid hostname"});
      console.log(address, family);
      var randomCode = randomNumGen();
      var site = new Site({
        original_url: recURL,
        short_url: randomCode
      });
      site.save(function(e, site) {
        if (e) {
          console.error(e);
        }
        Site.findOne({"original_url": recURL}, (err, result) => {
          if (err) {
            console.err(err);
          }
          res.json({original_url: result.original_url, short_url: result.short_url})
        });
      });
    });
  } else {
    return res.json({"error": "invalid URL"});
  }
});

router.get("/api/shorturl/:num", function(req,res) {
  var findNum = req.params.num;
  Site.findOne({"short_url": findNum}, (err, result) => {
    if (err) {
      return res.json({"error": "wrong format"});
    }
    res.redirect(result.original_url);
  })
});


module.exports = router;
