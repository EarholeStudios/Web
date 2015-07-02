module.exports = function (acetate) {
  acetate.layout('**.*', '_layout:body');

  acetate.helper('active_link', function (context, path) {
    var current = context.url.replace('/', '')
    ,   link    = path.replace('/', '');

    if (current === link) return 'active';
    return 'inactive';
  });
};
