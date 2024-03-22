import CONFIG from '../../globals/config';

const createRestaurantDetailTemplate = (restaurant) => `
<p class="section-subtitle label-2 text-center">Ini Dia</p>
<h2 class="section-title headline-1 text-center">${restaurant.name}</h2>
<div class = "result-container">
    <div class = "result-grid" id = "result-grid">
        <div class = "detail-poster">
            <img class="img-cover lazyload" crossorigin="anonymous" alt="${restaurant.name}"
            data-src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}">
        </div>
        <div class = "detail-info">
            <p class="rating"><b>Rating:</b> ${restaurant.rating}</p>
            <p class="city text-white"><b>Alamat:</b> ${restaurant.city}</p>
            <p class="address text-white"><b>Kota: </b>${restaurant.address}</p>
            <p class="description text-white"><b>Deskripsi:</b> ${restaurant.description}</p>
            <p class="menu text-white"><b>Menu</b></p>
            <ul class="menu">
              <li><span class="dot"></span><b>Food:</b> 
                ${restaurant.menus.foods.map((food) => food.name).join(', ')}</li>
              <li><span class="dot"></span><b>Drinks:</b> 
                ${restaurant.menus.drinks.map((drink) => drink.name).join(', ')}</li>
            </ul>
        </div>
    </div>
</div>


<h2 class="section-title headline-2 text-center">Customer Review</h2>
<div class="review-container">
${restaurant.customerReviews.map((review) => `
    <div class="review-card" id="review-card">
        <div class="userdetails">
        <div class="detbox">
            <p class="name dark">${review.name}</p>
            <p class="designation">${review.date}</p>
        </div>
        </div>
        <div class="review dark">
        <h4>"${review.review}"</h4>
        </div>
    </div>
`).join('')}
</div>
`;

const createRestaurantItemTemplate = (restaurant) => `
    <ul class="restaurant-item" tabindex = "0" >
        <li>
            <a href="/#/detail/${restaurant.id}">
                <div class="list-card has-before hover:shine" tabindex="0">
                    <div class="card-banner img-holder">
                        <img class="img-cover lazyload" crossorigin="anonymous" alt="${restaurant.name}"
                            data-src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}">
                            <p class="rating label-2"><ion-icon name="star" class="star">
                            </ion-icon> ${restaurant.rating}</p>
                    </div>

                    <div class="card-content">
                        <p class="card-subtitle label-2 text-center">${restaurant.city}</p>
                        <h3 class="card-title title-2 text-center">${restaurant.name}</h3>
                    </div>
                </div>
            </a>
        </li>
    </ul >
    `;

const createLikeRestaurantButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnlikeRestaurantButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
    createRestaurantItemTemplate, createRestaurantDetailTemplate,
    createLikeRestaurantButtonTemplate, createUnlikeRestaurantButtonTemplate,
};
