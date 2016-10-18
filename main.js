
$(document).ready(function() {
  //NEWS API 
  $.get("https://json-data.herokuapp.com/restaurant/news/1",function(news) {
    console.log(news)
    var newsContent = `
          <div id="newsTitle"><p>${news.title}</p></div>
        <div id="news_datePublished">${news.date_published}</div>
        <div id="newsStory">${news.post}</div>
    `
    $("#news").html(newsContent)

  })


  //SPECIALS MENU API
  var b = $.get("https://json-data.herokuapp.com/restaurant/special/1", function(specials) {
    console.log('specials', specials)
    var specials = `
      #${specials.id}. ${specials.menu_item_id}................price
    `
    $(".specialsMenu").html(specials)
  })


  //ENTRES, APPETIZERS, ALA CARTE MENU ITEMS API
  var menuString = ""
  var entreeMenuString = ""
  var alaCarteMenuString = ""


  $.get("https://json-data.herokuapp.com/restaurant/menu/1", function(menuTypes) {
    console.log('test', menuTypes)
    menuTypes.appetizers.forEach(function(menuItems) {
      console.log(menuItems)
      menuString +=
        `
          <div class="menuItem">
          <div class="firstLineMenu">
            <div class="menuTitle">${menuItems.item}</div>
              <div class="dots"></div>
              <div class="price">$${menuItems.price}</div>
          </div>
          <div class="secondLineMenu">
            <div class="menuDescription">${menuItems.description}</div>
            <div class="menuSymbols">
              <div class="menuAllergies">${menuItems.allergies ? '<i class="fa fa-exclamation-triangle" aria-hidden="true"></i>' : ""}</div>
              <div class="menuFavorite">${menuItems.favorite ? '<i class="fa fa-star" aria-hidden="true"></i>' : ""}</div>
              <div class="menuSpicy">${menuItems.spicy ? '<i class="fa fa-fire" aria-hidden="true">' : ""}</i></div>
              <div class="menuVegan">${menuItems.vegan ? '<img src="https://maxcdn.icons8.com/iOS7/PNG/25/Food/vegan_food_filled-25.png" title="Vegan Food Filled" width="25">' : ""}</div>
            </div>
          </div>
          </div>      
        `
      })

    menuTypes.entrees.forEach(function(menuItems) {
      entreeMenuString +=
        `
          <div class="menuItem">
          <div class="firstLineMenu">
            <div class="menuTitle">${menuItems.item}</div>
              <div class="dots"></div>
              <div class="price">$${menuItems.price}</div>
          </div>
          <div class="secondLineMenu">
            <div class="menuDescription">${menuItems.description}</div>
            <div class="menuSymbols">
              <div class="menuAllergies">${menuItems.allergies ? '<i class="fa fa-exclamation-triangle" aria-hidden="true"></i>' : ""}</div>
              <div class="menuFavorite">${menuItems.favorite ? '<i class="fa fa-star" aria-hidden="true"></i>' : ""}</div>
              <div class="menuSpicy">${menuItems.spicy ? '<i class="fa fa-fire" aria-hidden="true">' : ""}</i></div>
              <div class="menuVegan">${menuItems.vegan ? '<img src="https://maxcdn.icons8.com/iOS7/PNG/25/Food/vegan_food_filled-25.png" title="Vegan Food Filled" width="25">' : ""}</div>
            </div>
          </div>
          </div>      
        `
      })

    menuTypes.sides.forEach(function(menuItems) {
      alaCarteMenuString +=
        `
          <div class="menuItem">
          <div class="firstLineMenu">
            <div class="menuTitle">${menuItems.item}</div>
              <div class="dots"></div>
              <div class="price">$${menuItems.price}</div>
          </div>
          <div class="secondLineMenu">
            <div class="menuDescription">${menuItems.description}</div>
          </div>
          </div>      
        `
      })    

      $("#appetizersPlacement").html(menuString)
      $("#entreePlacement").html(entreeMenuString) 
      $("#sidesPlacement").html(alaCarteMenuString) 
  })



  var carouselImages = [
    {
      image_url: "http://cdn2.viceroyhotelgroup.com/~/media//viceroy_hotels_and_resorts/santamonica/Images/Large-1280x720/vsm-night-event-1280x720.ashx",
    },
    {
      image_url: "http://www.flauminc.com/size/1280x720/server15-cdn/2016/05/20/best-restaurant-design-modern-restaurant-bar-design-3276ff1e1c2bd326.jpg",
    },
    {
      image_url:"http://www.caribbeanluxuryclub.com/wp-content/uploads/2015/11/va-food-coba-104-1280x720.jpg" ,
    },
     { 
      image_url: "http://www.viceroyhotelsandresorts.com/~/media/viceroy_hotels_and_resorts/snowmass/Images/Large-1280x720/vs_8k_dining_5222_1280x720.ashx",
     },
     {
        image_url:"http://www.lemairerestaurant.com/images/photos/photo-gallery/salmon.jpg",
     },
     {
      image_url:"http://www.fourseasons.com/content/dam/fourseasons/images/web/BEV/BEV_535_aspect16x9.jpg/jcr:content/renditions/cq5dam.web.1280.1280.jpeg",
     },
     {
      image_url:"http://www.fourseasons.com/content/dam/fourseasons/images/web/VGS/VGS_458_aspect16x9.jpg",
     }
  ]

    var htmlStr = ""
      carouselImages.forEach(function(item,i){
         htmlStr += `
           <div id="image${i}" class="pics">
              <div><img src="${item.image_url}" /></div>
               <div class= "prev">&#8656</div>
               <div class= "next">&#8658</div>
           </div>
           `
          
      })

         $(".restaurant").html(htmlStr)
         $(".pics:first-child").addClass("current opacity")
     
        $(".next").on('click', function(){
        
            var current = $(".current").attr("id").substr(5)
            var nextIndex = Number(current) + 1;
      
            if(nextIndex === carouselImages.length){
            nextIndex = 0
            }
         
          
           $(`#image${current}`).removeClass("current opacity")
           $(`#image${nextIndex}`).addClass("current opacity")
           
        })

        $(".prev").on('click', function(){
        
            var current = $(".current").attr("id").substr(5)
            var prevIndex = Number(current) - 1;
      
            if(prevIndex === -1){
            prevIndex = carouselImages.length-1
            }
         
          
         $(`#image${current}`).removeClass("current opacity")
         $(`#image${prevIndex}`).addClass("current opacity")
         
        })

    $(".tab").on('click', function(e){
      $(".content").hide()
      var content = $(this).attr("content")
      $(`#${content}`).show()
      if($(this).attr('content') === 'location') {
        initMap()
      }
  })
    

}) //DOCUMENT.READY CLOSING TAGS
        
