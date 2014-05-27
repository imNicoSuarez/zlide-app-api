module.exports = function(mongoose){
  var Schema = mongoose.Schema,
      ObjectId = mongoose.Schema.Types.ObjectId;

  var squareSchema = new Schema({
    position_x:  Number,
    position_y: Number,
    color:   String,
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    action: String,
    created_at: { type: Date, default: Date.now }
  });

  squareSchema.pre("save",function(next, done) {
    var self = this;
    var condition = {position_x : self.position_x, position_y: self.position_y}
    mongoose.models["Square"].findOne(condition, function(err, results) {
      if(err) {
        next(err);
      } else if(results) {
        var message = "This square is already registered";
        self.invalidate("Square", message);
        next(new Error(message));
      } else {
        next();
      }
    });

  });

  var Square = mongoose.model('Square', squareSchema);

  function getSquares(filter, resultsCallback){
    filter =  filter || {};

    Square.find(filter, function(err, result){
      if (resultsCallback && typeof(resultsCallback === "function")) {
        resultsCallback(err, result);
      }
    });
  }

  function getSquare(_id, resultsCallback){
    Square.findById(_id, function(err, result){
      if (resultsCallback && typeof(resultsCallback === "function")) {
        resultsCallback(err, result);
      }
    });
  }

  function create(attrs, resultsCallback){
    var square = new Square(attrs);

    square.save(function(err) {
      if (err) return resultsCallback(err, null);

      getSquare(square, resultsCallback);
    });
  }

  function update(_id, attrs, options, resultsCallback){
    Square.findByIdAndUpdate(_id, attrs, options, resultsCallback)
  }

  function destroy(_id, options, resultsCallback){
    Square.findByIdAndRemove(_id, options, resultsCallback)
  }

  function destroyAll(ids, options, resultsCallback){
    options._ids = ids;
    Square.remove(options, function(err) {
      if (err) return resultsCallback(err, null);
      var results = 'Deleted: ' + ids.length + ' squares';
      resultsCallback(err, results);
    });
  }

  var methods = {
    getSquares: getSquares,
    getSquare: getSquare,
    create: create,
    update: update,
    destroy: destroy,
    destroyAll: destroyAll
  }

  return methods;
}