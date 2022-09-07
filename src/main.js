const API_URL = 'https://api.themoviedb.org/3';

const getTrendingMoviesPreview = async () => {
  const res = await fetch(`${API_URL}/trending/movie/day?api_key=${API_KEY}`)
  const {results} = await res.json();

  const divMoviesTrendingPreviewContainer = document.querySelector('#trendingPreview .trendingPreview-movieList');
  
  results.forEach(movie => {
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');
    const movieImg       = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('alt', movie.title);
    movieImg.setAttribute('src', `https://image.tmdb.org/t/p/w300/${movie.poster_path}`);
    movieContainer.appendChild(movieImg);
    divMoviesTrendingPreviewContainer.appendChild(movieContainer)
  });

  console.log(results)
};

const getCategoriesMoviesPreview = async () => {
  const res = await fetch(`${API_URL}/genre/movie/list?api_key=${API_KEY}&language=es-Co`)
  const {genres} = await res.json();

  const divMoviesCategoriesPreview = document.querySelector('#categoriesPreview .categoriesPreview-list');
  
  genres.forEach(category => {
    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('category-container');

    const categoryTitle = document.createElement('h3');
    categoryTitle.classList.add('category-title')
    categoryTitle.setAttribute('id', `id${category.id}`);

    const categoryTitleText = document.createTextNode(category.name);
    categoryTitle.appendChild(categoryTitleText);

    categoryContainer.appendChild(categoryTitle);

    divMoviesCategoriesPreview.appendChild(categoryContainer);
  });

};

getTrendingMoviesPreview();
getCategoriesMoviesPreview();