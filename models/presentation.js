module.exports = function(mongoose){
  var Schema = mongoose.Schema,
      ObjectId = mongoose.Schema.Types.ObjectId;

  var presentationSchema = new Schema({
    name:  String,
    url_name: { type: String, index: { unique: true, dropDups: true }},
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    created_at: { type: Date, default: Date.now },
    publish: Boolean
  });

  var Presentation = mongoose.model('Presentation', presentationSchema);

  function getPresentations(filter, resultsCallback){
    filter =  filter || {};

    Presentation.find(filter, function(err, result){
      if (resultsCallback && typeof(resultsCallback === "function")) {
        resultsCallback(err, result);
      }
    });
  }

  function getPresentation(_id, resultsCallback){
    Presentation.findById(_id, function(err, result){
      if (resultsCallback && typeof(resultsCallback === "function")) {
        resultsCallback(err, result);
      }
    });
  }

  function create(attrs, resultsCallback){
    var presentation = new Presentation(attrs);

    presentation.save(function(err) {
      if (err) return resultsCallback(err, null);

      getPresentation(presentation, resultsCallback);
    });
  }

  function update(_id, attrs, options, resultsCallback){
    Presentation.findByIdAndUpdate(_id, attrs, options, resultsCallback)
  }

  function destroy(_id, options, resultsCallback){
    Presentation.findByIdAndRemove(_id, options, resultsCallback)
  }

  var methods = {
    getPresentation: getPresentation,
    getPresentations: getPresentations,
    create: create,
    update: update,
    destroy: destroy
  }

  return methods;
}