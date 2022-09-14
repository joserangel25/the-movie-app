window.addEventListener(
  'DOMContentLoaded',
  () => {
      navigator();
      // Agregando un estado de carga inical
      window.history.pushState({ loadUrl: window.location.href }, null, '');
  },
  false,
);


window.addEventListener('hashchange', () => {
  navigator()
}, false);

searchFormInput.addEventListener('keydown', (e) => {

  if(e.key === 'Enter'){
    e.preventDefault()
    console.log('has dado enter')
    location.hash = `#search=${searchFormInput.value}`;
  }
});

searchFormBtn.addEventListener('click', () => {
  location.hash = `#search=${searchFormInput.value}`;
  genericSection.innerHTML = '';
});

trendingBtn.addEventListener('click', () => location.hash = '#trends=' );

arrowBtn.addEventListener('click', () => {
  const stateLoad = window.history.state ? window.history.state.loadUrl : '';
  // console.log(stateLoad)
  if (stateLoad.includes('#')) {
      window.location.hash = '';
  } else {
      window.history.back();
  }
});


const navigator = () => {
  // console.log({ location });

  if(location.hash.startsWith('#trends')){
    trendsPage()
  } else if (location.hash.startsWith('#search=')){
    searchPage()
    console.log(history)
  } else if (location.hash.startsWith('#movie=')){
    moviePage();
  } else if (location.hash.startsWith('#category=')){
    categoryPage();
  } else {
    homePage();
  }
};

function homePage(){
  console.log('HOME');
  searchFormInput.value = '';

  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.add('inactive');
  arrowBtn.classList.remove('geader-arrow--white');

  headerTitle.classList.remove('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.remove('inactive');

  trendingPreviewSection.classList.remove('inactive');
  categoriesPreviewSection.classList.remove('inactive');

  genericSection.classList.add('inactive');
  movieDetailSection.classList.add('inactive')

  const childrenCategoriesPreview = Array.from(categoriesPreviewList.children);
  if(!childrenCategoriesPreview.length){
    getTrendingMoviesPreview();
    getCategoriesMoviesPreview();
  }
};

function categoryPage(){
  // console.log('ESTÁS EN UNA LISTA DE CATEGORIAS!!');
  genericSection.innerHTML = '';

  const [idCategory, nameCategory] = location.hash.replace('#category=', '').split('-');
  // console.log(idCategory);


  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');
  headerCategoryTitle.innerText = decodeURIComponent(nameCategory);
  searchForm.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  movieDetailSection.classList.add('inactive')

  genericSection.classList.remove('inactive');

  getMoviesByCategory(idCategory)
  
};

function moviePage(){

  headerSection.classList.add('header-container--long');
  // headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.add('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');

  genericSection.classList.add('inactive');
  movieDetailSection.classList.remove('inactive');

  const id = decodeURIComponent(location.hash.replace('#movie=',''));
  getMovieById(id);
};

function searchPage(){
  genericSection.innerHTML = '';
  // console.log('ESTÁS EN UN SEARCH!!')

  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.remove('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');

  genericSection.classList.remove('inactive');
  // movieDetailSection.classList.add('inactive')
  const wordSearch = decodeURIComponent(location.hash.replace('#search=',''));
  // console.log(wordSearch)
  getMoviesByQuery(wordSearch)
};

function trendsPage(){

  genericSection.innerHTML = '';


  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('geader-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');
  headerCategoryTitle.innerText = 'Tendencias'
  searchForm.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');

  genericSection.classList.remove('inactive');

  getTrendingMovies()
};


