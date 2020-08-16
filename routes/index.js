const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  // res.send({ response: "I am alive" }).status(200);
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});
// app.use(express.static(path.join(__dirname, 'client/build')));
// Handle React routing, return all requests to React app
// app.get('*', function(req, res) {
//     res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
// });
module.exports = router;