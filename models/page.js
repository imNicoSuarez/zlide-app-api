module.exports = function(mongoose){
  var Schema = mongoose.Schema,
      ObjectId = mongoose.Schema.Types.ObjectId;

  var pageSchema = new Schema({
    name: String,
    comment: String,
    presentation_id: { type: Schema.Types.ObjectId, ref: 'Presentation' },
    created_at: { type: Date, default: Date.now },
    body: String,
    step: Number
  });

  var Page = mongoose.model('Page', pageSchema);

  function getPages(filter, resultsCallback){
    filter =  filter || {};

    Page.find(filter, function(err, result){
      if (resultsCallback && typeof(resultsCallback === "function")) {
        resultsCallback(err, result);
      }
    });
  }

  function getPage(_id, resultsCallback){
    Page.findById(_id, function(err, result){
      if (resultsCallback && typeof(resultsCallback === "function")) {
        resultsCallback(err, result);
      }
    });
  }

  function create(attrs, resultsCallback){
    var page = new Page(attrs);

    page.save(function(err) {
      if (err) return resultsCallback(err, null);

      getPage(page, resultsCallback);
    });
  }

  function update(_id, attrs, options, resultsCallback){
    Page.findByIdAndUpdate(_id, attrs, options, resultsCallback)
  }

  function destroy(_id, options, resultsCallback){
    Page.findByIdAndRemove(_id, options, resultsCallback)
  }

  var methods = {
    getPage: getPage,
    getPages: getPages,
    create: create,
    update: update,
    destroy: destroy
  }

  return methods;
}