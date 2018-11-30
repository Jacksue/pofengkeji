/**
 * Created by zhuchen on 2018/3/16.
 */
$(function(){
  $(window).scroll(function(){
    if( $(document).scrollTop() > 50 ) {
      $('.fixed-top').addClass('add-bg')
    } else {
      $('.fixed-top').removeClass('add-bg')
    }

  })
})