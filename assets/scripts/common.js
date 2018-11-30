/**
 * Created by zhuchen on 2018/3/16.
 */
$(function(){

  $("a").each(function(){
    if($(this).attr('href') != '#') {
      if( !$(this).parent().parent().hasClass('top-nav') ){
        $(this).attr('target','_blank')
      }
    } else {
      $(this).bind('click',function(){
        return false
      })
    }
  })

  var menu_toggle = 0
  $(".mobile-menu-btn").bind('click',function(){
    if(menu_toggle) {
      $(".mobile-top-nav").removeClass('fadeIn')
    } else {
      $(".mobile-top-nav").addClass('fadeIn')
    }

    menu_toggle = !menu_toggle
    return false
  })
  $('.footer').load('./footer.html')
})