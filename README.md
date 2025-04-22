Create HTTP server with an API for practice

Create server using Express
Connect mongo db to our application using mongoose.connect();
Listen to server only after the db is connected
create schema using mongoose.Schema({});
create models using mongoose.model('model name', schema);

use bcrypt package to has the password.
    - bcrypt.hash('password', saltRound);
    - bcrypt.compare(password, hashedpassword)
Authenticate using jwt token from the package jsonwebtoken
    - const jwtToken = jwt.sign({ _id: userRecord._id }, "secret-key", {
          expiresIn: "7d",
        });
        -  res.cookie("token", jwtToken, {
          expiresIn: new Date(Date.now() + 8 * 3600000),
        });
    - const token = req.cookies.token;

      const decodedObj = await jwt.verify(token, "secret-key");
      const { _id } = decodedObj;

      const user = await User.findById(_id);
add validations for schema
    dob: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
            ...}
        }
    }
add schema methods: schema.methods.method_name = function() {}

create separate file for each routes
add index. connectionRequestSchema.index({ from: 1, to: 1 });

add pre function in schema: schema.pre("save", function (next) {});


