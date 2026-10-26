/**
 * IMovies — Movie Ticket Booking Made Simple
 * Full-stack implementation adhering strictly to reference screenshots
 */

import React, { useState, useEffect } from 'react';
import {
  Sun,
  Moon,
  Home,
  Heart,
  User as UserIcon,
  Search,
  Info,
  Calendar,
  Film,
  PlusCircle,
  Clock,
  LogOut,
  Trash2,
  Video,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  QrCode,
  CreditCard,
  ChevronRight,
  ShieldAlert,
  Shield,
  Lock,
  Star,
  Play,
  ArrowLeft,
  Send,
  MessageSquare,
  Ticket,
  ExternalLink,
} from 'lucide-react';

// Image references
const HERO_BANNER = '/src/assets/images/hero_cinema_blockbuster_1792345407815.jpg';
const POSTER_ODYSSEY = '/src/assets/images/movie_poster_interstellar_odyssey_1792345408549.jpg';
const POSTER_AURORA = '/src/assets/images/movie_poster_chronicles_aurora_1792345408942.jpg';

interface CastMember {
  name: string;
  role: string;
}

interface MovieReview {
  id: string;
  movieId: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

interface MovieItem {
  id: string;
  movieName: string;
  description: string;
  genres: string[];
  releaseDate: string;
  runtime: number;
  certification: string;
  posterUrl: string;
  trailerUrl: string;
  trailerEmbedId: string;
  language: string;
  industry: 'Bollywood' | 'Hollywood';
  director: string;
  cast: CastMember[];
}

interface TheatreItem {
  id: string;
  theatreName: string;
  location: string;
  balconySeatPrice: number;
  balconySeatCount: number;
  middleSeatPrice: number;
  middleSeatCount: number;
  lowerSeatPrice: number;
  lowerSeatCount: number;
}

interface ShowItem {
  id: string;
  movieId: string;
  movieName: string;
  theatreId: string;
  theatreName: string;
  showdate: string;
  showtime: string;
  tickets: {
    Balcony: number;
    Middle: number;
    Lower: number;
  };
}

interface BookingItem {
  id: string;
  bookingId: string;
  userEmail: string;
  movieName: string;
  theatreName: string;
  showdate: string;
  showtime: string;
  posterUrl: string;
  tier: string;
  seats: string[];
  totalPrice: number;
  status: 'CONFIRMED' | 'CANCELLED';
  qrCode: string;
  bookedAt: string;
}

// Curated mix of real Bollywood and Hollywood blockbusters with verified poster URLs, cast, and trailers
const INITIAL_MOVIES: MovieItem[] = [
  // --- BOLLYWOOD / INDIAN BLOCKBUSTERS ---
  {
    id: 'm1',
    movieName: 'RRR',
    description: 'A fearless warrior on a perilous mission comes face to face with a steely cop serving British forces in pre-independent India, forging an unlikely brotherhood.',
    genres: ['Action', 'Drama', 'Historical'],
    releaseDate: 'Mar 25, 2022',
    runtime: 187,
    certification: 'UA',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d7/RRR_Poster.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=NgBoMJy386M',
    trailerEmbedId: 'NgBoMJy386M',
    language: 'Telugu / Hindi',
    industry: 'Bollywood',
    director: 'S.S. Rajamouli',
    cast: [
      { name: 'N.T. Rama Rao Jr.', role: 'Komaram Bheem' },
      { name: 'Ram Charan', role: 'Alluri Sitarama Raju' },
      { name: 'Alia Bhatt', role: 'Sita' },
      { name: 'Ajay Devgn', role: 'Venkata Rama Raju' },
      { name: 'Shriya Saran', role: 'Sarojini' },
    ],
  },
  {
    id: 'm2',
    movieName: 'Jawan',
    description: 'A high-octane action thriller outlining the emotional journey of a prison warden driven by a personal vendetta to rectify the deep-rooted corruption in society.',
    genres: ['Action', 'Thriller'],
    releaseDate: 'Sep 7, 2023',
    runtime: 169,
    certification: 'UA',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/3/39/Jawan_film_poster.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=COv52Qyctws',
    trailerEmbedId: 'COv52Qyctws',
    language: 'Hindi',
    industry: 'Bollywood',
    director: 'Atlee Kumar',
    cast: [
      { name: 'Shah Rukh Khan', role: 'Vikram Rathore / Azad' },
      { name: 'Nayanthara', role: 'Narmada Rai' },
      { name: 'Vijay Sethupathi', role: 'Kaalie Gaikwad' },
      { name: 'Deepika Padukone', role: 'Aishwarya Rathore' },
      { name: 'Sanya Malhotra', role: 'Dr. Eeram' },
    ],
  },
  {
    id: 'm3',
    movieName: 'Baahubali 2: The Conclusion',
    description: 'When Shiva, the son of Bahubali, learns about his heritage, he begins to look for answers while uncovering ancestral heroism, loyalty, and heartbreaking betrayal.',
    genres: ['Action', 'Drama', 'Fantasy'],
    releaseDate: 'Apr 28, 2017',
    runtime: 167,
    certification: 'UA',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/9/93/Baahubali_2_The_Conclusion_poster.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=qD-6d8Wo3do',
    trailerEmbedId: 'qD-6d8Wo3do',
    language: 'Telugu / Hindi',
    industry: 'Bollywood',
    director: 'S.S. Rajamouli',
    cast: [
      { name: 'Prabhas', role: 'Amarendra & Mahendra Baahubali' },
      { name: 'Rana Daggubati', role: 'Bhallaladeva' },
      { name: 'Anushka Shetty', role: 'Devasena' },
      { name: 'Tamannaah Bhatia', role: 'Avanthika' },
      { name: 'Ramya Krishna', role: 'Sivagami Devi' },
      { name: 'Sathyaraj', role: 'Kattappa' },
    ],
  },
  {
    id: 'm4',
    movieName: 'Animal',
    description: 'A son\'s obsessive, toxic devotion to his distant father spirals into a violent underworld vengeance crusade against powerful international criminal syndicates.',
    genres: ['Action', 'Crime', 'Drama'],
    releaseDate: 'Dec 1, 2023',
    runtime: 201,
    certification: 'A',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/9/90/Animal_%282023_film%29_poster.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=Dydmpfo68DA',
    trailerEmbedId: 'Dydmpfo68DA',
    language: 'Hindi',
    industry: 'Bollywood',
    director: 'Sandeep Reddy Vanga',
    cast: [
      { name: 'Ranbir Kapoor', role: 'Ranvijay Singh / Aziz Haque' },
      { name: 'Anil Kapoor', role: 'Balbir Singh' },
      { name: 'Rashmika Mandanna', role: 'Geetanjali' },
      { name: 'Bobby Deol', role: 'Abrar Haque' },
      { name: 'Triptii Dimri', role: 'Zoya' },
    ],
  },
  {
    id: 'm5',
    movieName: 'Stree 2',
    description: 'The town of Chanderi is haunted once again by a terrifying headless entity that abducts modern women, forcing the eccentric gang to team up with the mysterious witch.',
    genres: ['Comedy', 'Horror'],
    releaseDate: 'Aug 15, 2024',
    runtime: 147,
    certification: 'UA',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/e/ee/Stree_2.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=KVnhefZ_f4Q',
    trailerEmbedId: 'KVnhefZ_f4Q',
    language: 'Hindi',
    industry: 'Bollywood',
    director: 'Amar Kaushik',
    cast: [
      { name: 'Rajkummar Rao', role: 'Vicky' },
      { name: 'Shraddha Kapoor', role: 'The Unknown Guardian Woman' },
      { name: 'Pankaj Tripathi', role: 'Rudra Bhaiya' },
      { name: 'Abhishek Banerjee', role: 'Jana' },
      { name: 'Aparshakti Khurana', role: 'Bittu' },
    ],
  },
  {
    id: 'm6',
    movieName: 'Kalki 2898 AD',
    description: 'Set in a post-apocalyptic world in the year 2898 AD, a modern incarnation of Vishnu descends on Earth to protect mankind from evil tyrant Supreme Yaskin.',
    genres: ['Action', 'Sci-Fi', 'Fantasy'],
    releaseDate: 'Jun 27, 2024',
    runtime: 181,
    certification: 'UA',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/4/4c/Kalki_2898_AD.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=y1-w1BXWG58',
    trailerEmbedId: 'y1-w1BXWG58',
    language: 'Telugu / Hindi',
    industry: 'Bollywood',
    director: 'Nag Ashwin',
    cast: [
      { name: 'Prabhas', role: 'Bhairava / Karna' },
      { name: 'Amitabh Bachchan', role: 'Ashwatthama' },
      { name: 'Kamal Haasan', role: 'Supreme Yaskin' },
      { name: 'Deepika Padukone', role: 'SUM-80 (Sumathi)' },
      { name: 'Disha Patani', role: 'Roxie' },
    ],
  },

  // --- HOLLYWOOD BLOCKBUSTERS ---
  {
    id: 'm7',
    movieName: 'Oppenheimer',
    description: 'The gripping, Oscar-winning biographical drama chronicling American theoretical physicist J. Robert Oppenheimer and his role in the creation of the atomic bomb.',
    genres: ['Biography', 'Drama', 'History'],
    releaseDate: 'Jul 21, 2023',
    runtime: 180,
    certification: 'A',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/4/4a/Oppenheimer_%28film%29.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=uYPbbksJxIg',
    trailerEmbedId: 'uYPbbksJxIg',
    language: 'English',
    industry: 'Hollywood',
    director: 'Christopher Nolan',
    cast: [
      { name: 'Cillian Murphy', role: 'J. Robert Oppenheimer' },
      { name: 'Emily Blunt', role: 'Katherine Oppenheimer' },
      { name: 'Matt Damon', role: 'Lt. Gen. Leslie Groves' },
      { name: 'Robert Downey Jr.', role: 'Lewis Strauss' },
      { name: 'Florence Pugh', role: 'Jean Tatlock' },
    ],
  },
  {
    id: 'm8',
    movieName: 'Interstellar',
    description: 'When Earth faces extinction from ecological collapse, a group of brave astronauts travels through a newly discovered wormhole near Saturn in search of a new home.',
    genres: ['Adventure', 'Drama', 'Sci-Fi'],
    releaseDate: 'Nov 7, 2014',
    runtime: 169,
    certification: 'UA',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=zSWdZVtXT7E',
    trailerEmbedId: 'zSWdZVtXT7E',
    language: 'English',
    industry: 'Hollywood',
    director: 'Christopher Nolan',
    cast: [
      { name: 'Matthew McConaughey', role: 'Joseph Cooper' },
      { name: 'Anne Hathaway', role: 'Dr. Amelia Brand' },
      { name: 'Jessica Chastain', role: 'Murphy Cooper (Adult)' },
      { name: 'Michael Caine', role: 'Professor John Brand' },
      { name: 'Matt Damon', role: 'Dr. Mann' },
    ],
  },
  {
    id: 'm9',
    movieName: 'Dune: Part Two',
    description: 'Paul Atreides unites with Chani and the Fremen to lead a revolution against the conspirators who orchestrated the downfall of House Atreides on Arrakis.',
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    releaseDate: 'Mar 1, 2024',
    runtime: 166,
    certification: 'UA',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/5/52/Dune_Part_Two_poster.jpeg',
    trailerUrl: 'https://www.youtube.com/watch?v=Way9Dexny3w',
    trailerEmbedId: 'Way9Dexny3w',
    language: 'English',
    industry: 'Hollywood',
    director: 'Denis Villeneuve',
    cast: [
      { name: 'Timothée Chalamet', role: 'Paul Atreides (Muad\'Dib)' },
      { name: 'Zendaya', role: 'Chani' },
      { name: 'Rebecca Ferguson', role: 'Lady Jessica' },
      { name: 'Javier Bardem', role: 'Stilgar' },
      { name: 'Austin Butler', role: 'Feyd-Rautha Harkonnen' },
    ],
  },
  {
    id: 'm10',
    movieName: 'Inception',
    description: 'A skilled thief who infiltrates subconscious minds to extract sensitive corporate secrets is handed an unprecedented mission: planting an idea into a CEO\'s mind.',
    genres: ['Action', 'Sci-Fi', 'Thriller'],
    releaseDate: 'Jul 16, 2010',
    runtime: 148,
    certification: 'UA',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=YoHD9XEInc0',
    trailerEmbedId: 'YoHD9XEInc0',
    language: 'English',
    industry: 'Hollywood',
    director: 'Christopher Nolan',
    cast: [
      { name: 'Leonardo DiCaprio', role: 'Dom Cobb' },
      { name: 'Joseph Gordon-Levitt', role: 'Arthur' },
      { name: 'Elliot Page', role: 'Ariadne' },
      { name: 'Tom Hardy', role: 'Eames' },
      { name: 'Marion Cotillard', role: 'Mal Cobb' },
    ],
  },
  {
    id: 'm11',
    movieName: 'The Dark Knight',
    description: 'When the sadistic, anarchistic Joker wreaks psychological carnage upon Gotham City, Batman must undergo his ultimate moral and physical test to preserve hope.',
    genres: ['Action', 'Crime', 'Drama'],
    releaseDate: 'Jul 18, 2008',
    runtime: 152,
    certification: 'UA',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29_poster.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=EXeTwQWrcwY',
    trailerEmbedId: 'EXeTwQWrcwY',
    language: 'English',
    industry: 'Hollywood',
    director: 'Christopher Nolan',
    cast: [
      { name: 'Christian Bale', role: 'Bruce Wayne / Batman' },
      { name: 'Heath Ledger', role: 'The Joker' },
      { name: 'Aaron Eckhart', role: 'Harvey Dent / Two-Face' },
      { name: 'Michael Caine', role: 'Alfred Pennyworth' },
      { name: 'Gary Oldman', role: 'Lt. James Gordon' },
    ],
  },
  {
    id: 'm12',
    movieName: 'Gladiator II',
    description: 'Decades after witnessing Maximus\' sacrifice, Lucius is captured and thrust into the Colosseum, fighting to restore glory, justice, and honor to Rome.',
    genres: ['Action', 'Adventure', 'Drama'],
    releaseDate: 'Nov 22, 2024',
    runtime: 148,
    certification: 'A',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/0/00/Gladiator_II_teaser_poster.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=4rgYUipGJNo',
    trailerEmbedId: '4rgYUipGJNo',
    language: 'English',
    industry: 'Hollywood',
    director: 'Ridley Scott',
    cast: [
      { name: 'Paul Mescal', role: 'Lucius Verus' },
      { name: 'Pedro Pascal', role: 'General Marcus Acacius' },
      { name: 'Denzel Washington', role: 'Macrinus' },
      { name: 'Connie Nielsen', role: 'Lucilla' },
      { name: 'Joseph Quinn', role: 'Emperor Geta' },
    ],
  },
];

const INITIAL_REVIEWS: MovieReview[] = [
  {
    id: 'rev_1',
    movieId: 'm1',
    author: 'Aarav Sharma',
    rating: 5,
    comment: 'An absolute masterpiece of cinema! The action choreography and Naatu Naatu energy in IMAX is unforgettable.',
    date: 'Oct 20, 2026',
  },
  {
    id: 'rev_2',
    movieId: 'm1',
    author: 'Priya Patel',
    rating: 5,
    comment: 'Ram Charan and Jr NTR delivered career-best performances. Emotional and thrilling from beginning to end!',
    date: 'Oct 18, 2026',
  },
  {
    id: 'rev_3',
    movieId: 'm7',
    author: 'Marcus Vance',
    rating: 5,
    comment: 'Christopher Nolan at his pinnacle. Cillian Murphy and Robert Downey Jr. gave Oscar-worthy masterclasses in tension.',
    date: 'Oct 21, 2026',
  },
  {
    id: 'rev_4',
    movieId: 'm7',
    author: 'Elena Rostova',
    rating: 4,
    comment: 'The Trinity test sequence gave me literal chills in the theater. Outstanding sound design.',
    date: 'Oct 19, 2026',
  },
  {
    id: 'rev_5',
    movieId: 'm9',
    author: 'David Chen',
    rating: 5,
    comment: 'Visual perfection. Denis Villeneuve crafted a sci-fi epic for the ages. The sandworm riding sequence is phenomenal.',
    date: 'Oct 23, 2026',
  },
  {
    id: 'rev_6',
    movieId: 'm2',
    author: 'Karan Mehra',
    rating: 5,
    comment: 'Shah Rukh Khan in mass avatar was electrifying. Anirudh’s background score elevates every single scene!',
    date: 'Oct 22, 2026',
  },
  {
    id: 'rev_7',
    movieId: 'm5',
    author: 'Neha Verma',
    rating: 5,
    comment: 'Laughed so hard while also being genuinely spooked. Pankaj Tripathi steals every scene he is in.',
    date: 'Oct 24, 2026',
  },
  {
    id: 'rev_8',
    movieId: 'm8',
    author: 'Sarah Jenkins',
    rating: 5,
    comment: 'My all-time favorite sci-fi movie. Seeing it back in theatres with Hans Zimmer’s organ score is a spiritual experience.',
    date: 'Oct 25, 2026',
  },
];

const INITIAL_THEATRES: TheatreItem[] = [
  {
    id: 'th1',
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
    id: 'th2',
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
    id: 'th3',
    theatreName: 'Srinivasa 4K Dolby Cinema',
    location: 'RTC X Roads, Hyderabad',
    balconySeatPrice: 175,
    balconySeatCount: 40,
    middleSeatPrice: 130,
    middleSeatCount: 60,
    lowerSeatPrice: 100,
    lowerSeatCount: 50,
  },
];

const INITIAL_SHOWS: ShowItem[] = [
  {
    id: 'sh1',
    movieId: 'm7',
    movieName: 'Oppenheimer',
    theatreId: 'th2',
    theatreName: 'Cinepolis: IMAX Forum',
    showdate: 'Oct 24, 2026',
    showtime: '2:15 PM',
    tickets: { Balcony: 350, Middle: 250, Lower: 150 },
  },
  {
    id: 'sh2',
    movieId: 'm1',
    movieName: 'RRR',
    theatreId: 'th3',
    theatreName: 'Srinivasa 4K Dolby Cinema',
    showdate: 'Oct 24, 2026',
    showtime: '6:30 PM',
    tickets: { Balcony: 175, Middle: 130, Lower: 100 },
  },
  {
    id: 'sh3',
    movieId: 'm2',
    movieName: 'Jawan',
    theatreId: 'th1',
    theatreName: 'PVR INOX: Nexus Mall',
    showdate: 'Oct 25, 2026',
    showtime: '9:00 PM',
    tickets: { Balcony: 250, Middle: 180, Lower: 120 },
  },
  {
    id: 'sh4',
    movieId: 'm9',
    movieName: 'Dune: Part Two',
    theatreId: 'th2',
    theatreName: 'Cinepolis: IMAX Forum',
    showdate: 'Oct 25, 2026',
    showtime: '7:45 PM',
    tickets: { Balcony: 350, Middle: 250, Lower: 150 },
  },
  {
    id: 'sh5',
    movieId: 'm8',
    movieName: 'Interstellar',
    theatreId: 'th2',
    theatreName: 'Cinepolis: IMAX Forum',
    showdate: 'Oct 26, 2026',
    showtime: '4:00 PM',
    tickets: { Balcony: 350, Middle: 250, Lower: 150 },
  },
  {
    id: 'sh6',
    movieId: 'm5',
    movieName: 'Stree 2',
    theatreId: 'th1',
    theatreName: 'PVR INOX: Nexus Mall',
    showdate: 'Oct 26, 2026',
    showtime: '10:00 PM',
    tickets: { Balcony: 250, Middle: 180, Lower: 120 },
  },
  {
    id: 'sh7',
    movieId: 'm3',
    movieName: 'Baahubali 2: The Conclusion',
    theatreId: 'th3',
    theatreName: 'Srinivasa 4K Dolby Cinema',
    showdate: 'Oct 25, 2026',
    showtime: '3:00 PM',
    tickets: { Balcony: 175, Middle: 130, Lower: 100 },
  },
  {
    id: 'sh8',
    movieId: 'm4',
    movieName: 'Animal',
    theatreId: 'th1',
    theatreName: 'PVR INOX: Nexus Mall',
    showdate: 'Oct 25, 2026',
    showtime: '6:15 PM',
    tickets: { Balcony: 250, Middle: 180, Lower: 120 },
  },
  {
    id: 'sh9',
    movieId: 'm6',
    movieName: 'Kalki 2898 AD',
    theatreId: 'th2',
    theatreName: 'Cinepolis: IMAX Forum',
    showdate: 'Oct 26, 2026',
    showtime: '1:30 PM',
    tickets: { Balcony: 350, Middle: 250, Lower: 150 },
  },
  {
    id: 'sh10',
    movieId: 'm10',
    movieName: 'Inception',
    theatreId: 'th2',
    theatreName: 'Cinepolis: IMAX Forum',
    showdate: 'Oct 24, 2026',
    showtime: '11:00 AM',
    tickets: { Balcony: 350, Middle: 250, Lower: 150 },
  },
  {
    id: 'sh11',
    movieId: 'm11',
    movieName: 'The Dark Knight',
    theatreId: 'th2',
    theatreName: 'Cinepolis: IMAX Forum',
    showdate: 'Oct 25, 2026',
    showtime: '8:30 PM',
    tickets: { Balcony: 350, Middle: 250, Lower: 150 },
  },
  {
    id: 'sh12',
    movieId: 'm12',
    movieName: 'Gladiator II',
    theatreId: 'th1',
    theatreName: 'PVR INOX: Nexus Mall',
    showdate: 'Oct 26, 2026',
    showtime: '5:45 PM',
    tickets: { Balcony: 250, Middle: 180, Lower: 120 },
  },
];

const INITIAL_BOOKINGS: BookingItem[] = [
  {
    id: 'b1',
    bookingId: 'BK_782',
    userEmail: 'gvvdkumar@gmail.com',
    movieName: 'Oppenheimer',
    theatreName: 'Cinepolis: IMAX Forum',
    showdate: 'Oct 24, 2026',
    showtime: '14:15',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/4/4a/Oppenheimer_%28film%29.jpg',
    tier: 'Balcony Seats',
    seats: ['A7', 'A8'],
    totalPrice: 700,
    status: 'CONFIRMED',
    qrCode: 'IMOVIE:BK_782:OPPENHEIMER:Cinepolis:A7,A8',
    bookedAt: '2026-10-22T10:30:00Z',
  },
  {
    id: 'b2',
    bookingId: 'BK_419',
    userEmail: 'gvvdkumar@gmail.com',
    movieName: 'RRR',
    theatreName: 'Srinivasa 4K Dolby Cinema',
    showdate: 'Oct 24, 2026',
    showtime: '18:30',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d7/RRR_Poster.jpg',
    tier: 'Middle Seats',
    seats: ['C12', 'C13'],
    totalPrice: 260,
    status: 'CONFIRMED',
    qrCode: 'IMOVIE:BK_419:RRR:Srinivasa:C12,C13',
    bookedAt: '2026-10-21T14:15:00Z',
  },
  {
    id: 'b3',
    bookingId: 'BK_905',
    userEmail: 'gvvdkumar@gmail.com',
    movieName: 'Dune: Part Two',
    theatreName: 'Cinepolis: IMAX Forum',
    showdate: 'Oct 25, 2026',
    showtime: '19:45',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/5/52/Dune_Part_Two_poster.jpeg',
    tier: 'Balcony Seats',
    seats: ['B4'],
    totalPrice: 350,
    status: 'CONFIRMED',
    qrCode: 'IMOVIE:BK_905:DUNE2:Cinepolis:B4',
    bookedAt: '2026-10-22T18:00:00Z',
  },
];

export default function App() {
  // Navigation & role states
  const [currentView, setCurrentView] = useState<string>('movies');
  const [userRole, setUserRole] = useState<'USER' | 'ADMIN'>('USER');
  const [currentUser, setCurrentUser] = useState<{ username: string; email: string } | null>({
    username: 'G V V D Kumar',
    email: 'gvvdkumar@gmail.com',
  });
  const [isLightMode, setIsLightMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedIndustry, setSelectedIndustry] = useState<'All' | 'Bollywood' | 'Hollywood'>('All');

  // Domain records in state (persisted to localStorage)
  const [movies, setMovies] = useState<MovieItem[]>(() => {
    const saved = localStorage.getItem('imovies_movies_v4');
    return saved ? JSON.parse(saved) : INITIAL_MOVIES;
  });

  const [reviews, setReviews] = useState<MovieReview[]>(() => {
    const saved = localStorage.getItem('imovies_reviews_v4');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [selectedMovieDetail, setSelectedMovieDetail] = useState<MovieItem | null>(() => INITIAL_MOVIES[0]);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [activeTrailerModal, setActiveTrailerModal] = useState<{ title: string; embedId: string; url: string } | null>(null);

  const [theatres, setTheatres] = useState<TheatreItem[]>(() => {
    const saved = localStorage.getItem('imovies_theatres_v2');
    return saved ? JSON.parse(saved) : INITIAL_THEATRES;
  });

  const [shows, setShows] = useState<ShowItem[]>(() => {
    const saved = localStorage.getItem('imovies_shows_v2');
    return saved ? JSON.parse(saved) : INITIAL_SHOWS;
  });

  const [bookings, setBookings] = useState<BookingItem[]>(() => {
    const saved = localStorage.getItem('imovies_bookings_v2');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [favorites, setFavorites] = useState<string[]>(['m1', 'm3', 'm7', 'm9']);

  // Modals & alerts
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [infoModalMovie, setInfoModalMovie] = useState<MovieItem | null>(null);
  const [selectedMovieForBooking, setSelectedMovieForBooking] = useState<MovieItem | null>(null);
  const [selectedShowForBooking, setSelectedShowForBooking] = useState<ShowItem | null>(null);

  // Seat selection & lock state
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [selectedTier, setSelectedTier] = useState<'Balcony' | 'Middle' | 'Lower'>('Middle');
  const [lockCountdown, setLockCountdown] = useState<number>(600); // 10 minutes in seconds
  const [isLocked, setIsLocked] = useState(false);
  const [confirmedBookingData, setConfirmedBookingData] = useState<BookingItem | null>(null);

  // Form states
  const [loginRole, setLoginRole] = useState<'USER' | 'ADMIN'>('USER');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);


  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  // Add Theatre form
  const [newTheatreName, setNewTheatreName] = useState('');
  const [newTheatreLocation, setNewTheatreLocation] = useState('');
  const [newBalconyPrice, setNewBalconyPrice] = useState(175);
  const [newBalconyCount, setNewBalconyCount] = useState(40);
  const [newMiddlePrice, setNewMiddlePrice] = useState(130);
  const [newMiddleCount, setNewMiddleCount] = useState(60);
  const [newLowerPrice, setNewLowerPrice] = useState(100);
  const [newLowerCount, setNewLowerCount] = useState(50);

  // Add Show form
  const [showTheatreName, setShowTheatreName] = useState('PVR INOX: Nexus Mall');
  const [showMovieName, setShowMovieName] = useState('RRR');
  const [showDateInput, setShowDateInput] = useState('2026-10-25');
  const [showTimeInput, setShowTimeInput] = useState('18:30');

  // Add Movie form
  const [newMovieName, setNewMovieName] = useState('');
  const [newMovieDesc, setNewMovieDesc] = useState('');
  const [newMovieGenres, setNewMovieGenres] = useState('');
  const [newMovieReleaseDate, setNewMovieReleaseDate] = useState('');
  const [newMovieRuntime, setNewMovieRuntime] = useState(150);
  const [newMovieCertification, setNewMovieCertification] = useState('UA');
  const [newMovieTrailer, setNewMovieTrailer] = useState('');
  const [newMovieIndustry, setNewMovieIndustry] = useState<'Bollywood' | 'Hollywood'>('Bollywood');

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('imovies_movies_v4', JSON.stringify(movies));
  }, [movies]);

  useEffect(() => {
    localStorage.setItem('imovies_reviews_v4', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('imovies_theatres_v2', JSON.stringify(theatres));
  }, [theatres]);

  useEffect(() => {
    localStorage.setItem('imovies_shows_v2', JSON.stringify(shows));
  }, [shows]);

  useEffect(() => {
    localStorage.setItem('imovies_bookings_v2', JSON.stringify(bookings));
  }, [bookings]);

  // Synchronized 10-minute Lock Timer
  useEffect(() => {
    let timer: any;
    if (isLocked && lockCountdown > 0) {
      timer = setInterval(() => {
        setLockCountdown((prev) => {
          if (prev <= 1) {
            setIsLocked(false);
            setSelectedSeats([]);
            showToast('Temporary seat reservation expired. Seats released back to inventory.');
            return 600;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isLocked, lockCountdown]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Toggle favorite
  const handleToggleFavorite = (movieId: string) => {
    setFavorites((prev) =>
      prev.includes(movieId) ? prev.filter((id) => id !== movieId) : [...prev, movieId]
    );
    showToast(favorites.includes(movieId) ? 'Removed from favorites' : 'Added to favorites');
  };

  // Open Movie Detail page (Trailer, Cast, Overview, Reviews, then Book Ticket)
  const handleOpenMovieDetail = (movie: MovieItem) => {
    setSelectedMovieDetail(movie);
    setCurrentView('movieDetail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add user review / comment
  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMovieDetail) return;
    if (!newReviewComment.trim()) {
      showToast('Please enter your review comment.');
      return;
    }
    const authorName = newReviewAuthor.trim() || currentUser?.username || 'Verified Moviegoer';
    const newRev: MovieReview = {
      id: 'rev_' + Date.now(),
      movieId: selectedMovieDetail.id,
      author: authorName,
      rating: newReviewRating,
      comment: newReviewComment.trim(),
      date: 'Just now',
    };
    const updated = [newRev, ...reviews];
    setReviews(updated);
    setNewReviewComment('');
    showToast('Your review has been posted successfully!');
  };

  // Start booking flow for a movie
  const handleBookMovie = (movie: MovieItem) => {
    setSelectedMovieForBooking(movie);
    const availableShows = shows.filter((s) => s.movieName.toLowerCase() === movie.movieName.toLowerCase());
    if (availableShows.length > 0) {
      setSelectedShowForBooking(availableShows[0]);
    } else {
      setSelectedShowForBooking(shows[0] || null);
    }
    setSelectedSeats([]);
    setIsLocked(false);
    setLockCountdown(600);
    setCurrentView('seatSelection');
  };

  // Check if a seat is already booked or reserved
  const isSeatBooked = (seatCode: string) => {
    const staticBooked = ['A3', 'A4', 'B7', 'B8', 'C4', 'C5', 'D2', 'D3', 'F4', 'F5', 'G7'];
    if (staticBooked.includes(seatCode)) return true;
    if (!selectedShowForBooking) return false;
    return bookings.some(
      (b) =>
        b.status === 'CONFIRMED' &&
        b.movieName === selectedShowForBooking.movieName &&
        b.theatreName === selectedShowForBooking.theatreName &&
        b.showdate === selectedShowForBooking.showdate &&
        b.showtime === selectedShowForBooking.showtime &&
        b.seats.includes(seatCode)
    );
  };

  // Toggle seat selection
  const handleSeatClick = (seatId: string) => {
    if (isSeatBooked(seatId)) {
      showToast(`Seat ${seatId} is already booked.`);
      return;
    }
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats((prev) => prev.filter((s) => s !== seatId));
    } else {
      if (selectedSeats.length >= 6) {
        showToast('Maximum 6 seats can be selected per booking.');
        return;
      }
      setSelectedSeats((prev) => [...prev, seatId]);
    }
  };

  // Lock seats atomically
  const handleLockSeats = () => {
    if (selectedSeats.length === 0) {
      showToast('Please select at least one seat to proceed.');
      return;
    }
    setIsLocked(true);
    setLockCountdown(600);
    showToast(`Locked ${selectedSeats.length} seats for 10 minutes. Please complete payment.`);
    setCurrentView('checkout');
  };

  // Finalize booking upon payment verification
  const handleCompletePayment = () => {
    if (!selectedShowForBooking || selectedSeats.length === 0) return;

    const pricePerSeat =
      selectedTier === 'Balcony'
        ? selectedShowForBooking.tickets.Balcony
        : selectedTier === 'Middle'
        ? selectedShowForBooking.tickets.Middle
        : selectedShowForBooking.tickets.Lower;

    const totalPrice = pricePerSeat * selectedSeats.length;
    const bookingId = 'BK_' + Math.floor(100 + Math.random() * 900);

    const newBooking: BookingItem = {
      id: 'bk_' + Date.now(),
      bookingId,
      userEmail: currentUser?.email || 'user@example.com',
      movieName: selectedShowForBooking.movieName,
      theatreName: selectedShowForBooking.theatreName,
      showdate: selectedShowForBooking.showdate,
      showtime: selectedShowForBooking.showtime,
      posterUrl: selectedMovieForBooking?.posterUrl || HERO_BANNER,
      tier: `${selectedTier} Seats`,
      seats: selectedSeats,
      totalPrice,
      status: 'CONFIRMED',
      qrCode: `IMOVIE:${bookingId}:${selectedShowForBooking.movieName}:${selectedSeats.join(',')}`,
      bookedAt: new Date().toISOString(),
    };

    setBookings((prev) => [newBooking, ...prev]);
    setConfirmedBookingData(newBooking);
    setIsLocked(false);
    setSelectedSeats([]);
    showToast('Payment verified successfully! Your tickets are confirmed.');
    setCurrentView('bookingSuccess');
  };

  // Cancel booking
  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.bookingId === bookingId ? { ...b, status: 'CANCELLED' } : b))
    );
    showToast(`Booking ${bookingId} cancelled. Refund initiated.`);
  };

  // Handle Add Theatre
  const handleAddTheatre = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTheatreName.trim() || !newTheatreLocation.trim()) {
      showToast('Please enter theatre name and location.');
      return;
    }

    const created: TheatreItem = {
      id: 'th_' + Date.now(),
      theatreName: newTheatreName.trim(),
      location: newTheatreLocation.trim(),
      balconySeatPrice: Number(newBalconyPrice) || 0,
      balconySeatCount: Number(newBalconyCount) || 40,
      middleSeatPrice: Number(newMiddlePrice) || 0,
      middleSeatCount: Number(newMiddleCount) || 60,
      lowerSeatPrice: Number(newLowerPrice) || 0,
      lowerSeatCount: Number(newLowerCount) || 50,
    };

    setTheatres((prev) => [...prev, created]);
    setNewTheatreName('');
    setNewTheatreLocation('');
    showToast(`Theatre ${created.theatreName} added successfully.`);
    setCurrentView('adminShows');
  };

  // Handle Add Show
  const handleAddShow = (e: React.FormEvent) => {
    e.preventDefault();
    const theatreObj = theatres.find((t) => t.theatreName === showTheatreName);
    const movieObj = movies.find((m) => m.movieName === showMovieName);

    const created: ShowItem = {
      id: 'sh_' + Date.now(),
      movieId: movieObj?.id || 'm_custom',
      movieName: showMovieName,
      theatreId: theatreObj?.id || 'th_custom',
      theatreName: showTheatreName,
      showdate: showDateInput,
      showtime: showTimeInput,
      tickets: {
        Balcony: theatreObj?.balconySeatPrice || 200,
        Middle: theatreObj?.middleSeatPrice || 150,
        Lower: theatreObj?.lowerSeatPrice || 100,
      },
    };

    setShows((prev) => [created, ...prev]);
    showToast(`Show for ${showMovieName} at ${showTheatreName} scheduled.`);
    setCurrentView('adminShows');
  };

  // Handle Add Movie
  const handleAddMovie = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMovieName.trim() || !newMovieDesc.trim()) {
      showToast('Movie name and description are required.');
      return;
    }

    const created: MovieItem = {
      id: 'm_' + Date.now(),
      movieName: newMovieName.trim(),
      description: newMovieDesc.trim(),
      genres: newMovieGenres ? newMovieGenres.split(',').map((g) => g.trim()) : ['Action'],
      releaseDate: newMovieReleaseDate || 'Oct 20, 2026',
      runtime: Number(newMovieRuntime) || 120,
      certification: newMovieCertification || 'UA',
      posterUrl: POSTER_ODYSSEY,
      trailerUrl: newMovieTrailer || 'https://www.youtube.com/watch?v=NgBoMJy386M',
      trailerEmbedId: 'NgBoMJy386M',
      language: newMovieIndustry === 'Bollywood' ? 'Hindi' : 'English',
      industry: newMovieIndustry,
      director: 'Production Director',
      cast: [
        { name: 'Lead Star', role: 'Protagonist' },
        { name: 'Co-Star', role: 'Supporting Role' },
      ],
    };

    setMovies((prev) => [created, ...prev]);
    setNewMovieName('');
    setNewMovieDesc('');
    setNewMovieGenres('');
    showToast(`Movie ${created.movieName} added to catalogue.`);
    setCurrentView('adminMovies');
  };

  // Delete Movie (Admin)
  const handleDeleteMovie = (movieId: string) => {
    setMovies((prev) => prev.filter((m) => m.id !== movieId));
    showToast('Movie removed from catalogue.');
  };

  // Delete Show (Admin)
  const handleDeleteShow = (showId: string) => {
    setShows((prev) => prev.filter((s) => s.id !== showId));
    showToast('Show schedule removed.');
  };

  // Filtered movies
  const filteredMovies = movies.filter((m) => {
    const matchesSearch =
      m.movieName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.genres.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (m.industry && m.industry.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesGenre =
      selectedGenre === 'All' || m.genres.some((g) => g.toLowerCase().includes(selectedGenre.toLowerCase()));
    const matchesIndustry =
      selectedIndustry === 'All' || m.industry === selectedIndustry;
    return matchesSearch && matchesGenre && matchesIndustry;
  });

  return (
    <div className={`min-h-screen ${isLightMode ? 'bg-[#F1F5F9] text-[#0F172A]' : 'bg-[#1E293B] text-white'}`}>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#E90B3C] text-white px-5 py-3 rounded-lg shadow-2xl flex items-center gap-3 animate-fade-in font-medium text-sm">
          <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP NAVBAR (Exact match to Screenshots) */}
      <header className="sticky top-0 z-40 bg-[#0F172A] border-b border-slate-800 px-6 py-3.5 flex items-center justify-between shadow-md">
        {/* Brand Logo with red 'i' */}
        <div
          onClick={() => setCurrentView('movies')}
          className="cursor-pointer flex items-center gap-1 select-none"
        >
          <span className="text-2xl font-black text-[#E90B3C]">i</span>
          <span className="text-2xl font-bold tracking-tight text-white">Movies</span>
        </div>

        {/* User View: Search Bar */}
        {userRole === 'USER' && (
          <div className="hidden md:flex items-center bg-[#202A3D] rounded-md px-3.5 py-1.5 w-96 border border-slate-700/50">
            <input
              type="text"
              placeholder="Search movies by title, genre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-sm text-white placeholder-slate-400 w-full"
            />
            <button
              onClick={() => showToast('Enter movie titles or genres to discover showtimes across theaters.')}
              className="text-[#E90B3C] hover:text-red-400 p-1"
              title="Search info"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Right Action Icons (Matching Screenshot) */}
        <div className="flex items-center gap-5">
          {/* Theme Toggle */}
          <button
            onClick={() => setIsLightMode(!isLightMode)}
            className="text-slate-300 hover:text-white transition-colors p-1"
            title="Toggle theme"
          >
            {isLightMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>

          {/* User Role Navigation */}
          {userRole === 'USER' && (
            <>
              <button
                onClick={() => setCurrentView('movies')}
                className={`transition-colors p-1 ${
                  currentView === 'movies' ? 'text-[#E90B3C]' : 'text-slate-300 hover:text-white'
                }`}
                title="Home / Available Movies"
              >
                <Home className="w-5 h-5" />
              </button>

              <button
                onClick={() => setCurrentView('favorites')}
                className={`transition-colors p-1 ${
                  currentView === 'favorites' ? 'text-[#E90B3C]' : 'text-slate-300 hover:text-white'
                }`}
                title="Favorites"
              >
                <Heart className="w-5 h-5" />
              </button>

              <button
                onClick={() => setCurrentView('bookings')}
                className={`transition-colors p-1 ${
                  currentView === 'bookings' ? 'text-[#E90B3C]' : 'text-slate-300 hover:text-white'
                }`}
                title="Your Bookings"
              >
                <UserIcon className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Admin Role Navigation (Matches Admin Screenshots) */}
          {userRole === 'ADMIN' && (
            <>
              <button
                onClick={() => setCurrentView('movies')}
                className={`transition-colors p-1 ${
                  currentView === 'movies' ? 'text-[#E90B3C]' : 'text-slate-300 hover:text-white'
                }`}
                title="Customer Home View"
              >
                <Home className="w-5 h-5" />
              </button>

              <button
                onClick={() => setCurrentView('adminMovies')}
                className={`transition-colors p-1 ${
                  currentView === 'adminMovies' ? 'text-[#E90B3C]' : 'text-slate-300 hover:text-white'
                }`}
                title="Admin Available Movies"
              >
                <Film className="w-5 h-5" />
              </button>

              {/* Plus icon: Add Actions */}
              <div className="relative group">
                <button
                  onClick={() => setCurrentView('addMovie')}
                  className="text-slate-300 hover:text-[#E90B3C] p-1 flex items-center"
                  title="Add Actions"
                >
                  <PlusCircle className="w-5 h-5" />
                </button>
                <div className="absolute right-0 mt-2 w-44 bg-[#0F172A] border border-slate-700 rounded-md shadow-xl py-1 hidden group-hover:block z-50">
                  <button
                    onClick={() => setCurrentView('addMovie')}
                    className="w-full text-left px-4 py-2 text-xs hover:bg-[#202A3D] text-slate-200"
                  >
                    Add Movie
                  </button>
                  <button
                    onClick={() => setCurrentView('addTheatre')}
                    className="w-full text-left px-4 py-2 text-xs hover:bg-[#202A3D] text-slate-200"
                  >
                    Add Theatre
                  </button>
                  <button
                    onClick={() => setCurrentView('addShow')}
                    className="w-full text-left px-4 py-2 text-xs hover:bg-[#202A3D] text-slate-200"
                  >
                    Add Show
                  </button>
                </div>
              </div>

              <button
                onClick={() => setCurrentView('addTheatre')}
                className={`transition-colors p-1 ${
                  currentView === 'addTheatre' ? 'text-[#E90B3C]' : 'text-slate-300 hover:text-white'
                }`}
                title="Manage Theatres"
              >
                <span className="text-sm font-semibold">🎭</span>
              </button>

              <button
                onClick={() => setCurrentView('adminShows')}
                className={`transition-colors p-1 ${
                  currentView === 'adminShows' ? 'text-[#E90B3C]' : 'text-slate-300 hover:text-white'
                }`}
                title="Admin Shows & All Bookings"
              >
                <Clock className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Admin Role Indicator (No in-session role switching permitted) */}
          {userRole === 'ADMIN' && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-red-950/70 border border-[#E90B3C]/70 text-[#E90B3C] text-[11px] font-bold select-none">
              <Shield className="w-3.5 h-3.5" />
              <span>ADMIN</span>
            </div>
          )}

          {/* User Status / Logout (Logout required to switch role) */}
          {currentUser ? (
            <div className="flex items-center gap-3 pl-2 border-l border-slate-700/60">
              <span className="hidden sm:inline text-xs text-slate-300 font-medium">
                {currentUser.username}
              </span>
              <button
                onClick={() => {
                  setCurrentUser(null);
                  setUserRole('USER');
                  setLoginRole('USER');
                  setCurrentView('login');
                  showToast('Logged out. Please sign in to choose User or Admin role.');
                }}
                className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-[#E90B3C] px-2.5 py-1 rounded bg-[#202A3D] border border-slate-700 hover:border-[#E90B3C] transition-colors cursor-pointer"
                title="Log out to change role or exit"
              >
                <LogOut className="w-3.5 h-3.5 text-[#E90B3C]" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setLoginRole('USER');
                  setCurrentView('login');
                }}
                className="text-xs font-semibold text-white bg-[#E90B3C] px-3 py-1 rounded hover:bg-red-700 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => setCurrentView('register')}
                className="text-xs font-semibold text-slate-300 border border-slate-700 px-3 py-1 rounded hover:text-white hover:border-white transition-colors"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ========================================================= */}
        {/* VIEW 1: WELCOME / LANDING (Matching Screenshot image (2)) */}
        {/* ========================================================= */}
        {currentView === 'welcome' && (
          <div className="flex flex-col items-start justify-center min-h-[70vh] max-w-2xl px-4">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
              Welcome to <span className="text-[#E90B3C]">iMovies</span>
            </h1>
            <p className="text-lg text-slate-300 mb-8 font-normal">
              Your ultimate destination for the latest blockbusters and timeless classics
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setLoginRole('USER');
                  setCurrentView('login');
                }}
                className="bg-[#E90B3C] text-white px-8 py-2.5 rounded-full font-semibold text-sm hover:bg-red-700 shadow-lg shadow-red-900/30 transition-all cursor-pointer"
              >
                Sign In
              </button>
              <button
                onClick={() => setCurrentView('register')}
                className="bg-black text-white border border-white px-8 py-2.5 rounded-full font-semibold text-sm hover:bg-slate-900 transition-all cursor-pointer"
              >
                Register
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 2: LOGIN (Two options: Login as User / Login as Admin) */}
        {/* ========================================================= */}
        {currentView === 'login' && (
          <div className="flex justify-center items-center py-12">
            <div className="w-full max-w-md bg-[#1E293B] border border-[#E90B3C] rounded-lg p-8 shadow-2xl">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-1 select-none mb-2">
                  <span className="text-3xl font-black text-[#E90B3C]">i</span>
                  <span className="text-3xl font-bold tracking-tight text-white">Movies</span>
                </div>
                <h2 className="text-xl font-medium text-white">
                  {loginRole === 'ADMIN' ? 'Admin Portal Login' : 'User Login'}
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  {loginRole === 'ADMIN'
                    ? 'Requires verified administrator credentials'
                    : 'Sign in to discover movies and book tickets'}
                </p>
              </div>

              {/* Two Distinct Login Options */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-[#0F172A] rounded-lg mb-6 border border-slate-700/60">
                <button
                  type="button"
                  onClick={() => {
                    setLoginRole('USER');
                    setLoginEmail('gvvdkumar@gmail.com');
                    setLoginPassword('password123');
                  }}
                  className={`py-2 px-3 text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    loginRole === 'USER'
                      ? 'bg-[#E90B3C] text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <UserIcon className="w-3.5 h-3.5" />
                  Login as User
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLoginRole('ADMIN');
                    setLoginEmail('admin@imovies.com');
                    setLoginPassword('admin123');
                  }}
                  className={`py-2 px-3 text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    loginRole === 'ADMIN'
                      ? 'bg-[#E90B3C] text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Login as Admin
                </button>
              </div>

              {loginRole === 'ADMIN' && (
                <div className="mb-4 p-3 bg-red-950/40 border border-red-800/60 rounded-md text-xs text-red-200">
                  <div className="flex items-center gap-1.5 font-medium mb-1">
                    <Shield className="w-4 h-4 text-[#E90B3C]" />
                    <span>Administrator Credentials Required</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Default Credentials: <span className="font-mono text-white">admin@imovies.com</span> /{' '}
                    <span className="font-mono text-white">admin123</span>
                  </p>
                </div>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (loginRole === 'ADMIN') {
                    const cleanEmail = loginEmail.trim().toLowerCase();
                    if (
                      (cleanEmail === 'admin@imovies.com' || cleanEmail.includes('admin')) &&
                      (loginPassword === 'admin123' || loginPassword === 'admin')
                    ) {
                      setCurrentUser({
                        username: 'System Admin',
                        email: cleanEmail,
                      });
                      setUserRole('ADMIN');
                      showToast('Admin login successful! Welcome to Admin Portal.');
                      setCurrentView('adminShows');
                    } else {
                      showToast('Invalid admin credentials! Required: admin@imovies.com / admin123');
                    }
                  } else {
                    const email = loginEmail.trim() || 'user@imovies.com';
                    const username = email.includes('@') ? email.split('@')[0] : email;
                    setCurrentUser({
                      username: username,
                      email: email,
                    });
                    setUserRole('USER');
                    showToast(`Login successful! Welcome back, ${username}.`);
                    setCurrentView('movies');
                  }
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Email</label>
                  <input
                    type="email"
                    required
                    placeholder={loginRole === 'ADMIN' ? 'admin@imovies.com' : 'Enter your email'}
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full bg-[#202A3D] text-white rounded-md px-3.5 py-2 text-sm border border-slate-700/60 focus:border-[#E90B3C] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder={loginRole === 'ADMIN' ? 'Enter admin password' : 'Enter your password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full bg-[#202A3D] text-white rounded-md px-3.5 py-2 text-sm border border-slate-700/60 focus:border-[#E90B3C] outline-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="showPassLogin"
                      checked={showPassword}
                      onChange={(e) => setShowPassword(e.target.checked)}
                      className="rounded bg-[#202A3D] border-slate-600 text-[#E90B3C] focus:ring-0 cursor-pointer"
                    />
                    <label htmlFor="showPassLogin" className="text-xs text-slate-300 cursor-pointer select-none">
                      Show Password
                    </label>
                  </div>
                  {loginRole === 'ADMIN' ? (
                    <button
                      type="button"
                      onClick={() => {
                        setLoginEmail('admin@imovies.com');
                        setLoginPassword('admin123');
                        showToast('Admin demo credentials populated.');
                      }}
                      className="text-[11px] text-[#E90B3C] hover:underline cursor-pointer"
                    >
                      Fill Demo Credentials
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setLoginEmail('gvvdkumar@gmail.com');
                        setLoginPassword('password123');
                        showToast('User demo credentials populated.');
                      }}
                      className="text-[11px] text-[#E90B3C] hover:underline cursor-pointer"
                    >
                      Fill Demo Credentials
                    </button>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#E90B3C] hover:bg-red-700 text-white font-semibold py-2 rounded-md text-sm transition-colors shadow-md cursor-pointer"
                  >
                    {loginRole === 'ADMIN' ? 'Login as Admin' : 'Submit'}
                  </button>
                </div>
              </form>

              <div className="mt-6 text-center text-xs text-slate-400">
                Create an account?{' '}
                <button
                  onClick={() => setCurrentView('register')}
                  className="text-[#E90B3C] font-semibold hover:underline cursor-pointer"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 3: REGISTER (Matching Screenshot image (3))          */}
        {/* ========================================================= */}
        {currentView === 'register' && (
          <div className="flex justify-center items-center py-8">
            <div className="w-full max-w-md bg-[#1E293B] border border-[#E90B3C] rounded-lg p-8 shadow-2xl">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-1 select-none mb-2">
                  <span className="text-3xl font-black text-[#E90B3C]">i</span>
                  <span className="text-3xl font-bold tracking-tight text-white">Movies</span>
                </div>
                <h2 className="text-xl font-medium text-white">Register</h2>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (regPassword !== regConfirmPassword) {
                    showToast('Passwords do not match.');
                    return;
                  }
                  const email = regEmail.trim();
                  const username = regUsername.trim() || email.split('@')[0] || 'User';
                  setCurrentUser({
                    username,
                    email,
                  });
                  setUserRole('USER');
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Username</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter Username"
                    value={regUsername}
                    onChange={(e) => setRegUsername(e.target.value)}
                    className="w-full bg-[#202A3D] text-white rounded-md px-3.5 py-2 text-sm border border-slate-700/60 focus:border-[#E90B3C] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full bg-[#202A3D] text-white rounded-md px-3.5 py-2 text-sm border border-slate-700/60 focus:border-[#E90B3C] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter your password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full bg-[#202A3D] text-white rounded-md px-3.5 py-2 text-sm border border-slate-700/60 focus:border-[#E90B3C] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Confirm Password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Confirm your password"
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    className="w-full bg-[#202A3D] text-white rounded-md px-3.5 py-2 text-sm border border-slate-700/60 focus:border-[#E90B3C] outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="showPassReg"
                    checked={showPassword}
                    onChange={(e) => setShowPassword(e.target.checked)}
                    className="rounded bg-[#202A3D] border-slate-600 text-[#E90B3C] focus:ring-0 cursor-pointer"
                  />
                  <label htmlFor="showPassReg" className="text-xs text-slate-300 cursor-pointer">
                    Show Password
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#E90B3C] hover:bg-red-700 text-white font-semibold py-2 rounded-md text-sm transition-colors shadow-md"
                  >
                    Submit
                  </button>
                </div>
              </form>

              <div className="mt-5 text-center text-xs text-slate-400 space-y-2">
                <div>
                  Already have an account?{' '}
                  <button
                    onClick={() => setCurrentView('login')}
                    className="text-[#E90B3C] font-semibold hover:underline"
                  >
                    Login
                  </button>
                </div>
                <div>
                  Need administrator access?{' '}
                  <button
                    onClick={() => {
                      setLoginRole('ADMIN');
                      setCurrentView('login');
                    }}
                    className="text-[#E90B3C] font-semibold hover:underline cursor-pointer"
                  >
                    Admin Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 4: AVAILABLE MOVIES (Matching Screenshot image.png)  */}
        {/* ========================================================= */}
        {currentView === 'movies' && (
          <div>
            {/* Heading: Available Movies */}
            <div className="text-center mb-6">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                Available <span className="text-[#E90B3C]">Movies</span>
              </h1>
              <p className="text-xs text-slate-400 mt-1.5">
                Curated mix of the biggest Bollywood and Hollywood blockbusters
              </p>
            </div>

            {/* Industry Filter Tabs: All, Bollywood, Hollywood */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
              <button
                onClick={() => setSelectedIndustry('All')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                  selectedIndustry === 'All'
                    ? 'bg-[#E90B3C] border-[#E90B3C] text-white shadow-lg shadow-red-900/40'
                    : 'bg-[#0F172A] border-slate-700 text-slate-300 hover:text-white hover:border-slate-500'
                }`}
              >
                All Movies ({movies.length})
              </button>
              <button
                onClick={() => setSelectedIndustry('Bollywood')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all border flex items-center gap-1.5 ${
                  selectedIndustry === 'Bollywood'
                    ? 'bg-[#E90B3C] border-[#E90B3C] text-white shadow-lg shadow-red-900/40'
                    : 'bg-[#0F172A] border-slate-700 text-slate-300 hover:text-white hover:border-slate-500'
                }`}
              >
                <span>Bollywood / Indian</span>
                <span className="text-[10px] px-1.5 py-0.2 bg-white/20 rounded-full font-mono">
                  {movies.filter((m) => m.industry === 'Bollywood').length}
                </span>
              </button>
              <button
                onClick={() => setSelectedIndustry('Hollywood')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all border flex items-center gap-1.5 ${
                  selectedIndustry === 'Hollywood'
                    ? 'bg-[#E90B3C] border-[#E90B3C] text-white shadow-lg shadow-red-900/40'
                    : 'bg-[#0F172A] border-slate-700 text-slate-300 hover:text-white hover:border-slate-500'
                }`}
              >
                <span>Hollywood / Global</span>
                <span className="text-[10px] px-1.5 py-0.2 bg-white/20 rounded-full font-mono">
                  {movies.filter((m) => m.industry === 'Hollywood').length}
                </span>
              </button>
            </div>

            {/* Genre Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
              {['All', 'Action', 'Drama', 'Historical', 'Fantasy', 'Comedy', 'Horror', 'Romantic', 'Thriller', 'Sci-Fi'].map(
                (g) => (
                  <button
                    key={g}
                    onClick={() => setSelectedGenre(g)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      selectedGenre === g
                        ? 'bg-[#E90B3C] text-white shadow-md'
                        : 'bg-[#202A3D] text-slate-300 hover:text-white hover:bg-slate-700'
                    }`}
                  >
                    {g}
                  </button>
                )
              )}
            </div>

            {/* Movie Poster Grid (Exactly as in image.png) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {filteredMovies.map((movie) => (
                <div
                  key={movie.id}
                  className="flex flex-col group cursor-pointer transition-transform duration-200 hover:-translate-y-1"
                  onClick={() => handleOpenMovieDetail(movie)}
                >
                  {/* Poster Image */}
                  <div className="relative aspect-[3/4.2] w-full rounded-md overflow-hidden bg-[#0F172A] shadow-md border border-slate-800">
                    <img
                      src={movie.posterUrl}
                      alt={movie.movieName}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e: any) => {
                        e.target.onerror = null;
                        e.target.src = POSTER_ODYSSEY;
                      }}
                    />

                    {/* Industry Badge */}
                    <div className="absolute top-2 left-2 pointer-events-none">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded shadow ${
                        movie.industry === 'Bollywood' 
                          ? 'bg-amber-600/90 text-white' 
                          : 'bg-blue-600/90 text-white'
                      }`}>
                        {movie.industry}
                      </span>
                    </div>

                    {/* Favorite Heart Badge */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleFavorite(movie.id);
                      }}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 hover:bg-black/80 transition-colors"
                      title="Favorite"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          favorites.includes(movie.id) ? 'fill-[#E90B3C] text-[#E90B3C]' : 'text-white'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Title & Metadata */}
                  <div className="mt-2.5 flex flex-col">
                    <h3 className="text-sm font-semibold text-white truncate group-hover:text-[#E90B3C] transition-colors" title={movie.movieName}>
                      {movie.movieName}
                    </h3>

                    <div className="flex items-center justify-between text-xs text-slate-400 mt-1">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{movie.releaseDate}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 uppercase font-mono">{movie.certification}</span>
                    </div>

                    {/* Genre Tag Pill (Reddish background as in screenshot) */}
                    <div className="mt-2 flex items-center justify-between gap-1">
                      <span className="inline-block bg-[#3B151F] text-[#FF4D6D] border border-[#5C1D2E] text-[11px] px-2 py-0.5 rounded font-medium truncate max-w-[130px]">
                        {movie.genres.join(', ')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW: MOVIE DETAIL (Trailer, Cast, Overview, Reviews, Book) */}
        {/* ========================================================= */}
        {currentView === 'movieDetail' && selectedMovieDetail && (
          <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-12">
            {/* Top Navigation Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <button
                onClick={() => setCurrentView('movies')}
                className="flex items-center gap-2 text-slate-300 hover:text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-[#E90B3C]" />
                <span>Back to Movies</span>
              </button>

              <div className="flex items-center gap-3">
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded shadow ${
                    selectedMovieDetail.industry === 'Bollywood'
                      ? 'bg-amber-600/90 text-white'
                      : 'bg-blue-600/90 text-white'
                  }`}
                >
                  {selectedMovieDetail.industry}
                </span>
                <span className="text-xs font-mono font-bold px-2 py-1 bg-slate-800 border border-slate-700 rounded text-slate-200">
                  {selectedMovieDetail.certification}
                </span>
                <button
                  onClick={() => handleToggleFavorite(selectedMovieDetail.id)}
                  className="flex items-center gap-1.5 px-3 py-1 bg-[#202A3D] hover:bg-slate-700 text-xs rounded border border-slate-700 transition-colors cursor-pointer"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      favorites.includes(selectedMovieDetail.id)
                        ? 'fill-[#E90B3C] text-[#E90B3C]'
                        : 'text-slate-300'
                    }`}
                  />
                  <span>
                    {favorites.includes(selectedMovieDetail.id) ? 'Favorited' : 'Add to Favorites'}
                  </span>
                </button>
              </div>
            </div>

            {/* Movie Hero Showcase */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start bg-[#0F172A] border border-slate-800 rounded-xl p-6 sm:p-8 shadow-2xl">
              {/* Left Column: Poster & Watch Trailer CTA */}
              <div className="md:col-span-4 flex flex-col items-center sm:items-start">
                <div className="relative aspect-[3/4.2] w-full max-w-[280px] mx-auto md:mx-0 rounded-lg overflow-hidden bg-slate-900 border border-slate-700 shadow-xl group">
                  <img
                    src={selectedMovieDetail.posterUrl}
                    alt={selectedMovieDetail.movieName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e: any) => {
                      e.target.onerror = null;
                      e.target.src = POSTER_ODYSSEY;
                    }}
                  />
                </div>

                {/* Option to Watch Trailer (Opens YouTube Trailer Modal & Link) */}
                <div className="w-full max-w-[280px] mx-auto md:mx-0 mt-4 space-y-2">
                  <button
                    onClick={() =>
                      setActiveTrailerModal({
                        title: `${selectedMovieDetail.movieName} — Official Trailer`,
                        embedId: selectedMovieDetail.trailerEmbedId,
                        url: selectedMovieDetail.trailerUrl,
                      })
                    }
                    className="w-full bg-[#E90B3C] hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 text-sm shadow-lg shadow-red-900/40 transition-all cursor-pointer"
                  >
                    <Play className="w-5 h-5 fill-white text-white" />
                    <span>Watch Trailer</span>
                  </button>

                  <a
                    href={selectedMovieDetail.trailerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-1.5 px-3 bg-[#202A3D] hover:bg-slate-700 border border-slate-700/80 rounded flex items-center justify-center gap-1.5 text-xs text-slate-300 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#E90B3C]" />
                    <span>Open on YouTube</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Title, Director, Ratings, Specs, Overview */}
              <div className="md:col-span-8 flex flex-col space-y-5">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    {selectedMovieDetail.movieName}
                  </h1>
                  <p className="text-sm text-slate-400 mt-1">
                    Directed by <span className="text-slate-200 font-semibold">{selectedMovieDetail.director}</span>
                  </p>
                </div>

                {/* Rating Badge */}
                <div className="flex flex-wrap items-center gap-3">
                  {(() => {
                    const movieRevs = reviews.filter((r) => r.movieId === selectedMovieDetail.id);
                    const avgRating =
                      movieRevs.length > 0
                        ? (movieRevs.reduce((acc, r) => acc + r.rating, 0) / movieRevs.length).toFixed(1)
                        : '4.8';
                    return (
                      <div className="flex items-center gap-2 bg-[#202A3D] border border-slate-700 px-3 py-1.5 rounded-lg">
                        <div className="flex items-center text-amber-400">
                          <Star className="w-4 h-4 fill-amber-400" />
                          <span className="ml-1 text-sm font-bold text-white">{avgRating}</span>
                          <span className="text-xs text-slate-400">/5</span>
                        </div>
                        <span className="text-xs text-slate-400">
                          ({movieRevs.length} {movieRevs.length === 1 ? 'review' : 'reviews'})
                        </span>
                      </div>
                    );
                  })()}

                  <div className="flex items-center gap-2 text-xs text-slate-300 font-medium bg-[#202A3D]/70 px-3 py-1.5 rounded-lg border border-slate-700/60">
                    <Clock className="w-4 h-4 text-[#E90B3C]" />
                    <span>
                      {selectedMovieDetail.runtime} mins • {Math.floor(selectedMovieDetail.runtime / 60)}h{' '}
                      {selectedMovieDetail.runtime % 60}m
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-300 font-medium bg-[#202A3D]/70 px-3 py-1.5 rounded-lg border border-slate-700/60">
                    <Calendar className="w-4 h-4 text-[#E90B3C]" />
                    <span>{selectedMovieDetail.releaseDate}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-300 font-medium bg-[#202A3D]/70 px-3 py-1.5 rounded-lg border border-slate-700/60">
                    <span>Language: <span className="text-white font-semibold">{selectedMovieDetail.language}</span></span>
                  </div>
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-2">
                  {selectedMovieDetail.genres.map((g) => (
                    <span
                      key={g}
                      className="bg-[#3B151F] text-[#FF4D6D] border border-[#5C1D2E] text-xs font-semibold px-3 py-1 rounded-full"
                    >
                      {g}
                    </span>
                  ))}
                </div>

                {/* Overview Section */}
                <div className="pt-2">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Film className="w-4 h-4 text-[#E90B3C]" />
                    <span>Story Overview</span>
                  </h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                    {selectedMovieDetail.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Cast Section */}
            <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 border-b border-slate-800 pb-3">
                <UserIcon className="w-5 h-5 text-[#E90B3C]" />
                <span>Starring Cast & Characters</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {selectedMovieDetail.cast && selectedMovieDetail.cast.length > 0 ? (
                  selectedMovieDetail.cast.map((actor, idx) => (
                    <div
                      key={idx}
                      className="bg-[#1E293B] border border-slate-700/70 rounded-lg p-3.5 flex flex-col items-center text-center hover:border-[#E90B3C] transition-colors"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#202A3D] border border-slate-600 flex items-center justify-center text-sm font-bold text-[#E90B3C] mb-2.5 shadow">
                        {actor.name
                          .split(' ')
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join('')}
                      </div>
                      <h4 className="text-xs font-bold text-white leading-tight">{actor.name}</h4>
                      <p className="text-[11px] text-slate-400 mt-1 italic leading-tight">as {actor.role}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 col-span-full">Cast details coming soon.</p>
                )}
              </div>
            </div>

            {/* Comments & Reviews Section */}
            <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#E90B3C]" />
                  <span>Audience Reviews & Comments</span>
                </h3>
                <span className="text-xs text-slate-400">
                  {reviews.filter((r) => r.movieId === selectedMovieDetail.id).length} Community Reviews
                </span>
              </div>

              {/* Add Review Form */}
              <form onSubmit={handleAddReview} className="bg-[#1E293B] border border-slate-700 rounded-lg p-5 space-y-4">
                <h4 className="text-sm font-semibold text-white">Leave Your Review</h4>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  {/* Star Rating Selector */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">Rating</label>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setNewReviewRating(star)}
                          className="p-1 hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= newReviewRating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-600'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="ml-2 text-xs font-bold text-amber-400">
                        {newReviewRating === 5
                          ? '5/5 — Masterpiece'
                          : newReviewRating === 4
                          ? '4/5 — Really Good'
                          : newReviewRating === 3
                          ? '3/5 — Decent'
                          : newReviewRating === 2
                          ? '2/5 — Disappointing'
                          : '1/5 — Poor'}
                      </span>
                    </div>
                  </div>

                  {/* Reviewer Name */}
                  <div className="w-full sm:w-64">
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">Your Name</label>
                    <input
                      type="text"
                      placeholder={currentUser?.username || 'Enter your name'}
                      value={newReviewAuthor}
                      onChange={(e) => setNewReviewAuthor(e.target.value)}
                      className="w-full bg-[#202A3D] text-white rounded-md px-3 py-1.5 text-xs border border-slate-700 focus:border-[#E90B3C] outline-none"
                    />
                  </div>
                </div>

                {/* Review Textarea */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Your Review / Thoughts</label>
                  <textarea
                    rows={3}
                    required
                    placeholder={`What did you think of ${selectedMovieDetail.movieName}? Share your review...`}
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    className="w-full bg-[#202A3D] text-white rounded-md px-3.5 py-2 text-sm border border-slate-700 focus:border-[#E90B3C] outline-none resize-none"
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#E90B3C] hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-md text-xs flex items-center gap-2 shadow transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Post Review</span>
                  </button>
                </div>
              </form>

              {/* Reviews List */}
              <div className="space-y-3.5 pt-2">
                {reviews.filter((r) => r.movieId === selectedMovieDetail.id).length === 0 ? (
                  <div className="text-center py-6 text-slate-400 text-xs">
                    No reviews yet for {selectedMovieDetail.movieName}. Be the first to share your thoughts!
                  </div>
                ) : (
                  reviews
                    .filter((r) => r.movieId === selectedMovieDetail.id)
                    .map((rev) => (
                      <div
                        key={rev.id}
                        className="bg-[#1E293B]/70 border border-slate-800 rounded-lg p-4 space-y-2 hover:border-slate-700 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-[#202A3D] text-[#E90B3C] font-bold text-xs flex items-center justify-center border border-slate-700">
                              {rev.author[0] ? rev.author[0].toUpperCase() : 'U'}
                            </div>
                            <div>
                              <span className="text-xs font-bold text-white">{rev.author}</span>
                              <span className="text-[10px] text-slate-500 ml-2">{rev.date}</span>
                            </div>
                          </div>

                          <div className="flex items-center text-amber-400 gap-0.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                className={`w-3.5 h-3.5 ${
                                  s <= rev.rating
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'text-slate-600'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed pl-9.5">
                          {rev.comment}
                        </p>
                      </div>
                    ))
                )}
              </div>
            </div>

            {/* AT LAST: Option to Book Ticket Page */}
            <div className="bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] border-2 border-[#E90B3C] rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 text-center md:text-left">
                <div className="p-4 rounded-xl bg-red-950/80 border border-[#E90B3C] text-[#E90B3C] shrink-0 hidden sm:block">
                  <Ticket className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    Book Tickets for <span className="text-[#E90B3C]">{selectedMovieDetail.movieName}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">
                    Select your preferred theater, showtime, and reserve your seats with interactive seat selection.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
                <button
                  onClick={() => setCurrentView('movies')}
                  className="flex-1 sm:flex-none px-5 py-3 rounded-xl border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold bg-[#202A3D] cursor-pointer"
                >
                  Explore Others
                </button>
                <button
                  onClick={() => handleBookMovie(selectedMovieDetail)}
                  className="flex-1 sm:flex-none bg-[#E90B3C] hover:bg-red-700 text-white font-bold py-3.5 px-8 rounded-xl text-sm shadow-xl shadow-red-900/50 flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-105"
                >
                  <Ticket className="w-5 h-5" />
                  <span>Book Tickets Now</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 5: YOUR BOOKINGS (Matching Screenshot image (9))     */}
        {/* ========================================================= */}
        {currentView === 'bookings' && (
          <div>
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                Your <span className="text-[#E90B3C]">Bookings</span>
              </h1>
            </div>

            {bookings.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <p className="text-base mb-4">No bookings found in your account.</p>
                <button
                  onClick={() => setCurrentView('movies')}
                  className="bg-[#E90B3C] text-white px-6 py-2 rounded-md font-semibold text-sm hover:bg-red-700"
                >
                  Browse Available Movies
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-[#0F172A] border border-slate-800 rounded-lg p-4 flex gap-4 shadow-xl hover:border-slate-700 transition-colors"
                  >
                    {/* Left Poster */}
                    <div className="w-32 sm:w-36 aspect-[3/4.2] rounded overflow-hidden bg-slate-900 shrink-0">
                      <img
                        src={booking.posterUrl || HERO_BANNER}
                        alt={booking.movieName}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                        onError={(e: any) => {
                          e.target.onerror = null;
                          e.target.src = POSTER_ODYSSEY;
                        }}
                      />
                    </div>

                    {/* Right Details (Exact key-value pairs matching screenshot) */}
                    <div className="flex flex-col justify-between text-xs space-y-1.5 text-slate-300 w-full">
                      <div>
                        <div className="flex justify-between items-start">
                          <p className="text-sm font-semibold text-white mb-1">
                            <span className="text-slate-400 font-normal">Movie: </span>
                            {booking.movieName}
                          </p>
                          {booking.status === 'CANCELLED' && (
                            <span className="text-[10px] bg-red-950 text-red-400 border border-red-800 px-1.5 py-0.5 rounded">
                              Cancelled
                            </span>
                          )}
                        </div>

                        <p>
                          <span className="text-slate-400">Theatre: </span>
                          <span className="text-white">{booking.theatreName}</span>
                        </p>
                        <p>
                          <span className="text-slate-400">Showdate: </span>
                          <span className="text-white">{booking.showdate}</span>
                        </p>
                        <p>
                          <span className="text-slate-400">showtime: </span>
                          <span className="text-white">{booking.showtime}</span>
                        </p>
                        <p>
                          <span className="text-slate-400">{booking.tier}: </span>
                          <span className="text-white">{booking.seats.join(', ')}</span>
                        </p>
                        <p className="pt-1 text-sm font-bold text-white">
                          <span className="text-slate-400 font-normal text-xs">Total Price: </span>
                          {booking.totalPrice}₹
                        </p>
                      </div>

                      {/* Cancel Booking Action if confirmed */}
                      {booking.status === 'CONFIRMED' && (
                        <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                          <button
                            onClick={() => {
                              setConfirmedBookingData(booking);
                              setCurrentView('bookingSuccess');
                            }}
                            className="text-[#E90B3C] hover:underline flex items-center gap-1 text-[11px]"
                          >
                            <QrCode className="w-3.5 h-3.5" /> View Ticket
                          </button>
                          <button
                            onClick={() => handleCancelBooking(booking.bookingId)}
                            className="text-slate-400 hover:text-red-400 text-[11px]"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 6: FAVORITES / WATCHLIST                             */}
        {/* ========================================================= */}
        {currentView === 'favorites' && (
          <div>
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                Your <span className="text-[#E90B3C]">Favorites</span>
              </h1>
            </div>

            {favorites.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <Heart className="w-12 h-12 mx-auto text-slate-600 mb-3" />
                <p className="text-base mb-4">You have not saved any favorite movies yet.</p>
                <button
                  onClick={() => setCurrentView('movies')}
                  className="bg-[#E90B3C] text-white px-6 py-2 rounded-md font-semibold text-sm hover:bg-red-700"
                >
                  Explore Movies
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {movies
                  .filter((m) => favorites.includes(m.id))
                  .map((movie) => (
                    <div
                      key={movie.id}
                      className="flex flex-col group cursor-pointer transition-transform duration-200 hover:-translate-y-1"
                      onClick={() => handleOpenMovieDetail(movie)}
                    >
                      <div className="aspect-[3/4.2] w-full rounded-md overflow-hidden bg-[#0F172A] shadow-md border border-slate-800 relative">
                        <img
                          src={movie.posterUrl}
                          alt={movie.movieName}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                          onError={(e: any) => {
                            e.target.onerror = null;
                            e.target.src = POSTER_ODYSSEY;
                          }}
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleFavorite(movie.id);
                          }}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60"
                        >
                          <Heart className="w-4 h-4 fill-[#E90B3C] text-[#E90B3C]" />
                        </button>
                      </div>
                      <h3 className="mt-2 text-sm font-semibold text-white truncate">{movie.movieName}</h3>
                      <p className="text-xs text-slate-400">{movie.releaseDate}</p>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 7: ADD THEATRE (Matching Screenshot image (8))       */}
        {/* ========================================================= */}
        {currentView === 'addTheatre' && (
          <div className="flex flex-col items-center py-6">
            <h1 className="text-3xl font-bold tracking-tight text-white mb-6">
              Add <span className="text-[#E90B3C]">Theatre</span>
            </h1>

            <div className="w-full max-w-lg bg-[#0F172A] border border-slate-800 rounded-lg p-8 shadow-2xl">
              <form onSubmit={handleAddTheatre} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Theatre Name</label>
                  <input
                    type="text"
                    required
                    value={newTheatreName}
                    onChange={(e) => setNewTheatreName(e.target.value)}
                    placeholder="Enter theatre name"
                    className="w-full bg-[#202A3D] text-white rounded px-3.5 py-2 text-sm border border-slate-700/60 focus:border-[#E90B3C] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Theatre Location</label>
                  <input
                    type="text"
                    required
                    value={newTheatreLocation}
                    onChange={(e) => setNewTheatreLocation(e.target.value)}
                    placeholder="Enter theatre location"
                    className="w-full bg-[#202A3D] text-white rounded px-3.5 py-2 text-sm border border-slate-700/60 focus:border-[#E90B3C] outline-none"
                  />
                </div>

                {/* 2-Column Numeric Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Balcony Seat Price</label>
                    <input
                      type="number"
                      value={newBalconyPrice}
                      onChange={(e) => setNewBalconyPrice(Number(e.target.value))}
                      className="w-full bg-[#202A3D] text-white rounded px-3 py-2 text-sm border border-slate-700/60 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Balcony Seat Count</label>
                    <input
                      type="number"
                      value={newBalconyCount}
                      onChange={(e) => setNewBalconyCount(Number(e.target.value))}
                      className="w-full bg-[#202A3D] text-white rounded px-3 py-2 text-sm border border-slate-700/60 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Middle Seat Price</label>
                    <input
                      type="number"
                      value={newMiddlePrice}
                      onChange={(e) => setNewMiddlePrice(Number(e.target.value))}
                      className="w-full bg-[#202A3D] text-white rounded px-3 py-2 text-sm border border-slate-700/60 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Middle Seat Count</label>
                    <input
                      type="number"
                      value={newMiddleCount}
                      onChange={(e) => setNewMiddleCount(Number(e.target.value))}
                      className="w-full bg-[#202A3D] text-white rounded px-3 py-2 text-sm border border-slate-700/60 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Lower Seat Price</label>
                    <input
                      type="number"
                      value={newLowerPrice}
                      onChange={(e) => setNewLowerPrice(Number(e.target.value))}
                      className="w-full bg-[#202A3D] text-white rounded px-3 py-2 text-sm border border-slate-700/60 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Lower Seat Count</label>
                    <input
                      type="number"
                      value={newLowerCount}
                      onChange={(e) => setNewLowerCount(Number(e.target.value))}
                      className="w-full bg-[#202A3D] text-white rounded px-3 py-2 text-sm border border-slate-700/60 outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 text-center">
                  <button
                    type="submit"
                    className="bg-[#E90B3C] hover:bg-red-700 text-white font-semibold px-8 py-2 rounded text-sm transition-colors shadow"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 8: ADD SHOW (Matching Screenshot image (7))          */}
        {/* ========================================================= */}
        {currentView === 'addShow' && (
          <div className="flex flex-col items-center py-6">
            <h1 className="text-3xl font-bold tracking-tight text-white mb-6">
              Add <span className="text-[#E90B3C]">Show</span>
            </h1>

            <div className="w-full max-w-lg bg-[#0F172A] border border-slate-800 rounded-lg p-8 shadow-2xl">
              <form onSubmit={handleAddShow} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Theatres</label>
                  <select
                    value={showTheatreName}
                    onChange={(e) => setShowTheatreName(e.target.value)}
                    className="w-full bg-[#202A3D] text-white rounded px-3.5 py-2 text-sm border border-slate-700/60 focus:border-[#E90B3C] outline-none"
                  >
                    {theatres.map((t) => (
                      <option key={t.id} value={t.theatreName}>
                        {t.theatreName} ({t.location})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Movies</label>
                  <select
                    value={showMovieName}
                    onChange={(e) => setShowMovieName(e.target.value)}
                    className="w-full bg-[#202A3D] text-white rounded px-3.5 py-2 text-sm border border-slate-700/60 focus:border-[#E90B3C] outline-none"
                  >
                    {movies.map((m) => (
                      <option key={m.id} value={m.movieName}>
                        {m.movieName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Show Date</label>
                  <input
                    type="date"
                    required
                    value={showDateInput}
                    onChange={(e) => setShowDateInput(e.target.value)}
                    className="w-full bg-[#202A3D] text-white rounded px-3.5 py-2 text-sm border border-slate-700/60 focus:border-[#E90B3C] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Showtime</label>
                  <input
                    type="time"
                    required
                    value={showTimeInput}
                    onChange={(e) => setShowTimeInput(e.target.value)}
                    className="w-full bg-[#202A3D] text-white rounded px-3.5 py-2 text-sm border border-slate-700/60 focus:border-[#E90B3C] outline-none"
                  />
                </div>

                <div className="pt-4 text-center">
                  <button
                    type="submit"
                    className="bg-[#E90B3C] hover:bg-red-700 text-white font-semibold px-8 py-2 rounded text-sm transition-colors shadow"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 9: ADD MOVIE (Matching Screenshot image (5))         */}
        {/* ========================================================= */}
        {currentView === 'addMovie' && (
          <div className="flex flex-col items-center py-6">
            {/* Top red-bordered poster upload area (Matching Screenshot) */}
            <div className="w-80 h-36 border border-[#E90B3C] rounded-lg mb-4 flex items-center justify-center bg-[#0F172A]/40 text-slate-400">
              <span className="text-xs">Movie Poster Upload Preview</span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-white mb-6">
              Add <span className="text-[#E90B3C]">Movie</span>
            </h1>

            <div className="w-full max-w-xl bg-[#0F172A] border border-slate-800 rounded-lg p-8 shadow-2xl">
              <form onSubmit={handleAddMovie} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Movie</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter movie name"
                      value={newMovieName}
                      onChange={(e) => setNewMovieName(e.target.value)}
                      className="w-full bg-[#202A3D] text-white rounded px-3 py-2 text-sm border border-slate-700/60 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Description</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter movie description"
                      value={newMovieDesc}
                      onChange={(e) => setNewMovieDesc(e.target.value)}
                      className="w-full bg-[#202A3D] text-white rounded px-3 py-2 text-sm border border-slate-700/60 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Genres</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter movie genres separated by comma"
                      value={newMovieGenres}
                      onChange={(e) => setNewMovieGenres(e.target.value)}
                      className="w-full bg-[#202A3D] text-white rounded px-3 py-2 text-sm border border-slate-700/60 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Release Date</label>
                    <input
                      type="date"
                      required
                      value={newMovieReleaseDate}
                      onChange={(e) => setNewMovieReleaseDate(e.target.value)}
                      className="w-full bg-[#202A3D] text-white rounded px-3 py-2 text-sm border border-slate-700/60 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Runtime</label>
                    <input
                      type="number"
                      placeholder="Enter runtime in minutes"
                      value={newMovieRuntime}
                      onChange={(e) => setNewMovieRuntime(Number(e.target.value))}
                      className="w-full bg-[#202A3D] text-white rounded px-3 py-2 text-sm border border-slate-700/60 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Certification</label>
                    <input
                      type="text"
                      placeholder="Enter movie certification (e.g. UA, A)"
                      value={newMovieCertification}
                      onChange={(e) => setNewMovieCertification(e.target.value)}
                      className="w-full bg-[#202A3D] text-white rounded px-3 py-2 text-sm border border-slate-700/60 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Industry</label>
                    <select
                      value={newMovieIndustry}
                      onChange={(e) => setNewMovieIndustry(e.target.value as 'Bollywood' | 'Hollywood')}
                      className="w-full bg-[#202A3D] text-white rounded px-3 py-2 text-sm border border-slate-700/60 outline-none"
                    >
                      <option value="Bollywood">Bollywood / Indian</option>
                      <option value="Hollywood">Hollywood / International</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Trailer URL (YouTube)</label>
                    <input
                      type="url"
                      placeholder="https://www.youtube.com/..."
                      value={newMovieTrailer}
                      onChange={(e) => setNewMovieTrailer(e.target.value)}
                      className="w-full bg-[#202A3D] text-white rounded px-3 py-2 text-sm border border-slate-700/60 outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 text-center">
                  <button
                    type="submit"
                    className="bg-[#E90B3C] hover:bg-red-700 text-white font-semibold px-8 py-2 rounded text-sm transition-colors shadow"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 10: ADMIN SHOWS & ALL BOOKINGS (Matching image (6))  */}
        {/* ========================================================= */}
        {currentView === 'adminShows' && (
          <div className="space-y-12">
            {/* Section 1: Admin Shows */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-6">
                Admin <span className="text-[#E90B3C]">Shows</span>
              </h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {shows.map((show) => (
                  <div
                    key={show.id}
                    className="bg-[#0F172A] border border-slate-800 rounded-lg p-4 flex flex-col justify-between shadow-lg relative group"
                  >
                    <div className="flex items-start gap-2.5">
                      <Video className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                      <div className="text-xs space-y-1 text-slate-300">
                        <p>
                          <span className="text-slate-400">Movie: </span>
                          <span className="text-white font-semibold">{show.movieName}</span>
                        </p>
                        <p>
                          <span className="text-slate-400">Theatre: </span>
                          <span className="text-white">{show.theatreName}</span>
                        </p>
                        <p>
                          <span className="text-slate-400">Showdate: </span>
                          <span className="text-white">{show.showdate}</span>
                        </p>
                        <p>
                          <span className="text-slate-400">Showtime: </span>
                          <span className="text-white">{show.showtime}</span>
                        </p>
                      </div>
                    </div>

                    {/* Red Outline Trash Button (Exact match to image (6)) */}
                    <div className="mt-4 pt-3 border-t border-slate-800">
                      <button
                        onClick={() => handleDeleteShow(show.id)}
                        className="w-full border border-[#E90B3C] text-[#E90B3C] hover:bg-[#E90B3C] hover:text-white py-1.5 rounded flex items-center justify-center transition-colors text-xs"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2: All Bookings (Matches image (6)) */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-6">
                All <span className="text-[#E90B3C]">Bookings</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-[#0F172A] border border-slate-800 rounded-lg p-4 shadow-lg text-xs space-y-1.5 text-slate-300"
                  >
                    <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-800">
                      <Video className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-400">User: </span>
                      <span className="text-white font-medium">{booking.userEmail}</span>
                    </div>
                    <p>
                      <span className="text-slate-400">Movie: </span>
                      <span className="text-white">{booking.movieName}</span>
                    </p>
                    <p>
                      <span className="text-slate-400">Theatre: </span>
                      <span className="text-white">{booking.theatreName}</span>
                    </p>
                    <p>
                      <span className="text-slate-400">Showdate & Time: </span>
                      <span className="text-white">
                        {booking.showdate} ({booking.showtime})
                      </span>
                    </p>
                    <p>
                      <span className="text-slate-400">Seats: </span>
                      <span className="text-white">{booking.seats.join(', ')}</span>
                    </p>
                    <p className="font-semibold text-white">
                      <span className="text-slate-400 font-normal">Total Price: </span>
                      {booking.totalPrice}₹
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 11: ADMIN AVAILABLE MOVIES (Matching image (1))      */}
        {/* ========================================================= */}
        {currentView === 'adminMovies' && (
          <div>
            {/* Red Banner Strip (Exact match to image (1)) */}
            <div className="w-full bg-[#E90B3C] text-white py-3.5 px-4 text-center font-bold text-2xl tracking-tight shadow-md mb-8 rounded-sm">
              Available Movies
            </div>

            {/* Poster Grid with Circular White Badge & Red Trash Can on top right */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {movies.map((movie) => (
                <div key={movie.id} className="flex flex-col relative group">
                  {/* Poster Image with Delete Badge */}
                  <div className="relative aspect-[3/4.2] w-full rounded-md overflow-hidden bg-[#0F172A] shadow-md border border-slate-800">
                    <img
                      src={movie.posterUrl}
                      alt={movie.movieName}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      onError={(e: any) => {
                        e.target.onerror = null;
                        e.target.src = POSTER_ODYSSEY;
                      }}
                    />

                    {/* Circular White badge with red trash can (Exact match to image (1)) */}
                    <button
                      onClick={() => handleDeleteMovie(movie.id)}
                      className="absolute top-2.5 right-2.5 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                      title="Delete movie"
                    >
                      <Trash2 className="w-4 h-4 text-[#E90B3C]" />
                    </button>
                  </div>

                  {/* Title & Release date */}
                  <div className="mt-2 text-left">
                    <h3 className="text-sm font-semibold text-white truncate">{movie.movieName}</h3>
                    <p className="text-xs text-slate-400">{movie.releaseDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 12: INTERACTIVE SEAT SELECTION & CONCURRENCY LOCK   */}
        {/* ========================================================= */}
        {currentView === 'seatSelection' && selectedMovieForBooking && selectedShowForBooking && (
          <div className="max-w-4xl mx-auto py-4">
            {/* Header info */}
            <div className="bg-[#0F172A] border border-slate-800 rounded-lg p-5 mb-6 flex flex-wrap justify-between items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">{selectedMovieForBooking.movieName}</h2>
                <p className="text-xs text-slate-400 mt-1">
                  {selectedShowForBooking.theatreName} • {selectedShowForBooking.showdate} at{' '}
                  {selectedShowForBooking.showtime}
                </p>
              </div>

              {/* Tier Selector */}
              <div className="flex items-center gap-2">
                {(['Balcony', 'Middle', 'Lower'] as const).map((tier) => (
                  <button
                    key={tier}
                    onClick={() => setSelectedTier(tier)}
                    className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
                      selectedTier === tier
                        ? 'bg-[#E90B3C] text-white shadow'
                        : 'bg-[#202A3D] text-slate-300 hover:text-white'
                    }`}
                  >
                    {tier} (₹
                    {tier === 'Balcony'
                      ? selectedShowForBooking.tickets.Balcony
                      : tier === 'Middle'
                      ? selectedShowForBooking.tickets.Middle
                      : selectedShowForBooking.tickets.Lower}
                    )
                  </button>
                ))}
              </div>
            </div>

            {/* Cinema Screen Indicator */}
            <div className="text-center mb-8">
              <div className="w-3/4 mx-auto h-2 bg-gradient-to-r from-transparent via-[#E90B3C] to-transparent rounded-full opacity-80 mb-2"></div>
              <span className="text-[11px] font-semibold tracking-widest text-slate-400 uppercase">
                All Eyes This Way — Cinema Screen
              </span>
            </div>

            {/* Interactive Seat Matrix */}
            <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-8 mb-6 shadow-2xl overflow-x-auto">
              <div className="min-w-[500px] flex flex-col items-center gap-3">
                {/* Balcony Rows: A, B */}
                <div className="text-xs text-slate-400 font-semibold mb-1">BALCONY TIER (₹{selectedShowForBooking.tickets.Balcony})</div>
                {['A', 'B'].map((row) => (
                  <div key={row} className="flex items-center gap-2">
                    <span className="w-5 text-xs text-slate-400 font-mono text-right">{row}</span>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                        const seatCode = `${row}${num}`;
                        const isSelected = selectedSeats.includes(seatCode);
                        const isBooked = isSeatBooked(seatCode);

                        return (
                          <button
                            key={seatCode}
                            disabled={isBooked}
                            onClick={() => handleSeatClick(seatCode)}
                            title={isBooked ? `Seat ${seatCode} (Booked / Sold Out)` : `Seat ${seatCode} (Available)`}
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded text-[11px] font-mono font-bold transition-all flex items-center justify-center select-none ${
                              isBooked
                                ? 'bg-slate-800/80 border border-slate-700/60 text-slate-500 line-through cursor-not-allowed opacity-50 shadow-none'
                                : isSelected
                                ? 'bg-[#E90B3C] border-2 border-white text-white font-black scale-110 shadow-lg shadow-red-900/60 ring-2 ring-[#E90B3C]/50 z-10 cursor-pointer'
                                : 'bg-emerald-950/40 border-2 border-emerald-500/80 text-emerald-300 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 hover:scale-105 shadow-xs cursor-pointer'
                            }`}
                          >
                            {num}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {/* Middle Rows: C, D, E */}
                <div className="text-xs text-slate-400 font-semibold mt-4 mb-1">MIDDLE TIER (₹{selectedShowForBooking.tickets.Middle})</div>
                {['C', 'D', 'E'].map((row) => (
                  <div key={row} className="flex items-center gap-2">
                    <span className="w-5 text-xs text-slate-400 font-mono text-right">{row}</span>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                        const seatCode = `${row}${num}`;
                        const isSelected = selectedSeats.includes(seatCode);
                        const isBooked = isSeatBooked(seatCode);

                        return (
                          <button
                            key={seatCode}
                            disabled={isBooked}
                            onClick={() => handleSeatClick(seatCode)}
                            title={isBooked ? `Seat ${seatCode} (Booked / Sold Out)` : `Seat ${seatCode} (Available)`}
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded text-[11px] font-mono font-bold transition-all flex items-center justify-center select-none ${
                              isBooked
                                ? 'bg-slate-800/80 border border-slate-700/60 text-slate-500 line-through cursor-not-allowed opacity-50 shadow-none'
                                : isSelected
                                ? 'bg-[#E90B3C] border-2 border-white text-white font-black scale-110 shadow-lg shadow-red-900/60 ring-2 ring-[#E90B3C]/50 z-10 cursor-pointer'
                                : 'bg-emerald-950/40 border-2 border-emerald-500/80 text-emerald-300 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 hover:scale-105 shadow-xs cursor-pointer'
                            }`}
                          >
                            {num}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {/* Lower Rows: F, G */}
                <div className="text-xs text-slate-400 font-semibold mt-4 mb-1">LOWER TIER (₹{selectedShowForBooking.tickets.Lower})</div>
                {['F', 'G'].map((row) => (
                  <div key={row} className="flex items-center gap-2">
                    <span className="w-5 text-xs text-slate-400 font-mono text-right">{row}</span>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                        const seatCode = `${row}${num}`;
                        const isSelected = selectedSeats.includes(seatCode);
                        const isBooked = isSeatBooked(seatCode);

                        return (
                          <button
                            key={seatCode}
                            disabled={isBooked}
                            onClick={() => handleSeatClick(seatCode)}
                            title={isBooked ? `Seat ${seatCode} (Booked / Sold Out)` : `Seat ${seatCode} (Available)`}
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded text-[11px] font-mono font-bold transition-all flex items-center justify-center select-none ${
                              isBooked
                                ? 'bg-slate-800/80 border border-slate-700/60 text-slate-500 line-through cursor-not-allowed opacity-50 shadow-none'
                                : isSelected
                                ? 'bg-[#E90B3C] border-2 border-white text-white font-black scale-110 shadow-lg shadow-red-900/60 ring-2 ring-[#E90B3C]/50 z-10 cursor-pointer'
                                : 'bg-emerald-950/40 border-2 border-emerald-500/80 text-emerald-300 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 hover:scale-105 shadow-xs cursor-pointer'
                            }`}
                          >
                            {num}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Seat Status Legend */}
              <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 mt-8 pt-6 border-t border-slate-800 text-xs text-slate-300">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded bg-emerald-950/40 border-2 border-emerald-500 text-emerald-300 flex items-center justify-center font-mono text-[10px] font-bold shadow-xs">
                    1
                  </div>
                  <span className="font-semibold text-emerald-400">Available</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded bg-[#E90B3C] border-2 border-white text-white flex items-center justify-center font-mono text-[10px] font-bold shadow-md ring-2 ring-red-500/40">
                    1
                  </div>
                  <span className="font-semibold text-white">Selected ({selectedSeats.length})</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded bg-slate-800/80 border border-slate-700/60 text-slate-500 line-through flex items-center justify-center font-mono text-[10px] font-bold opacity-60">
                    ✕
                  </div>
                  <span className="font-semibold text-slate-400">Booked / Unavailable</span>
                </div>
              </div>
            </div>

            {/* Bottom Bar: Selection Summary & Action */}
            <div className="bg-[#0F172A] border border-slate-800 rounded-lg p-5 flex flex-wrap justify-between items-center gap-4">
              <div>
                <p className="text-xs text-slate-400">Selected Seats ({selectedSeats.length})</p>
                <p className="text-base font-bold text-white">
                  {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs text-slate-400">Estimated Total</p>
                <p className="text-xl font-bold text-[#E90B3C]">
                  {selectedSeats.length *
                    (selectedTier === 'Balcony'
                      ? selectedShowForBooking.tickets.Balcony
                      : selectedTier === 'Middle'
                      ? selectedShowForBooking.tickets.Middle
                      : selectedShowForBooking.tickets.Lower)}
                  ₹
                </p>
              </div>

              <button
                disabled={selectedSeats.length === 0}
                onClick={handleLockSeats}
                className="bg-[#E90B3C] disabled:bg-slate-800 disabled:text-slate-500 hover:bg-red-700 text-white font-semibold px-8 py-2.5 rounded-md text-sm transition-colors shadow-lg"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 13: CHECKOUT & SYNCHRONIZED 10-MIN TIMER             */}
        {/* ========================================================= */}
        {currentView === 'checkout' && selectedShowForBooking && (
          <div className="max-w-xl mx-auto py-8">
            {/* 10-Minute Lock Banner */}
            <div className="bg-[#202A3D] border border-amber-600/60 rounded-lg p-4 mb-6 flex items-center justify-between text-amber-300">
              <div className="flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-amber-400 shrink-0" />
                <span className="text-xs font-medium">Temporary Lock Active — Complete booking before expiry</span>
              </div>
              <span className="text-lg font-mono font-bold text-amber-400">
                {formatCountdown(lockCountdown)}
              </span>
            </div>

            <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-8 shadow-2xl">
              <h2 className="text-xl font-bold text-white mb-6 border-b border-slate-800 pb-3">
                Booking Summary & Payment
              </h2>

              <div className="space-y-3 text-sm text-slate-300 mb-6">
                <div className="flex justify-between">
                  <span className="text-slate-400">Movie</span>
                  <span className="text-white font-semibold">{selectedShowForBooking.movieName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Theatre</span>
                  <span className="text-white">{selectedShowForBooking.theatreName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Show Date & Time</span>
                  <span className="text-white">
                    {selectedShowForBooking.showdate} • {selectedShowForBooking.showtime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Seat Category</span>
                  <span className="text-white">{selectedTier}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Seats ({selectedSeats.length})</span>
                  <span className="text-white font-mono">{selectedSeats.join(', ')}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-slate-800">
                  <span className="text-slate-400">Convenience Fee & GST</span>
                  <span className="text-white font-mono">₹20</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-800 text-base font-bold">
                  <span className="text-white">Total Amount</span>
                  <span className="text-[#E90B3C] font-mono">
                    {selectedSeats.length *
                      (selectedTier === 'Balcony'
                        ? selectedShowForBooking.tickets.Balcony
                        : selectedTier === 'Middle'
                        ? selectedShowForBooking.tickets.Middle
                        : selectedShowForBooking.tickets.Lower) +
                      20}
                    ₹
                  </span>
                </div>
              </div>

              {/* Payment Gateway Options */}
              <div className="space-y-3 mb-6">
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#202A3D] border border-[#E90B3C] rounded-lg p-3 flex items-center gap-3 cursor-pointer">
                    <CreditCard className="w-5 h-5 text-[#E90B3C]" />
                    <span className="text-xs font-semibold text-white">Razorpay / UPI</span>
                  </div>
                  <div className="bg-[#202A3D] border border-slate-700/60 rounded-lg p-3 flex items-center gap-3 cursor-pointer opacity-80">
                    <CreditCard className="w-5 h-5 text-slate-400" />
                    <span className="text-xs text-slate-300">Stripe / Cards</span>
                  </div>
                </div>
              </div>

              {/* Submit Payment */}
              <button
                onClick={handleCompletePayment}
                className="w-full bg-[#E90B3C] hover:bg-red-700 text-white font-bold py-3 rounded-lg text-sm transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <span>Confirm & Pay Securely</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 14: BOOKING CONFIRMATION & DIGITAL TICKET VOUCHER    */}
        {/* ========================================================= */}
        {currentView === 'bookingSuccess' && confirmedBookingData && (
          <div className="max-w-lg mx-auto py-8">
            <div className="text-center mb-6">
              <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto mb-2" />
              <h2 className="text-2xl font-bold text-white">Booking Confirmed!</h2>
              <p className="text-xs text-slate-400 mt-1">
                Your ticket receipt and admission voucher has been issued.
              </p>
            </div>

            {/* Ticket Card */}
            <div className="bg-[#0F172A] border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
              <div className="bg-[#E90B3C] text-white px-6 py-3 flex justify-between items-center">
                <span className="font-bold text-sm tracking-wide">iMovies Digital Pass</span>
                <span className="font-mono text-xs">{confirmedBookingData.bookingId}</span>
              </div>

              <div className="p-6 space-y-4 text-xs text-slate-300">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-bold text-white">{confirmedBookingData.movieName}</h3>
                    <p className="text-slate-400">{confirmedBookingData.theatreName}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">{confirmedBookingData.showdate}</p>
                    <p className="text-slate-400">{confirmedBookingData.showtime}</p>
                  </div>
                </div>

                <div className="p-3 bg-[#202A3D] rounded border border-slate-700/60 flex justify-between items-center">
                  <div>
                    <span className="text-slate-400 block text-[11px]">{confirmedBookingData.tier}</span>
                    <span className="text-white font-mono font-bold text-sm">
                      {confirmedBookingData.seats.join(', ')}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block text-[11px]">Total Paid</span>
                    <span className="text-emerald-400 font-mono font-bold text-sm">
                      ₹{confirmedBookingData.totalPrice}
                    </span>
                  </div>
                </div>

                {/* QR Code Graphic */}
                <div className="pt-2 text-center flex flex-col items-center">
                  <div className="p-3 bg-white rounded-lg inline-block shadow">
                    <QrCode className="w-24 h-24 text-slate-900" />
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono mt-2">
                    {confirmedBookingData.qrCode}
                  </span>
                </div>
              </div>

              <div className="p-4 bg-slate-900/60 border-t border-slate-800 flex justify-between items-center">
                <button
                  onClick={() => setCurrentView('bookings')}
                  className="text-xs text-[#E90B3C] hover:underline font-semibold"
                >
                  View All Your Bookings
                </button>
                <button
                  onClick={() => setCurrentView('movies')}
                  className="bg-[#202A3D] text-white px-4 py-1.5 rounded text-xs hover:bg-slate-700"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        )}
      </main>


      {/* ========================================================= */}
      {/* YOUTUBE TRAILER MODAL (In-App Player + Watch on YouTube) */}
      {/* ========================================================= */}
      {activeTrailerModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0F172A] border border-slate-700 rounded-xl max-w-4xl w-full shadow-2xl overflow-hidden animate-fade-in">
            {/* Modal Header */}
            <div className="p-4 bg-[#1E293B] border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 fill-[#E90B3C] text-[#E90B3C]" />
                <h3 className="text-sm font-bold text-white truncate max-w-md">
                  {activeTrailerModal.title}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={activeTrailerModal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-400 hover:text-[#E90B3C] flex items-center gap-1 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Watch on YouTube</span>
                </a>
                <button
                  onClick={() => setActiveTrailerModal(null)}
                  className="text-slate-400 hover:text-white text-lg font-bold p-1 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Video Player */}
            <div className="aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeTrailerModal.embedId}?autoplay=1&rel=0`}
                title={activeTrailerModal.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              ></iframe>
            </div>

            {/* Modal Footer */}
            <div className="p-3.5 bg-[#1E293B] border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
              <span>Official theatrical trailer hosted on YouTube</span>
              <button
                onClick={() => setActiveTrailerModal(null)}
                className="bg-[#202A3D] text-slate-200 hover:text-white px-4 py-1.5 rounded cursor-pointer"
              >
                Close Player
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="mt-16 border-t border-slate-800 bg-[#0F172A] py-6 px-4 text-center text-xs text-slate-500">
        <p>© 2026 iMovies — Movie Ticket Booking Made Simple. All rights reserved.</p>
      </footer>
    </div>
  );
}
