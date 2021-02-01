$(document).ready(
  
 function() {
  function inst_api () {
    var api = 'https://www.instagram.com/hm_son7/?__a=1';
    $.getJSON(
     api,
      function (data) {
        var src = data.graphql.user.edge_owner_to_timeline_media.edges;
        for(var imgs in src) {
          var display = src[imgs].node.display_url;
          var img_src = src[imgs].node.thumbnail_resources[2].src;
          var img = '<img src="'+ img_src +'" alt="">'
          $(".slider").slick("slickAdd", '<a href='+ display +'><div>'+ img +'</div></a>');
        }
      }
    )
  };
    
  inst_api (); 
    
   function slick () {
     $('.slider').slick({
       dots: true,
       infinite: true,
       speed: 500,
       slidesToShow: 6,
       slidesToScroll: 6,
       responsive: [
     {
      breakpoint: 1600,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 960,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 400,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    },
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
     });
   };
   slick ();
 
})