/**
 * Created by zhuchen on 2018/2/22.
 */
$(function(){

  function isPC()
  {
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
    }
    return flag;
  }





  var $animateds = $('.animated')
  var scrollTimeout = ''
  var before = $(document).scrollTop();
  var anNum = 0
  $(window).on('scroll',function(){


    if(!isPC()) {
      // $('.animated').removeClass('animated')
      return false
    } else {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(function(){


        var scrollTop = $(document).scrollTop()
        var wh = $(this).height()
        var collections = []
        // console.debug(scrollTop,wh)
        var i = 0
        $animateds.each(function(index){
          if(!$(this).hasClass( $(this).data('effect') ) || 1) {
            var thisOffsetTop = $(this).offset().top
            // console.log(thisOffsetTop)
            if( thisOffsetTop >= scrollTop && thisOffsetTop <= (wh + scrollTop) ) {
              i++
              setTimeout(function(){
                var after = $(document).scrollTop()
                // console.debug('ab',before,after)

                // $(this).addClass($(this).data('effect'))
                $(this).addClass('fadeInUp')

                // if(after >= before) {
                //   $(this).addClass($(this).data('effect'))
                // }else {
                //   $(this).addClass('fadeInDownBig')
                // }



                i--
                if(i<=0) {
                  before = after
                }
                // console.log('jjj:'+i)

              }.bind(this),50*i)

              // $('#index_service_swiper').find('.animated').removeClass('fadeOutLeftBig')


            } else {
              // setTimeout(function(){
              //   $(this).removeClass($(this).data('effect'))
              //   $(this).removeClass('fadeInDownBig')
              // }.bind(this),50*index)
            }
          }

        })







      }.bind(this),100)
    }



  }).trigger('scroll')

  var animeObj = ''

  function anmation(target) {
    return anime({
      targets: target,
      translateY: [{value: 500},{value: 0}],
      // translateX: [{value: '-50%'},{value:'-50%'}],
      opacity: [{value:0},{value:1}],
      duration: function(el, i, l) {
        return 500 + (i * 500);
      },
      easing: 'easeInOutExpo',
      // offset: 200
    })
  }




  var scrollifyInit = function(setHeight) {
    var sinstance = $.scrollify({
      scrollSpeed: 500,
      section : ".page-node",
      setHeights: setHeight,
      // offset : 100,
      easing: "easeInOutExpo",
      scrollbars:true,
      before:function(index,sections) {
        // if(sections[index-1] && animeObj!='') {
        //   animeObj.play()
        //   animeObj.reverse()
        // }
        // animeObj = anmation(sections[index][0].querySelectorAll('.animater'))
        // if(index > 0) {
        //   $('.header').addClass('top-nav-hide')
        // } else {
        //   $('.header').removeClass('top-nav-hide')
        // }
        if(index == 2) {
          setTimeout(function(){
            $('#index_service_swiper').find('.animated').removeClass('animated')
          },2000)

        }
        if(index == 2 || index == 4 || index == 6 || index == 7) {
          $('.top-nav').addClass('top-nav-black-color')
        } else {
          $('.top-nav').removeClass('top-nav-black-color')
        }

        // swiperNews.updateSlides()





      },
      after:function(index,sections) {
        // console.debug('after',index,sections)
      },
      afterResize:function() {
        console.log($.scrollify.currentIndex())
        $.scrollify.instantMove($.scrollify.currentIndex())
      },
      afterRender:function() {

        animeObj = anmation( $('.page-node').first()[0].querySelectorAll('.animater') )
        // setTimeout(function(){
        //
        //   var timelineParameters = anime.timeline({
        //     direction: 'alternate',
        //     loop: true
        //   })
        //   timelineParameters.add({
        //     targets: '.index_1_02',
        //     // opacity: [0,1,0],
        //     // scaleX: [1.01,1,1.01],
        //     filter: ['blur(2px)','blur(0px)','blur(2px)'],
        //     // translateX: [ { value: -1 }, { value: 0 }, { value: 1 } ]
        //   }).add({
        //     targets: '.index_1_03',
        //     // opacity: [0,1,0],
        //     // scaleX: [1.01,1,1.01],
        //     filter: ['blur(0px)','blur(2px)','blur(0px)'],
        //     // translateX: [ { value: 1 }, { value: 0 }, { value: -1 } ]
        //   }).add({
        //     targets: '.index_1_01',
        //
        //     // scaleX: [1.01,1,1.01],
        //     // translateX: [ { value: -1 }, { value: 0 }, { value: 1 } ]
        //   })
        //
        //
        // },2000)
      }
    });
  }


  var swiperNewsInit = function(per){

    var swiperNews = new Swiper('#index_news', {
      autoplay:{
        // stopOnLastSlide:true,
        disableOnInteraction: true
      },
      // autoplay:true,
      loop: true,
      loopedSlides: 6,
      slidesPerView: per,
      spaceBetween: 30,
      // pagination: {
      //   el: '#index_news .swiper-pagination',
      //   clickable: true,
      // },
      on: {
        init:function(swiper){
          // var slide=this.slides.eq(0);
          // slide.addClass('ani-slide');

        },
        transitionStart: function(){
          $('#index_news').find('.section06-item').removeClass('selected')
        },
        transitionEnd: function(){
          $('#index_news').find('.section06-item').removeClass('selected')
          console.log(this.activeIndex)
          if(per == 3) {
            var slide=this.slides.eq(this.activeIndex+1);
          } else {
            var slide=this.slides.eq(this.activeIndex);
          }
          // console.log(slide)
          var item = $(slide.find('.section06-item'))
          // console.log(item)
          if(item.length > 1) {
            item.first().addClass('selected')
          } else {
            item.addClass('selected')
          }
          // slide.find('.section06-item').addClass('selected')
        },
        slideChangeTransitionEnd:function(){
          // $(window).trigger('scroll')
          // $(window).trigger('resize')
        }
      }
    })

    $(".section06-item-rightbtn").off('click').bind('click',function(){
      swiperNews.slideNext()
      return false
    })

    return swiperNews

  }

  var newSlide = ''

  $(window).bind('resize',function(){
    $("#index_service_swiper").width( $(window).width() )

    $("#index_news").width( $(window).width() )
    $("#index_jy").width( $(window).width() )

    if(!isPC()) {
      $("#index_history").width( $(window).width() - 40 )
    }



    if( $(this).width() < 1000 ) {

      $.scrollify.destroy()
      // scrollifyInit(false)
      // $.scrollify.destroy()
      // if(newSlide != '') {
      //   newSlide.destroy(false)
      // }

      

    } else {
      scrollifyInit(true)

      

    }

    if(!isPC()) {
      newSlide = swiperNewsInit(1)
      
    } else {
      newSlide = swiperNewsInit(3)
    }


  }).trigger('resize')
  // $("#index_service_swiper").width( $(window).width() )

  var indexPartnerSwiper = new Swiper('#swiper_partner', {
    loop: true,
    autoplay:true,
    // slidesPerView: 4,
    // slidesPerColumn: 3,
    // spaceBetween: 30,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    on: {
      slideChange: function(){
        console.log(this.activeIndex)
        var arr = ['机械','加盟','金融','数据','媒体','机械']
        $("#swiper_partner_category").html(arr[this.activeIndex-1])
      },
    }

  });



  // swiperNewsInit(3)





  // $("#index_history").width( $("#index_history").parent().outerWidth() )

  var swiperHistory = new Swiper('#index_history', {
    autoplay:true,
    loop: false,
    // freeMode: false,
    slidesPerView: 4,
    // spaceBetween: 0,
    // pagination: {
    //   el: '#index_history .swiper-pagination',
    //   clickable: true,
    // },
    on: {
      init:function(swiper){
        // var slide=this.slides.eq(0);
        // slide.addClass('ani-slide');

      },
      transitionStart: function(){
        // $('#index_news').find('.section06-item').removeClass('selected')
      },
      transitionEnd: function(){
        // console.debug('oo',this.activeIndex)
        // var slide=this.slides.eq(this.activeIndex+1);
        // console.log(slide)
        // slide.find('.section06-item').addClass('selected')
      },
      slideChangeTransitionEnd:function(){
        // $(window).trigger('scroll')
        // $(window).trigger('resize')
      }
    }
  });





  var indexServiceSwiper = new Swiper('#index_service_swiper', {
    loop: true,
    pagination: {
      el: '#index_service_swiper .swiper-pagination',
      clickable: true,
    },
    on: {
      init:function(swiper){
        slide=this.slides.eq(0);
        slide.addClass('ani-slide');
      },
      transitionStart: function(){
        if($(window).width() > 992) {
          $(".index-b3 h3").removeClass('fadeIn fadeInUpBig')
        }



        // for(i=0;i<this.slides.length;i++){
        //   var slide=this.slides.eq(i);
        //   slide.find('.animated').removeClass('fadeInUp fadeInRightBig fadeOutLeftBig fadeInUpBig')
        //   slide.find('.animated').addClass('fadeOutLeftBig')
        //
        // }

      },
      transitionEnd: function(){

        // this.slides.eq(this.activeIndex-1).find('.animated').removeClass('fadeInUp fadeInRightBig fadeInUpBig')



        // slide1=this.slides.eq(this.activeIndex);
        // slide1.find('.animated').each(function(index){
        //   var that = this;
        //   setTimeout(function(){
        //     $(that).removeClass('fadeOutLeftBig').addClass('fadeInRightBig')
        //   },index*100)
        // })




        if($(window).width() > 992) {
          $(".index-b3 h3").addClass('fadeIn')
        }

      },
      slideChangeTransitionEnd:function(){
        // $(window).trigger('scroll')
        // $(window).trigger('resize')
      }
    }
  });




  var indexJy = new Swiper('#index_jy', {
    loop: true,
    pagination: {
      el: '#index_jy .swiper-pagination',
      clickable: true,
    },
    on: {
      init:function(swiper){
        slide=this.slides.eq(0);
        slide.addClass('ani-slide');
      },
      transitionStart: function(){
        // $(".index-b7 h3").removeClass('fadeIn fadeInUpBig')

        $('#index_jy').removeClass('fadeInRightBig fadeInUpBig')
      },
      transitionEnd: function(){

        for(i=0;i<this.slides.length;i++){
          slide=this.slides.eq(i);
          if(i == this.activeIndex) {

            slide1=this.slides.eq(this.activeIndex);
            slide1.find('.animated').each(function(index){
              var that = this;
              setTimeout(function(){
                // $(that).addClass('fadeInRightBig')
                $(that).css({opacity:1})
              },index*100)
            })

          } else {
            slide.find('.animated').removeClass('fadeInRightBig fadeInUpBig')

          }

        }

        // $(".index-b7 h3").addClass('fadeIn')

      },
      slideChangeTransitionEnd:function(){
        // $(window).trigger('scroll')
        // $(window).trigger('resize')
      }
    }
  });



  $(".index-b3 .index-b3-nav").bind('click',function(){
    indexServiceSwiper.slideNext();
    return false
  })
  $(".index-b7 .index-b3-nav").bind('click',function(){
    indexJy.slideNext();
    return false
  })





  $(".layout-center").wrapInner($('<div class="layout-center-inner"></div>'))



  // var $serviceCategoryContent = $(".section-service-content .row")
  // $(".service-category a").each(function(index){
  //   $(this).bind('click',function(){
  //     $(".service-category a").removeClass('current')
  //     $(this).addClass('current')
  //     $serviceCategoryContent.hide().removeClass('current');
  //     $serviceCategoryContent.eq(index).css({'display':'flex'}).addClass('current')
  //     $(window).trigger('scroll')
  //     return false
  //   })
  //
  // }).first().trigger('click')





  var $serviceCaseTab = $(".section-service-content .row")
  $(".service-case-tab a").each(function(index){
    $(this).bind('mouseenter',function(){
      $(".service-case-tab a").removeClass('current')
      $(this).addClass('current')
      $serviceCaseTab.css({'display':'none'}).removeClass('current');
      $serviceCaseTab.eq(index).css({'display':'flex'}).addClass('current')
      $(window).trigger('scroll')
      return false
    })

  }).first().trigger('mouseenter')



  var current_index = 0
  var $serviceCategoryContent = $(".about-content .about-content-item")
  $(".about-cateogry a").each(function(index){
    $(this).bind('mouseenter',function(){
      current_index = index
      $(".about-cateogry a").removeClass('current')
      $(this).addClass('current')
      $serviceCategoryContent.css({'display':'none'}).removeClass('current');
      $serviceCategoryContent.eq(index).css({'display':'block'}).addClass('current')
      $serviceCategoryContent.eq(index).find('h5 span').text(0).each(function(index){

        setTimeout(function(){

          var step = $(this).data('step')
          var num = $(this).data('num')
          var init = {
            number: num,
          }
          if((typeof step !='undefined')) {
            init.numberStep = $.animateNumber.numberStepFactories.separator(',')
          }
          if((num.toString()).indexOf(".") != -1) {
            var decimal_places = 1;
            var decimal_factor = decimal_places === 0 ? 1 : Math.pow(10, decimal_places);
            init.numberStep = function(now, tween) {
              var floored_number = Math.floor(now) / decimal_factor,
                target = $(tween.elem);

              if (decimal_places > 0) {
                // force decimal places even if they are 0
                floored_number = floored_number.toFixed(decimal_places);

                // replace '.' separator with ','
                // floored_number = floored_number.toString().replace('.', ',');
              }

              target.text(floored_number);
            }
            init.number=  num * decimal_factor

          }
          $(this).animateNumber(
            init
          );

        }.bind(this),1200)




      })
      $(window).trigger('scroll')
      return false
    })

  }).first().trigger('mouseenter')

  $(".section-about-nav").bind('click',function(){
    if(current_index == 2) {
      $(".about-cateogry a").eq(0).trigger('mouseenter')
    } else {
      $(".about-cateogry a").eq(current_index+1).trigger('mouseenter')
    }
    return false
  })




  $(".point").each(function(index){
    $(this).bind('mouseenter',function(){
      $(".index-contact-detail .contact").removeClass('cshow')
      $(".index-contact-detail .contact").eq(index).addClass('cshow')
    })
  })


})