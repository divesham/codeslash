var express = require("express");

var app = express();

var request = require("request");

app.set("view engine", "ejs");
// =====route==========
// ==search==

app.get("/", async function(req, res) {
  res.render("search");
});
app.get("/chartall/:id", function(req, res) {
  var handle = req.params.id;
  let url = "https://codeforces.com/api/user.status?handle=" + handle;
  request(url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);

      var levels = [
        "CORRECT ANSWER",
        "WRONG_ANSWER",
        "TIME_LIMIT_EXCEEDED",
        "COMPILATION_ERROR",
        "MEMORY_LIMIT_EXCEEDED",
        "SKIPPED",
        "RUNTIME_ERROR"
      ];
      var values = [0, 0, 0, 0, 0, 0, 0];
      data["result"].forEach(function(val) {
        if (val.verdict == "OK") values[0]++;
        else if (val.verdict == "WRONG_ANSWER") values[1]++;
        else if (val.verdict == "TIME_LIMIT_EXCEEDED") values[2]++;
        else if (val.verdict == "COMPILATION_ERROR") values[3]++;
        else if (val.verdict == "MEMORY_LIMIT_EXCEEDED") values[4]++;
        else if (val.verdict == "SKIPPED") values[5]++;
        else values[6]++;
      });
      var date = new Array();
      var submission = new Array();
      data.result.forEach(function(dat) {
        var theDate = new Date(dat.creationTimeSeconds * 1000);
        dateString = theDate.toUTCString();
        var dd = new Date(dateString);
        date.push(dd);
        //console.log(date,",");
      });

      //=====================================

      var arr = new Array(date), // fill it with array with your data
        results = {},
        rarr = [],
        i,
        datea;
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
      for (i = 0; i < date.length; i++) {
        // get the date
        datea = [monthNames[date[i].getMonth()], date[i].getFullYear()].join(
          "-"
        );
        results[datea] = results[datea] || 0;
        results[datea]++;
        console.log(date[i].getMonth(), date[i].getFullYear());
      }

      // you can always convert it into an array of objects, if you must
      var dd1 = [];
      var va = [];
      for (i in results) {
        if (results.hasOwnProperty(i)) {
          dd1.push(i);
          va.push(results[i]);
          rarr.push({ datea: i, counts: results[i] });
          //console.log("h ",i,results[i]);
        }
      }
      dd1.reverse();
      va.reverse();
      res.render("chartall.ejs", {
        levels: levels,
        values: values,
        dd1: dd1,
        va: va
      });
      // res.send(body);
      //   res.send(results["result"][0]); // add  ["verdict"] to find status of questions
    }
  });
});

// app.get("/chart/:id", function(req, res) {
// var handle = req.params.id;
// let url = "https://codeforces.com/api/user.status?handle=" + handle;
// request(url, function(error, response, body) {
//   if (!error && response.statusCode == 200) {
//     var data = JSON.parse(body);

//     var levels = [
//       "OK",
//       "WRONG_ANSWER",
//       "TIME_LIMIT_EXCEEDED",
//       "COMPILATION_ERROR",
//       "MEMORY_LIMIT_EXCEEDED",
//       "SKIPPED",
//       "RUNTIME_ERROR"
//     ];
//     var values = [0, 0, 0, 0, 0, 0, 0];
//     data["result"].forEach(function(val) {
//       if (val.verdict == "OK") values[0]++;
//       else if (val.verdict == "WRONG_ANSWER") values[1]++;
//       else if (val.verdict == "TIME_LIMIT_EXCEEDED") values[2]++;
//       else if (val.verdict == "COMPILATION_ERROR") values[3]++;
//       else if (val.verdict == "MEMORY_LIMIT_EXCEEDED") values[4]++;
//       else if (val.verdict == "SKIPPED") values[5]++;
//       else values[6]++;
//     });
//     res.render("chart.ejs", { levels: levels, values: values });
//     // res.send(body);
//     //   res.send(results["result"][0]); // add  ["verdict"] to find status of questions
//   }
// });
// });

//++++++++++++++++++++++++++++ this is another chart
// app.get("/chartid/:id", function(req, res) {
//   var handle = req.params.id;
//   var obj = {};
//   let url = "https://codeforces.com/api/user.status?handle=" + handle;
//   request(url, function(error, response, body) {
//     if (!error && response.statusCode == 200) {
//       var data = JSON.parse(body);

//       // var date = new Array();
//       // var submission = new Array();
//       // data.result.forEach(function(dat) {
//       //   var theDate = new Date(dat.creationTimeSeconds * 1000);
//       //   dateString = theDate.toUTCString();
//       //   var dd = new Date(dateString);
//       //   date.push(dd);
//       //   //console.log(date,",");
//       // });

//       // //=====================================

//       // var arr = new Array(date), // fill it with array with your data
//       //   results = {},
//       //   rarr = [],
//       //   i,
//       //   datea;
//       // const monthNames = [
//       //   "Jan",
//       //   "Feb",
//       //   "Mar",
//       //   "Apr",
//       //   "May",
//       //   "Jun",
//       //   "Jul",
//       //   "Aug",
//       //   "Sep",
//       //   "Oct",
//       //   "Nov",
//       //   "Dec"
//       // ];
//       // for (i = 0; i < date.length; i++) {
//       //   // get the date
//       //   datea = [monthNames[date[i].getMonth()], date[i].getFullYear()].join(
//       //     "-"
//       //   );
//       //   results[datea] = results[datea] || 0;
//       //   results[datea]++;
//       //   console.log(date[i].getMonth(), date[i].getFullYear());
//       // }

//       // // you can always convert it into an array of objects, if you must
//       // var dd1 = [];
//       // var va = [];
//       // for (i in results) {
//       //   if (results.hasOwnProperty(i)) {
//       //     dd1.push(i);
//       //     va.push(results[i]);
//       //     rarr.push({ datea: i, counts: results[i] });
//       //     //console.log("h ",i,results[i]);
//       //   }
//       // }
//       // dd1.reverse();
//       // va.reverse();
//       // res.render("chartid.ejs", { dd1: dd1, va: va });
//       //   res.send("correct");
//     }
//   });
// });

//==search==

app.get("/results", function(req, res) {
  let handle = req.query.cf_handle;
  let url = "https://codeforces.com/api/user.status?handle=" + handle;
  request(url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      res.render("results", { data: data });
      // res.send(body);
      //   res.send(results["result"][0]); // add  ["verdict"] to find status of questions
    }
  });
});

// ============route============
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is runninng on port: ${port}`);
});
