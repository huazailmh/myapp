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
    var contents = fs.readFileSync('report_template.xlsx');
    //console.log(contents);
    var reportData = {};
    reportData.reportId = "r001";
    reportData.reportDataSet = {"dsContent": { "expense": 200, "income": 710, "profit": 510, "comments": "haha good"}, "dsAdjustContent": {}};
    reportData.reportTemplate = Buffer.from(contents).toString("base64");
    res.send(reportData);
});

app.get("/reports/r002", function(req, res) {
    var contents = fs.readFileSync('report_template002.xlsx');
    //console.log(contents);
    var reportData = {};
    reportData.reportId = "r002";
    reportData.reportDataSet = {"dsContent": { "expense": 200, "income": 710, "profit": 510, "comments": "haha good"}, "dsAdjustContent": {}};
    reportData.reportTemplate = Buffer.from(contents).toString("base64");
    res.send(reportData);
});

app.post("/reports/:reportId/adjustment", function(req, res) {
    console.log("req: " + req);
    console.log("req body: " + JSON.stringify(req.body));
    res.send("adjustment OK");
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))