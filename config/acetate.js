module.exports = function (acetate) {
  acetate.layout('**.*', '_layout:body');

  acetate.helper('link', function(context, url, text) {
    console.log(context.url, url);
    // context is the current local variables on the page
    var className = context.url === url ? 'active' : 'inactive';

    // build a relative url to the page we are
    // linking to using the relativeUrl variable
    var relativeUrl = url;

    // Nunjucks template for the link
    var template = '<a href="{{relativeUrl}}" class="{{className}}">{{text}}</a>';

    // finally render the nunjucks string with the variables
    return acetate.nunjucks.renderString(template, {
      relativeUrl: relativeUrl,
      className: className,
      text: text
    });
  });
};
