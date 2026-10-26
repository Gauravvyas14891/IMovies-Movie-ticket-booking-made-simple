/**
 * IMovies — Movie Ticket Booking Made Simple
 * Client Application matching the reference screenshots
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
  QrCode,
  CreditCard,
  ChevronRight,
  Star,
  Play,
  ArrowLeft,
  Send,
  MessageSquare,
  Ticket,
  ExternalLink,
  Shield,
} from 'lucide-react';

const INITIAL_MOVIES = [
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

const INITIAL_REVIEWS = [
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

const INITIAL_SHOWS = [
  {
    id: 'sh1',
    movieId: 'm7',
    movieName: 'Oppenheimer',
    theatreName: 'Cinepolis: IMAX Forum',
    showdate: 'Oct 24, 2026',
    showtime: '2:15 PM',
    tickets: { Balcony: 350, Middle: 250, Lower: 150 },
  },
  {
    id: 'sh2',
    movieId: 'm1',
    movieName: 'RRR',
    theatreName: 'Srinivasa 4K Dolby Cinema',
    showdate: 'Oct 24, 2026',
    showtime: '6:30 PM',
    tickets: { Balcony: 175, Middle: 130, Lower: 100 },
  },
  {
    id: 'sh3',
    movieId: 'm2',
    movieName: 'Jawan',
    theatreName: 'PVR INOX: Nexus Mall',
    showdate: 'Oct 25, 2026',
    showtime: '9:00 PM',
    tickets: { Balcony: 250, Middle: 180, Lower: 120 },
  },
  {
    id: 'sh4',
    movieId: 'm9',
    movieName: 'Dune: Part Two',
    theatreName: 'Cinepolis: IMAX Forum',
    showdate: 'Oct 25, 2026',
    showtime: '7:45 PM',
    tickets: { Balcony: 350, Middle: 250, Lower: 150 },
  },
  {
    id: 'sh5',
    movieId: 'm8',
    movieName: 'Interstellar',
    theatreName: 'Cinepolis: IMAX Forum',
    showdate: 'Oct 26, 2026',
    showtime: '4:00 PM',
    tickets: { Balcony: 350, Middle: 250, Lower: 150 },
  },
  {
    id: 'sh6',
    movieId: 'm5',
    movieName: 'Stree 2',
    theatreName: 'PVR INOX: Nexus Mall',
    showdate: 'Oct 26, 2026',
    showtime: '10:00 PM',
    tickets: { Balcony: 250, Middle: 180, Lower: 120 },
  },
];

const INITIAL_BOOKINGS = [
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
  },
];

export default function App() {
  const [currentView, setCurrentView] = useState('movies');
  const [userRole, setUserRole] = useState('USER');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [isLightMode, setIsLightMode] = useState(false);

  const [movies, setMovies] = useState(INITIAL_MOVIES);
  const [shows, setShows] = useState(INITIAL_SHOWS);
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [favorites, setFavorites] = useState(['m1', 'm3']);
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [selectedMovieDetail, setSelectedMovieDetail] = useState(INITIAL_MOVIES[0]);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);

  const [toastMessage, setToastMessage] = useState(null);
  const [selectedMovieForBooking, setSelectedMovieForBooking] = useState(null);
  const [selectedShowForBooking, setSelectedShowForBooking] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTier, setSelectedTier] = useState('Middle');
  const [lockCountdown, setLockCountdown] = useState(600);
  const [isLocked, setIsLocked] = useState(false);
  const [confirmedBookingData, setConfirmedBookingData] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenMovieDetail = (movie) => {
    setSelectedMovieDetail(movie);
    setCurrentView('movieDetail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookMovie = (movie) => {
    setSelectedMovieForBooking(movie);
    setSelectedShowForBooking(shows.find((s) => s.movieName === movie.movieName) || shows[0]);
    setSelectedSeats([]);
    setIsLocked(false);
    setCurrentView('seatSelection');
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReviewComment.trim()) return;
    const newRev = {
      id: 'rev_' + Date.now(),
      movieId: selectedMovieDetail.id,
      author: newReviewAuthor.trim() || 'Verified Moviegoer',
      rating: newReviewRating,
      comment: newReviewComment.trim(),
      date: 'Just now',
    };
    setReviews([newRev, ...reviews]);
    setNewReviewComment('');
    showToast('Your review has been posted!');
  };

  useEffect(() => {
    let timer;
    if (isLocked && lockCountdown > 0) {
      timer = setInterval(() => {
        setLockCountdown((prev) => {
          if (prev <= 1) {
            setIsLocked(false);
            setSelectedSeats([]);
            showToast('Temporary seat reservation expired.');
            return 600;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isLocked, lockCountdown]);

  return (
    <div className={`min-h-screen ${isLightMode ? 'bg-[#F1F5F9] text-[#0F172A]' : 'bg-[#1E293B] text-white'}`}>
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#E90B3C] text-white px-5 py-3 rounded-lg shadow-2xl flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header matching screenshots */}
      <header className="sticky top-0 z-40 bg-[#0F172A] border-b border-slate-800 px-6 py-3.5 flex items-center justify-between shadow-md">
        <div onClick={() => setCurrentView('movies')} className="cursor-pointer flex items-center gap-1 select-none">
          <span className="text-2xl font-black text-[#E90B3C]">i</span>
          <span className="text-2xl font-bold tracking-tight text-white">Movies</span>
        </div>

        {userRole === 'USER' && (
          <div className="hidden md:flex items-center bg-[#202A3D] rounded-md px-3.5 py-1.5 w-96 border border-slate-700/50">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-sm text-white placeholder-slate-400 w-full"
            />
            <Info className="w-4 h-4 text-[#E90B3C]" />
          </div>
        )}

        <div className="flex items-center gap-5">
          <button onClick={() => setIsLightMode(!isLightMode)} className="text-slate-300 hover:text-white">
            {isLightMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>

          {userRole === 'USER' ? (
            <>
              <button onClick={() => setCurrentView('movies')} className="text-slate-300 hover:text-white">
                <Home className="w-5 h-5" />
              </button>
              <button onClick={() => setCurrentView('favorites')} className="text-slate-300 hover:text-white">
                <Heart className="w-5 h-5" />
              </button>
              <button onClick={() => setCurrentView('bookings')} className="text-slate-300 hover:text-white">
                <UserIcon className="w-5 h-5" />
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setCurrentView('movies')} className="text-slate-300 hover:text-white">
                <Home className="w-5 h-5" />
              </button>
              <button onClick={() => setCurrentView('adminMovies')} className="text-slate-300 hover:text-white">
                <Film className="w-5 h-5" />
              </button>
              <button onClick={() => setCurrentView('addMovie')} className="text-slate-300 hover:text-white">
                <PlusCircle className="w-5 h-5" />
              </button>
              <button onClick={() => setCurrentView('adminShows')} className="text-slate-300 hover:text-white">
                <Clock className="w-5 h-5" />
              </button>
            </>
          )}

          {userRole === 'ADMIN' && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded bg-red-950/70 border border-[#E90B3C]/70 text-[#E90B3C] text-[11px] font-bold select-none">
              <Shield className="w-3.5 h-3.5" />
              <span>ADMIN</span>
            </div>
          )}

          <button
            onClick={() => {
              setUserRole('USER');
              showToast('Logged out. Please log in to choose role.');
            }}
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-[#E90B3C] px-2.5 py-1 rounded bg-[#202A3D] border border-slate-700 hover:border-[#E90B3C] transition-colors"
            title="Log out to change role or exit"
          >
            <LogOut className="w-3.5 h-3.5 text-[#E90B3C]" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {currentView === 'movies' && (
          <div>
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                Available <span className="text-[#E90B3C]">Movies</span>
              </h1>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  className="cursor-pointer group flex flex-col"
                  onClick={() => handleOpenMovieDetail(movie)}
                >
                  <div className="aspect-[3/4.2] w-full rounded-md overflow-hidden bg-[#0F172A] border border-slate-800 relative">
                    <img
                      src={movie.posterUrl}
                      alt={movie.movieName}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="mt-2 text-sm font-semibold text-white truncate">{movie.movieName}</h3>
                  <p className="text-xs text-slate-400">{movie.releaseDate}</p>
                  <div className="mt-2">
                    <span className="bg-[#3B151F] text-[#FF4D6D] border border-[#5C1D2E] text-[11px] px-2 py-0.5 rounded">
                      {movie.genres.join(', ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View: Movie Detail */}
        {currentView === 'movieDetail' && selectedMovieDetail && (
          <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-12">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <button
                onClick={() => setCurrentView('movies')}
                className="flex items-center gap-2 text-slate-300 hover:text-white text-sm font-semibold cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-[#E90B3C]" />
                <span>Back to Movies</span>
              </button>
              <span className="text-xs font-mono font-bold px-2 py-1 bg-slate-800 border border-slate-700 rounded text-slate-200">
                {selectedMovieDetail.certification}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start bg-[#0F172A] border border-slate-800 rounded-xl p-6 sm:p-8 shadow-2xl">
              <div className="md:col-span-4 flex flex-col items-center sm:items-start">
                <div className="aspect-[3/4.2] w-full max-w-[280px] rounded-lg overflow-hidden bg-slate-900 border border-slate-700 shadow-xl">
                  <img
                    src={selectedMovieDetail.posterUrl}
                    alt={selectedMovieDetail.movieName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="w-full max-w-[280px] mt-4 space-y-2">
                  <a
                    href={selectedMovieDetail.trailerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#E90B3C] hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 text-sm shadow transition-colors"
                  >
                    <Play className="w-5 h-5 fill-white text-white" />
                    <span>Watch Trailer on YouTube</span>
                  </a>
                </div>
              </div>

              <div className="md:col-span-8 space-y-4">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
                  {selectedMovieDetail.movieName}
                </h1>
                <p className="text-sm text-slate-400">
                  Directed by <span className="text-slate-200 font-semibold">{selectedMovieDetail.director}</span>
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  {selectedMovieDetail.genres.map((g) => (
                    <span key={g} className="bg-[#3B151F] text-[#FF4D6D] border border-[#5C1D2E] text-xs font-semibold px-3 py-1 rounded-full">
                      {g}
                    </span>
                  ))}
                  <span className="text-xs text-slate-400 ml-2">{selectedMovieDetail.runtime} mins • {selectedMovieDetail.language}</span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Film className="w-4 h-4 text-[#E90B3C]" />
                    <span>Story Overview</span>
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed font-normal">
                    {selectedMovieDetail.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Cast */}
            <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-800 pb-3 flex items-center gap-2">
                <UserIcon className="w-5 h-5 text-[#E90B3C]" />
                <span>Starring Cast</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {selectedMovieDetail.cast?.map((actor, idx) => (
                  <div key={idx} className="bg-[#1E293B] p-3 rounded text-center border border-slate-800">
                    <p className="text-xs font-bold text-white">{actor.name}</p>
                    <p className="text-[11px] text-slate-400 italic">as {actor.role}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Comments & Reviews */}
            <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
              <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#E90B3C]" />
                <span>Reviews & Comments</span>
              </h3>

              <form onSubmit={handleAddReview} className="bg-[#1E293B] p-4 rounded-lg space-y-3">
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={newReviewAuthor}
                    onChange={(e) => setNewReviewAuthor(e.target.value)}
                    className="bg-[#202A3D] text-xs px-3 py-1.5 rounded text-white border border-slate-700 outline-none w-48"
                  />
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewReviewRating(star)}
                        className="text-amber-400 cursor-pointer"
                      >
                        <Star className={`w-4 h-4 ${star <= newReviewRating ? 'fill-amber-400' : 'text-slate-600'}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  rows={2}
                  required
                  placeholder="Share your thoughts about this movie..."
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  className="w-full bg-[#202A3D] text-xs p-2.5 rounded text-white border border-slate-700 outline-none resize-none"
                ></textarea>
                <button type="submit" className="bg-[#E90B3C] text-white px-4 py-1.5 rounded text-xs font-semibold cursor-pointer">
                  Post Review
                </button>
              </form>

              <div className="space-y-3">
                {reviews.filter((r) => r.movieId === selectedMovieDetail.id).map((rev) => (
                  <div key={rev.id} className="bg-[#1E293B]/70 p-3 rounded border border-slate-800 text-xs">
                    <div className="flex justify-between font-bold text-white mb-1">
                      <span>{rev.author}</span>
                      <span className="text-amber-400">{'★'.repeat(rev.rating)}</span>
                    </div>
                    <p className="text-slate-300">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* At Last: Book Tickets Option */}
            <div className="bg-[#0F172A] border-2 border-[#E90B3C] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
              <div>
                <h3 className="text-xl font-bold text-white">Book Tickets for {selectedMovieDetail.movieName}</h3>
                <p className="text-xs text-slate-400 mt-1">Select your preferred showtime and choose your seats.</p>
              </div>
              <button
                onClick={() => handleBookMovie(selectedMovieDetail)}
                className="bg-[#E90B3C] hover:bg-red-700 text-white font-bold py-3 px-8 rounded-xl text-sm shadow cursor-pointer flex items-center gap-2"
              >
                <Ticket className="w-5 h-5" />
                <span>Book Tickets Now</span>
              </button>
            </div>
          </div>
        )}

        {currentView === 'bookings' && (
          <div>
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                Your <span className="text-[#E90B3C]">Bookings</span>
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookings.map((booking) => (
                <div key={booking.id} className="bg-[#0F172A] border border-slate-800 rounded-lg p-4 flex gap-4">
                  <div className="w-32 aspect-[3/4.2] rounded overflow-hidden bg-slate-900 shrink-0">
                    <img
                      src={booking.posterUrl}
                      alt={booking.movieName}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-xs space-y-1.5 text-slate-300">
                    <p className="text-sm font-semibold text-white">Movie: {booking.movieName}</p>
                    <p>Theatre: {booking.theatreName}</p>
                    <p>Showdate: {booking.showdate}</p>
                    <p>showtime: {booking.showtime}</p>
                    <p>{booking.tier}: {booking.seats.join(', ')}</p>
                    <p className="text-sm font-bold text-white pt-1">Total Price: {booking.totalPrice}₹</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentView === 'seatSelection' && selectedMovieForBooking && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-[#0F172A] p-4 rounded-lg mb-6 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold">{selectedMovieForBooking.movieName}</h2>
                <p className="text-xs text-slate-400">
                  {selectedShowForBooking?.theatreName} • {selectedShowForBooking?.showdate} ({selectedShowForBooking?.showtime})
                </p>
              </div>
              <button
                onClick={() => {
                  setIsLocked(true);
                  setCurrentView('checkout');
                }}
                disabled={selectedSeats.length === 0}
                className="bg-[#E90B3C] disabled:bg-slate-800 px-6 py-2 rounded text-xs font-semibold"
              >
                Proceed to Checkout ({selectedSeats.length} seats)
              </button>
            </div>

            <div className="bg-[#0F172A] p-8 rounded-xl text-center border border-slate-800">
              <div className="w-3/4 mx-auto h-1.5 bg-[#E90B3C] rounded-full mb-8 opacity-75"></div>
              <div className="flex flex-col gap-3 items-center">
                {['A', 'B', 'C', 'D'].map((row) => (
                  <div key={row} className="flex gap-2 items-center">
                    <span className="w-5 text-xs text-slate-400 font-mono text-right">{row}</span>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
                      const code = `${row}${num}`;
                      const isSel = selectedSeats.includes(code);
                      const isBooked = ['A3', 'A4', 'B5', 'C2', 'D7'].includes(code);
                      return (
                        <button
                          key={code}
                          disabled={isBooked}
                          onClick={() => {
                            if (isSel) setSelectedSeats(selectedSeats.filter((s) => s !== code));
                            else setSelectedSeats([...selectedSeats, code]);
                          }}
                          title={isBooked ? `Seat ${code} (Booked / Unavailable)` : `Seat ${code} (Available)`}
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded text-[11px] font-mono font-bold transition-all flex items-center justify-center select-none ${
                            isBooked
                              ? 'bg-slate-800/80 border border-slate-700/60 text-slate-500 line-through cursor-not-allowed opacity-50'
                              : isSel
                              ? 'bg-[#E90B3C] border-2 border-white text-white font-black scale-110 shadow-lg shadow-red-900/60 ring-2 ring-[#E90B3C]/50 z-10 cursor-pointer'
                              : 'bg-emerald-950/40 border-2 border-emerald-500/80 text-emerald-300 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 hover:scale-105 shadow-xs cursor-pointer'
                          }`}
                        >
                          {num}
                        </button>
                      );
                    })}
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
          </div>
        )}

        {currentView === 'checkout' && (
          <div className="max-w-md mx-auto bg-[#0F172A] p-8 rounded-xl border border-slate-800">
            <h2 className="text-xl font-bold mb-4">Complete Payment</h2>
            <div className="text-xs space-y-2 mb-6 text-slate-300">
              <p>Seats: {selectedSeats.join(', ')}</p>
              <p className="text-base font-bold text-white pt-2">Total Amount: ₹{selectedSeats.length * 150}</p>
            </div>
            <button
              onClick={() => {
                const newB = {
                  id: 'bk_' + Date.now(),
                  bookingId: 'BK_' + Math.floor(100 + Math.random() * 900),
                  userEmail: 'gvvdkumar@gmail.com',
                  movieName: selectedMovieForBooking?.movieName || 'Movie',
                  theatreName: selectedShowForBooking?.theatreName || 'Theatre',
                  showdate: selectedShowForBooking?.showdate || 'Today',
                  showtime: selectedShowForBooking?.showtime || '20:00',
                  posterUrl: selectedMovieForBooking?.posterUrl || '',
                  tier: 'Middle Seats',
                  seats: selectedSeats,
                  totalPrice: selectedSeats.length * 150,
                  status: 'CONFIRMED',
                  qrCode: 'QR_CODE_DATA',
                };
                setBookings([newB, ...bookings]);
                setSelectedSeats([]);
                setCurrentView('bookings');
                showToast('Payment successful! Booking confirmed.');
              }}
              className="w-full bg-[#E90B3C] py-2.5 rounded text-sm font-bold"
            >
              Pay & Confirm Ticket
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
