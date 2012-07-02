/* PyPI Latest package version script
 *
 * Greg Jurman
 *
 * Changelog:
 *
 * 02-08-2012 - Initial write
 */

!function($) {
  "use strict"; // JS Hint ;_;

  /* PYPI PUBLIC CLASS DEFINITION
   * ============================= */

  var PyPI = function(element, options) {
    this.init(element)
  }


  PyPI.prototype = {
    constructor : PyPI

    , init : function(element) {
      this.$element = $(element)

      this.update()
    }
    , update : function() {
      var package_name = this.$element.data('pypiPackage')
      , $e = this.$element

      $.getJSON("http://pypi.python.org/pypi/"+package_name+"/json", 
                function(data) {
                  var version_num = data.info.version
                  $e.append('<span class="badge">'+version_num+'</span>')
                })
    },
  }


  /* PYPI PLUGIN DEFINITON
   ======================= */
  $.fn.pypi = function(option) {
    return this.each(function () {
      var $this = $(this)
      , data = $this.data('pypi')
      if (!data) $this.data('pypi', (data = new PyPI(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }


  $.fn.pypi.Constructor = PyPI

  /* Setup each pypi object */

  $(function() {
    $(".pypi").each(function(e) {
      var $pypi = $(this)
      $pypi.pypi($pypi.data())

    })
  })

 }(window.jQuery);
