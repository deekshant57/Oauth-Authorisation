const mongoose = require("mongoose");

// module.exports = () => {
//   return mongoose.connect(
//     "mongodb://127.0.0.1:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
//   );
// };

module.exports = () => {
  return mongoose.connect(
    "mongodb+srv://deekshant57:deekshant_123@practice.9w926.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
};