function initMap() {
    //coordinates for address. from www.gps-coordinates.net
    var coordinates = {
      lat: 36.1583864,
      lng: -115.1525016
    }
    var map = new google.maps.Map(document.getElementById("location"), {
      zoom: 17,
      center: coordinates,
      styles: [
        { 
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{visibility: 'off'}]
        }
      ]
    })

    var contentString = `
      <h2>Lagoon Valley</h2>
      <p>Las Vegas' premier find dining seafood experience. Enjoy the freshest seafood the Valley has to offer.</p>
      <div><b>insert Lagoon Valley Logo here</b></div>
    `

    var infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 1000
    });

    var marker = new google.maps.Marker({
        position: coordinates,
        map: map,
        title: 'Lagoon Valley'
    })

    marker.addListener('click', function() {
    infowindow.open(map, marker)
    
    })
  } 

function menuIconRender(obj) {

  var menuSymbols = ``;
  if(obj.allergies) {
    menuSymbols += `<div class='menuAllergies'><i class='fa fa-exclamation-triangle' aria-hidden='true'></i></div>`
  }

  if(obj.favorite) {
    menuSymbols += `<div class="menuFavorite"><i class="fa fa-star" aria-hidden="true"></i></div>`
  }

  if(obj.spicy) {
    menuSymbols += `<div class="menuSpicy"><i class="fa fa-fire" aria-hidden="true"></i></div>`
  }

  if(obj.vegan) {
    menuSymbols += `<div class="menuVegan"><i class="fa fa-leaf" aria-hidden="true"></i><div>`
  }

  return menuSymbols
}

$.get("https://json-data.herokuapp.com/restaurant/special/1", function(special){
         $.get("https://json-data.herokuapp.com/restaurant/menu/1", function(menu){
            showSpecial(menu, special.menu_item_id)
         })
    })
function showSpecial(menu, id){
    var todaysItem = menu.entrees.filter(function(menuItem) {
        if(menuItem.id === id) {
            return true
        }
    })[0]
    var deal = `
           
      <div class="menuItem">
      <div class="firstLineMenu">
        <div class="menuTitle">${todaysItem.item}</div>
          <div class="dots"></div>
          <div class="price">$${todaysItem.price}</div>
      </div>
      <div class="secondLineMenu">
        <div class="menuDescription">${todaysItem.description}</div>
        <div class="menuSymbols">
          <div class="menuAllergies">${todaysItem.allergies ? '<i class="fa fa-exclamation-triangle" aria-hidden="true"></i>' : ""}</div>
          <div class="menuFavorite">${todaysItem.favorite ? '<i class="fa fa-star" aria-hidden="true"></i>' : ""}</div>
          <div class="menuSpicy">${todaysItem.spicy ? '<i class="fa fa-fire" aria-hidden="true">' : ""}</i></div>
          <div class="menuVegan">${todaysItem.vegan ? '<img src="https://maxcdn.icons8.com/iOS7/PNG/25/Food/vegan_food_filled-25.png" title="Vegan Food Filled" width="25">' : ""}</div>
        </div>
      </div>
      </div>  
    `
    $("#specials").html(deal)
}



// ${menuIconRender(menuItems)}


 