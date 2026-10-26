require('dotenv').config();
const mongoose = require('mongoose');
const Movie = require('../models/movieModel');
const Theatre = require('../models/theatreModel');
const Show = require('../models/showModel');
const Seat = require('../models/seatModel');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/Imovies');
    console.log('Connected to MongoDB for seeding...');

    await Movie.deleteMany({});
    await Theatre.deleteMany({});
    await Show.deleteMany({});
    await Seat.deleteMany({});

    console.log('Cleared existing movie, theatre, show, and seat collections.');

    // Seed Movies matching the requirements exactly (Bollywood and Hollywood mix)
    const movies = await Movie.insertMany([
      // Bollywood Blockbusters
      {
        movieName: 'RRR',
        description: 'A fearless warrior on a perilous mission comes face to face with a steely cop serving British forces in pre-independent India.',
        genres: ['Action', 'Drama', 'Historical'],
        releaseDate: new Date('2022-03-25'),
        runtime: 187,
        certification: 'UA',
        posterUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d7/RRR_Poster.jpg',
        language: 'Telugu / Hindi',
      },
      {
        movieName: 'Jawan',
        description: 'A high-octane action thriller outlining the emotional journey of a man who is set to rectify the wrongs in the society.',
        genres: ['Action', 'Thriller'],
        releaseDate: new Date('2023-09-07'),
        runtime: 169,
        certification: 'UA',
        posterUrl: 'https://upload.wikimedia.org/wikipedia/en/3/39/Jawan_film_poster.jpg',
        language: 'Hindi',
      },
      {
        movieName: 'Baahubali 2: The Conclusion',
        description: 'When Shiva, the son of Bahubali, learns about his heritage, he begins to look for answers while uncovering ancestral heroism and betrayal.',
        genres: ['Action', 'Drama', 'Fantasy'],
        releaseDate: new Date('2017-04-28'),
        runtime: 167,
        certification: 'UA',
        posterUrl: 'https://upload.wikimedia.org/wikipedia/en/9/93/Baahubali_2_The_Conclusion_poster.jpg',
        language: 'Telugu / Hindi',
      },
      {
        movieName: 'Animal',
        description: 'A son\'s obsessive love for his father spirals into a violent underworld vengeance crusade against powerful rivals.',
        genres: ['Action', 'Crime', 'Drama'],
        releaseDate: new Date('2023-12-01'),
        runtime: 201,
        certification: 'A',
        posterUrl: 'https://upload.wikimedia.org/wikipedia/en/9/90/Animal_%282023_film%29_poster.jpg',
        language: 'Hindi',
      },
      {
        movieName: 'Stree 2',
        description: 'The town of Chanderi is haunted once again by a headless phantom, forcing the gang to reunite with the mysterious guardian witch.',
        genres: ['Comedy', 'Horror'],
        releaseDate: new Date('2024-08-15'),
        runtime: 147,
        certification: 'UA',
        posterUrl: 'https://upload.wikimedia.org/wikipedia/en/e/ee/Stree_2.jpg',
        language: 'Hindi',
      },
      {
        movieName: 'Kalki 2898 AD',
        description: 'In a post-apocalyptic dystopia in 2898 AD, a modern avatar of Vishnu descends to protect the world from evil forces.',
        genres: ['Action', 'Sci-Fi', 'Fantasy'],
        releaseDate: new Date('2024-06-27'),
        runtime: 181,
        certification: 'UA',
        posterUrl: 'https://upload.wikimedia.org/wikipedia/en/4/4c/Kalki_2898_AD.jpg',
        language: 'Telugu / Hindi',
      },

      // Hollywood Blockbusters
      {
        movieName: 'Oppenheimer',
        description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.',
        genres: ['Biography', 'Drama', 'History'],
        releaseDate: new Date('2023-07-21'),
        runtime: 180,
        certification: 'A',
        posterUrl: 'https://upload.wikimedia.org/wikipedia/en/4/4a/Oppenheimer_%28film%29.jpg',
        language: 'English',
      },
      {
        movieName: 'Interstellar',
        description: 'When Earth becomes uninhabitable in the future, a team of explorers travels through a wormhole in space in an attempt to ensure humanity\'s survival.',
        genres: ['Adventure', 'Drama', 'Sci-Fi'],
        releaseDate: new Date('2014-11-07'),
        runtime: 169,
        certification: 'UA',
        posterUrl: 'https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg',
        language: 'English',
      },
      {
        movieName: 'Dune: Part Two',
        description: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
        genres: ['Action', 'Adventure', 'Sci-Fi'],
        releaseDate: new Date('2024-03-01'),
        runtime: 166,
        certification: 'UA',
        posterUrl: 'https://upload.wikimedia.org/wikipedia/en/5/52/Dune_Part_Two_poster.jpeg',
        language: 'English',
      },
      {
        movieName: 'Inception',
        description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
        genres: ['Action', 'Sci-Fi', 'Thriller'],
        releaseDate: new Date('2010-07-16'),
        runtime: 148,
        certification: 'UA',
        posterUrl: 'https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg',
        language: 'English',
      },
      {
        movieName: 'The Dark Knight',
        description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological tests of his ability.',
        genres: ['Action', 'Crime', 'Drama'],
        releaseDate: new Date('2008-07-18'),
        runtime: 152,
        certification: 'UA',
        posterUrl: 'https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29_poster.jpg',
        language: 'English',
      },
      {
        movieName: 'Gladiator II',
        description: 'Years after witnessing the death of Maximus at the hands of his uncle, Lucius must enter the Colosseum after the emperors conquer his home.',
        genres: ['Action', 'Adventure', 'Drama'],
        releaseDate: new Date('2024-11-22'),
        runtime: 148,
        certification: 'A',
        posterUrl: 'https://upload.wikimedia.org/wikipedia/en/0/00/Gladiator_II_teaser_poster.jpg',
        language: 'English',
      },
    ]);

    console.log(`Seeded ${movies.length} movies.`);

    // Seed Theatres matching screenshots
    const theatres = await Theatre.insertMany([
      {
        theatreName: 'PVR INOX: Nexus Mall',
        location: 'Kukatpally, Hyderabad',
        balconySeatPrice: 250,
        balconySeatCount: 40,
        middleSeatPrice: 180,
        middleSeatCount: 60,
        lowerSeatPrice: 120,
        lowerSeatCount: 50,
      },
      {
        theatreName: 'Cinepolis: IMAX Forum',
        location: 'Madhapur, Hyderabad',
        balconySeatPrice: 350,
        balconySeatCount: 40,
        middleSeatPrice: 250,
        middleSeatCount: 60,
        lowerSeatPrice: 150,
        lowerSeatCount: 50,
      },
      {
        theatreName: 'Srinivasa 4K Dolby Cinema',
        location: 'RTC X Roads, Hyderabad',
        balconySeatPrice: 175,
        balconySeatCount: 40,
        middleSeatPrice: 130,
        middleSeatCount: 60,
        lowerSeatPrice: 100,
        lowerSeatCount: 50,
      },
    ]);

    console.log(`Seeded ${theatres.length} theatres.`);

    // Seed Shows matching screenshots
    const shows = await Show.insertMany([
      {
        adminEmail: 'admin@imovies.com',
        movieId: movies[6].movieId,
        movieName: 'Oppenheimer',
        theatreName: 'Cinepolis: IMAX Forum',
        showdate: 'Oct 24, 2026',
        showtime: '2:15 PM',
        tickets: { Balcony: 350, Middle: 250, Lower: 150 },
      },
      {
        adminEmail: 'admin@imovies.com',
        movieId: movies[0].movieId,
        movieName: 'RRR',
        theatreName: 'Srinivasa 4K Dolby Cinema',
        showdate: 'Oct 24, 2026',
        showtime: '6:30 PM',
        tickets: { Balcony: 175, Middle: 130, Lower: 100 },
      },
      {
        adminEmail: 'admin@imovies.com',
        movieId: movies[1].movieId,
        movieName: 'Jawan',
        theatreName: 'PVR INOX: Nexus Mall',
        showdate: 'Oct 25, 2026',
        showtime: '9:00 PM',
        tickets: { Balcony: 250, Middle: 180, Lower: 120 },
      },
      {
        adminEmail: 'admin@imovies.com',
        movieId: movies[8].movieId,
        movieName: 'Dune: Part Two',
        theatreName: 'Cinepolis: IMAX Forum',
        showdate: 'Oct 25, 2026',
        showtime: '7:45 PM',
        tickets: { Balcony: 350, Middle: 250, Lower: 150 },
      },
      {
        adminEmail: 'admin@imovies.com',
        movieId: movies[7].movieId,
        movieName: 'Interstellar',
        theatreName: 'Cinepolis: IMAX Forum',
        showdate: 'Oct 26, 2026',
        showtime: '4:00 PM',
        tickets: { Balcony: 350, Middle: 250, Lower: 150 },
      },
      {
        adminEmail: 'admin@imovies.com',
        movieId: movies[4].movieId,
        movieName: 'Stree 2',
        theatreName: 'PVR INOX: Nexus Mall',
        showdate: 'Oct 26, 2026',
        showtime: '10:00 PM',
        tickets: { Balcony: 250, Middle: 180, Lower: 120 },
      },
    ]);

    console.log(`Seeded ${shows.length} shows.`);
    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();
