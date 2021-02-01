function inst_api (uid) {
  var api = 'https://www.instagram.com/'+uid+'/?__a=1';
  $(".wrapper").remove()
  $("center").append("<div class='wrapper'><div class='slider'></div></div>");
  $.getJSON(api,
    function (data) {
      var src = data["graphql"]["user"]["edge_owner_to_timeline_media"]["edges"];
      for(var imgs in src) {
        var display = src[imgs]["node"]["display_url"];
        var img_src = src[imgs]["node"]["thumbnail_resources"][2]["src"];
        $(".slider").slick("slickAdd", '<img src="'+ display +'" alt="">');
      }
    }
  )
};
var withoutResponsive = {dots:true,infinite:true,speed:500,slidesToShow:1,slidesToScroll:1};
function slick () {$('.slider').slick(withoutResponsive);};
// inst_api ("erramlisabrina");
// slick ();
var dataSlick ={dots:true,infinite:true,speed:500,slidesToShow:6,slidesToScroll:6
          ,responsive:[{breakpoint:1600,settings:{slidesToShow:5,slidesToScroll:5,infinite:true,dots:true}}
                      ,{breakpoint:1280,settings:{slidesToShow:4,slidesToScroll:4,infinite:true,dots:true}}
                       ,{breakpoint:960,settings:{slidesToShow:3,slidesToScroll:3,infinite:true,dots:true}}
                       ,{breakpoint:640,settings:{slidesToShow:2,slidesToScroll:2}}
                       ,{breakpoint:400,settings:{slidesToShow:1,slidesToScroll:1}}]};