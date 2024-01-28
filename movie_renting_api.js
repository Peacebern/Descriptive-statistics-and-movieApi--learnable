    const readline = require('readline');

    // Movie class
    class Movie {
    constructor(title, genre, availableCopies) {
        this.title = title;
        this.genre = genre;
        this.availableCopies = availableCopies;
    }

    rentMovie() {
        if (this.availableCopies > 0) {
        this.availableCopies--;
        console.log(`Enjoy watching ${this.title}!`);
        } else {
        console.log(`Sorry, ${this.title} is currently unavailable.`);
        }
    }

    returnMovie() {
        this.availableCopies++;
        console.log(`Thank you for returning ${this.title}.`);
    }
    }

    // Customer class
    class Customer {
    constructor(name) {
        this.name = name;
        this.rentedMovies = [];
    }

    rentMovie(movie) {
        movie.rentMovie();
        this.rentedMovies.push(movie);
        console.log(`${this.name} has rented ${movie.title}.`);
    }

    returnMovie(movie) {
        movie.returnMovie();
        this.rentedMovies = this.rentedMovies.filter(
        (rentedMovie) => rentedMovie !== movie
        );
        console.log(`${this.name} has returned ${movie.title}.`);
    }

    listRentedMovies() {
        console.log(`${this.name}'s rented movies:`);
        this.rentedMovies.forEach((movie) => {
        console.log(`${movie.title} (${movie.genre})`);
        });
    }
    }

    // Movie Rental System class
    class MovieRentalSystem {
    constructor() {
        this.movies = [];
        this.customers = [];
    }

    addMovie(movie) {
        this.movies.push(movie);
        console.log(`${movie.title} has been added to the collection.`);
    }

    addCustomer(customer) {
        this.customers.push(customer);
        console.log(`${customer.name} has joined the rental service.`);
    }

    rentMovie(customer, movieTitle) {
        const movie = this.movies.find((m) => m.title === movieTitle);
        if (movie) {
        customer.rentMovie(movie);
        } else {
        console.log(`Apologies, ${movieTitle} is not available.`);
        }
    }

    returnMovie(customer, movieTitle) {
        const movie = this.movies.find((m) => m.title === movieTitle);
        if (movie) {
        customer.returnMovie(movie);
        } else {
        console.log(`Movie ${movieTitle} not found.`);
        }
    }
    }

    //  movie rental system
    const rentalSystem = new MovieRentalSystem();

    // readline interface for input
    const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
    });

    //  function to get user input
    function prompt(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
        resolve(answer);
        });
    });
    }


// Function to run the movie rental system
    async function runMovieRentalSystem() {
        console.log('Welcome to the Movie Rental System!\n');
    
        // Add movies to the system
        rentalSystem.addMovie(new Movie("The Matrix", "Sci-Fi", 7));
        rentalSystem.addMovie(new Movie("Casablanca", "Romance", 5));
    
        // Add customers to the system
        const customerNames = ["Alice", "Bob"];
        for (const name of customerNames) {
        rentalSystem.addCustomer(new Customer(name));
        }
    
        while (true) {
        console.log('\nOptions:');
        console.log('1. Rent a movie');
        console.log('2. Return a movie');
        console.log('3. List rented movies for a customer');
        console.log('4. Exit\n');
    
        const choice = await prompt('Enter your choice (1-4): ');
    
        switch (choice) {
            case '1':
            const customerNameToRent = await prompt('Enter customer name: ');
            const movieTitleToRent = await prompt('Enter the title of the movie to rent: ');
            let customerToRent = rentalSystem.customers.find((c) => c.name === customerNameToRent);
            if (!customerToRent) {
                // If customer is not found, add a new customer
                customerToRent = new Customer(customerNameToRent);
                rentalSystem.addCustomer(customerToRent);
            }
            rentalSystem.rentMovie(customerToRent, movieTitleToRent);
            break;
    
            case '2':
            const customerNameToReturn = await prompt('Enter customer name: ');
            const movieTitleToReturn = await prompt('Enter the title of the movie to return: ');
            const customerToReturn = rentalSystem.customers.find((c) => c.name === customerNameToReturn);
            if (customerToReturn) {
                rentalSystem.returnMovie(customerToReturn, movieTitleToReturn);
            } else {
                console.log(`Customer ${customerNameToReturn} not found.`);
            }
            break;
    
            case '3':
            const customerNameToList = await prompt('Enter customer name: ');
            const customerToList = rentalSystem.customers.find((c) => c.name === customerNameToList);
            if (customerToList) {
                customerToList.listRentedMovies();
            } else {
                console.log(`Customer ${customerNameToList} not found.`);
            }
            break;
    
            case '4':
            console.log('Exiting the Movie Rental System.');
            rl.close();
            return;
    
            default:
            console.log('Invalid choice. Please enter a number between 1 and 4.');
        }
        }
    }
    
    // Run the movie rental system
    runMovieRentalSystem();
    