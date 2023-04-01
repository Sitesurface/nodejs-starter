// let email = require("some-email-lib"),
//   User = require("../models/user-model.js");

// module.exports = function (agenda) {
//   agenda.define("registration email", async (job) => {
//     const user = await User.get(job.attrs.data.userId);
//     await email(
//       user.email(),
//       "Thanks for registering",
//       "Thanks for registering " + user.name()
//     );
//   });

//   agenda.define("reset password", async (job) => {
//     // Etc
//   });

//   // More email related jobs
// };
