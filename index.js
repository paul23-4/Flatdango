document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = "http://localhost:3000/films";
    const movieDetailsContainer = document.getElementById('movieDetails');
    const filmsList = document.getElementById('films');
  
    // Function to update movie details on the page
    const updateMovieDetails = (movie) => {
      const filmImage = document.getElementById("poster");
      const filmTitle = document.getElementById("filmTitle");
      const filmDescr = document.getElementById("movieDescription");
      const runTime = document.getElementById("runtime");
      const showTime = document.getElementById("showtime");
      const availTickets = document.getElementById("ticketsAvailable");
  
      filmImage.src = movie.poster;
      filmTitle.innerText = movie.title;
      filmDescr.innerText = movie.description;
      runTime.innerHTML = `Runtime: ${movie.runtime} minutes`;
      showTime.innerText = `Showtime: ${movie.showtime}`;
      availTickets.innerText = `Tickets available: (${movie.capacity - movie.tickets_sold})`;
  
      const ticketsBuy = document.getElementById("buyTicket");
      let ticket = Number(movie.capacity - movie.tickets_sold);
  
      ticketsBuy.addEventListener('click', () => {
        if (ticket > 0) {
          ticket--;
          availTickets.innerText = `Tickets available: (${ticket})`;
        } else {
          alert("Sorry, this show is sold out!");
        }
      });
    };
  
    // Function to fetch movie data and populate the film list
    const fetchAndPopulateMovies = () => {
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          data.forEach(movie => {
            const movieItem = document.createElement('li');
            movieItem.classList.add('film', 'item');
            movieItem.innerText = movie.title;
  
            movieItem.addEventListener('click', () => {
              updateMovieDetails(movie);
            });
  
            filmsList.appendChild(movieItem);
          });
  
          // Show details of the first movie by default
          if (data.length > 0) {
            updateMovieDetails(data[0]);
          }
        })
        .catch(error => console.error("Error fetching movies:", error));
    };
  
    // Initial fetch and population of movies
    fetchAndPopulateMovies();
  });
  