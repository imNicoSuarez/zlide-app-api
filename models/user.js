module.exports = function(mongoose){
  var Schema = mongoose.Schema,
      ObjectId = mongoose.Schema.Types.ObjectId;

  var userSchema = new Schema({
    name:  String,
    first_name: String,
    last_name:   String,
    email: { type: String, index: { unique: true, dropDups: true } },
    created_at: { type: Date, default: Date.now },
    access_tokens: String,
    fb_id: { type: String, index: { unique: true, dropDups: true } },
    google_id: { type: String, index: { unique: true, dropDups: true } },
    gender: String,
    provider: String
  });

  var User = mongoose.model('User', userSchema);

  function getUsers(filter, resultsCallback){
    filter =  filter || {};

    User.find(filter, function(err, result){
      if (resultsCallback && typeof(resultsCallback === "function")) {
        resultsCallback(err, result);
      }
    });
  }

  function getUser(_id, resultsCallback){
    User.findById(_id, function(err, result){
      if (resultsCallback && typeof(resultsCallback === "function")) {
        resultsCallback(err, result);
      }
    });
  }

  function create(attrs, resultsCallback){
    var user = new User(attrs);

    user.save(function(err) {
      if (err) return resultsCallback(err, null);

      getUser(user, resultsCallback);
    });
  }

  function update(_id, attrs, resultsCallback){
    User.findByIdAndUpdate(_id, attrs, resultsCallback)
  }

  function destroy(_id, resultsCallback){
    User.findByIdAndRemove(_id, resultsCallback)
  }

  var methods = {
    getUser: getUser,
    getUsers: getUsers,
    create: create,
    update: update,
    destroy: destroy
  }

  return methods;
}