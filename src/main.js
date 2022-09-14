const API_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  params: {
    'api_key': API_KEY,
    'language': 'es-Co',
  }
})

//Función anterior con Fetch
// const getTrendingMoviesPreview = async () => {
//   const res = await fetch(`${API_URL}/trending/movie/day?api_key=${API_KEY}`)
//   const {results} = await res.json();

//   const divMoviesTrendingPreviewContainer = document.querySelector('#trendingPreview .trendingPreview-movieList');
  
//   results.forEach(movie => {
//     const movieContainer = document.createElement('div');
//     movieContainer.classList.add('movie-container');
//     const movieImg       = document.createElement('img');
//     movieImg.classList.add('movie-img');
//     movieImg.setAttribute('alt', movie.title);
//     movieImg.setAttribute('src', `https://image.tmdb.org/t/p/w300/${movie.poster_path}`);
//     movieContainer.appendChild(movieImg);
//     divMoviesTrendingPreviewContainer.appendChild(movieContainer)
//   });
// };

const getTrendingMoviesPreview = async () => {

  const { data } = await api(`trending/movie/day`);
  const { results } = data;

  renderMoviesHtml(results, trendingMoviesPreviewList)
};


const getCategoriesMoviesPreview = async () => {
  const { data } = await api(`/genre/movie/list?`);
  const { genres } = data;
  
  createCategoryTag(genres, categoriesPreviewList);

};

function createCategoryTag(categorías, nodoInsert){
  categorías.forEach(category => {
    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('category-container');

    const categoryTitle = document.createElement('h3');
    categoryTitle.classList.add('category-title')
    categoryTitle.setAttribute('id', `id${category.id}`);

    const categoryTitleText = document.createTextNode(category.name);
    categoryTitle.addEventListener('click', () => location.hash = `#category=${category.id}-${category.name}`);
    categoryTitle.appendChild(categoryTitleText);

    categoryContainer.appendChild(categoryTitle);

    nodoInsert.appendChild(categoryContainer);
  });
}

//Funcion que obtiene lista de películas de acuerdo a una categoría en particular
async function getMoviesByCategory(id){
  const { data } = await api(`discover/movie?with_genres=${id}`);
  const { results } = data;
  
  renderMoviesHtml(results, genericSection)
};


//Funcion que obtiene lista de películas de acuerdo a un nombre en particular
async function getMoviesByQuery(query){
  const { data } = await api(`/search/movie`, {
    params: {
      query,
    }
  });
  const { results } = data;
  // console.log(results)
  renderMoviesHtml(results, genericSection)
};

//Funcion que recibe la lista de películas y el nodo donde las debe pintar
function renderMoviesHtml(data, node){
  data.forEach(movie => {
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');
    movieContainer.addEventListener('click', () => {
      location.hash = `#movie=${movie.id}`
    })
    const movieImg       = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('alt', movie.title);
    movieImg.setAttribute('src', `https://image.tmdb.org/t/p/w300/${movie.poster_path}`);
    movieContainer.appendChild(movieImg);
    node.appendChild(movieContainer)
  });
}

const getTrendingMovies = async () => {

  const { data } = await api(`trending/movie/day`);
  console.log(data)
  const { results } = data;

  renderMoviesHtml(results, genericSection)
};

async function getMovieById(id){
  const { data: movie } = await api(`/movie/${id}`)
  // console.log(movie)

  headerSection.style.background = `
    linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%),
    url(https://image.tmdb.org/t/p/w500/${movie.poster_path})
  `;

  movieDetailTitle.textContent = movie.title;
  movieDetailDescription.textContent = movie.overview;
  movieDetailScore.textContent = movie.vote_average;

  movieDetailCategoriesList.innerHTML = '';
  createCategoryTag(movie.genres, movieDetailCategoriesList);

  relatedMoviesContainer.innerHTML = '';
  getSimilarMovies(id);
};

async function getSimilarMovies(id){
  const { data: movies } = await api(`/movie/${id}/similar`);
  renderMoviesHtml(movies.results, relatedMoviesContainer);
}