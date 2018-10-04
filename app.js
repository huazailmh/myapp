var fs = require('fs');

var bodyParser = require("body-parser");

const express = require('express')
const app = express()

app.use(bodyParser.json());

app.use(express.static('public'))

app.use("/lib", express.static('lib'))
app.use("/js", express.static('js'))
app.use("/styles", express.static('styles'))

app.get('/', (req, res) => res.send('Hello World!'))

app.get("/reports", function(req, res) {
    var reportList = [{reportId: "R001"}, {reportId: "R002"}, {reportId: "R003"}, {reportId: "R004"}, {reportId: "R005"}];
    res.send(reportList);
});


app.get("/reports/r001", function(req, res) {
    var contents = fs.readFileSync('reporting_system2.xlsx');
    //console.log(contents);
    var reportData = {};
    reportData.reportId = "r001";
    reportData.reportDataSet = {"dsContent": { "expense": 200, "income": 710, "profit": 510, "comments": "haha good"}, "dsAdjustContent": {}};
    reportData.reportTemplate = Buffer.from(contents).toString("base64");
    res.send(reportData);
});

app.post("/reports/r001/adjustment", function(req, res) {
    console.log("req: " + req);
    res.send("adjustment OK");
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))