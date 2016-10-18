(function(){

  var titles = [];

  $.fn.tabIt = function(options) {
    options = $.extend($.fn.defaults, options)

    return this.each(function(){
      var tabs = $(this);

      tabs.find(".title").each(function(){
        titles.push({
          text: $(this).html(),
          target: $(this).parents('.container').attr('id')
        })
        $(this).remove()
      })

      tabs.find(".container").css('clear', 'both').hide()
      tabs.find(".container:first-child").show()

      tabs.prepend("<ul id='headings'></ul>")

      titles.forEach(function(item){
        tabs.find("#headings").append(`<li><a href="#${item.target}">${item.text}</a></li>`)
      })

      if (options.position === 'right') { 
        tabs.find('#headings').css('float','right')
      }

      tabs.find("#headings").on('click', 'li a', function(e){
        e.preventDefault()
        var target = $(this).attr('href')
        $(".container").hide()
        $(target).show()
      })
    })
  }

  $.fn.tabIt.defaults = {
    position: 'left'
  }

}())