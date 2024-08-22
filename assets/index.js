console.log("estamos conectados");
const productsContainer = document.querySelector(".products-container");
const showMoreBtn = document.querySelector(".btn-load");
const categoriesContainer = document.querySelector(".categories");
const categoriesList = document.querySelectorAll(".category");

const createProductTemplate = (product) => {
  return `<div class="product">
    <img src="${product.cardImg}" alt="${product.name}" />
    
    <!-- contenedor para la info -->
    <div class="product-info">
      <!-- Top -->
      <div class="product-top">
        <h3>${product.name}</h3>
        <p>Current Bid</p>
      </div>
    
      <!-- mid -->
      <div class="product-mid">
        <div class="product-user">
          <img src="${product.userImg}" alt="${product.user}" />
          <p>@${product.user}</p>
        </div>
        <span>${product.bid}</span>
      </div>
    
      <!-- bot -->
      <div class="product-bot">
        <div class="offer-time">
          <img src="./assets/img/fire.png" alt="fueguito" />
          <p>05:12:07</p>
        </div>
    
        <button class="btn-add"
        data-id='${product.id}' 
        data-name='${product.name}'
        data-bid='${product.bid}' 
        data-img='${product.cardImg}'
        >Add</button>
      </div>
    </div>
    </div>`;
};

const renderProducts = (productList) => {
  console.log(productList);
  productsContainer.innerHTML += productList
    .map(createProductTemplate)
    .join("");
};

const IslastIndexOf = () => {
  return appstate.currentProductsIndex === appstate.productsLimit - 1;
};

const showMoreProducts = () => {
  appstate.currentProductsIndex += 1;
  console.log(appstate.currentProductsIndex);
  renderProducts(appstate.products[appstate.currentProductsIndex]);

  if (IslastIndexOf) {
    // console.log("estmos al final del array");
    showMoreBtn.classList.add("hidden");
  }
};

const setShowMoreVisibility = () => {
  if (!appstate.activeFilter) {
    showMoreBtn.classList.remove("hidden");
  }
  showMoreBtn.classList.add("hidden");
};

const ChangeBtnActiveState = (SelectedCategory) => {
  const categories = [...categoriesList];

  categories.forEach((categoryBtn) => {
    if (categoryBtn.dataset.category !== SelectedCategory) {
      categoryBtn.classList.remove("active");
      return;
    }
    categoryBtn.classList.add("active");
  });
};

const changeFilterState = (btn) => {
  appstate.activeFilter = btn.dataset.category;
  ChangeBtnActiveState(appstate.activeFilter);
  setShowMoreVisibility(appstate.activeFilter);
};

const renderFilterdProducts = () => {
  const filteredProducts = productsData.filter(
    (product) => product.category === appstate.activeFilter
  );
  renderProducts(filteredProducts);
};

const applyFilter = ({ target }) => {
  // console.log(e.target);
  if (!IsInactiveFilterBtn(target)) return;
  changeFilterState(target);
  productsContainer.innerHTML = "";
  if (appstate.activeFilter) {
    renderFilterdProducts();
    appstate.currentProductsIndex = 0;
    return;
  }
  renderProducts(appstate.products[0]);
};

const IsInactiveFilterBtn = (element) => {
  return (
    element.classList.contains("category") &&
    !element.classList.contains("active")
  );
};

const init = () => {
  renderProducts(appstate.products[0]);
  showMoreBtn.addEventListener("click", showMoreProducts);
  categoriesContainer.addEventListener("click", applyFilter);
  console.log(categoriesContainer);
};

init();
