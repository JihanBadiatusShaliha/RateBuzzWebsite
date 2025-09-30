import { User } from '../types';

export const MOCK_USERS: User[] = [
  {
    id: 1,
    username: 'CinemaFan92',
    email: 'user1@example.com',
    profilePictureUrl: 'https://picsum.photos/seed/user1/200/200',
    description: 'Just a film enthusiast sharing my thoughts. Big fan of sci-fi and classic cinema.',
    friends: [2, 3],
    reviews: [
      {
        id: 101,
        author: 'CinemaFan92',
        comment: 'A masterpiece of modern sci-fi. The visuals were breathtaking!',
        rating: 9,
        movieId: 1,
        movieTitle: 'Dune: Part Two',
        moviePosterUrl: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
      },
      {
        id: 102,
        author: 'CinemaFan92',
        comment: 'Not what I expected, but a solid action flick nonetheless.',
        rating: 7,
        movieId: 5,
        movieTitle: 'Civil War',
        moviePosterUrl: 'https://image.tmdb.org/t/p/w500/sh7Rg8Er3tFcN9BpKIPOMvALgZd.jpg',
      },
      {
        id: 103,
        author: 'CinemaFan92',
        comment: 'Incredible performances and a gripping story. A must-see.',
        rating: 10,
        movieId: 2,
        movieTitle: 'Oppenheimer',
        moviePosterUrl: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
      }
    ],
  },
  {
    id: 2,
    username: 'MovieMaven',
    email: 'user2@example.com',
    profilePictureUrl: 'https://picsum.photos/seed/user2/200/200',
    description: 'Critic, reviewer, and popcorn professional. Here for the cinematic experience.',
    friends: [1],
    reviews: [
       {
        id: 201,
        author: 'MovieMaven',
        comment: 'The plot twist at the end was predictable, but the animation was top-notch.',
        rating: 6,
        movieId: 9,
        movieTitle: 'Spider-Man: Across the Spider-Verse',
        moviePosterUrl: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
      },
       {
        id: 202,
        author: 'MovieMaven',
        comment: 'An instant classic! I will be watching this again. Villeneuve is a genius.',
        rating: 10,
        movieId: 1,
        movieTitle: 'Dune: Part Two',
        moviePosterUrl: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
      },
      {
        id: 203,
        author: 'MovieMaven',
        comment: 'Just pure, chaotic fun. Don\'t think too hard, just enjoy the ride.',
        rating: 8,
        movieId: 3,
        movieTitle: 'Godzilla x Kong: The New Empire',
        moviePosterUrl: 'https://image.tmdb.org/t/p/w500/tMefBSflR6PGsBKJCWeIoAaonA.jpg',
      }
    ],
  },
   {
    id: 3,
    username: 'ReelTalk',
    email: 'user3@example.com',
    profilePictureUrl: 'https://picsum.photos/seed/user3/200/200',
    description: 'If it\'s on screen, I\'ve probably seen it.',
    friends: [1],
    reviews: [
       {
        id: 301,
        author: 'ReelTalk',
        comment: 'A beautiful and heartbreaking story about connection. It will stay with you.',
        rating: 9,
        movieId: 8,
        movieTitle: 'Past Lives',
        moviePosterUrl: 'https://image.tmdb.org/t/p/w500/k3waq02AhM2Q283G2M6gt7pS2om.jpg',
      },
      {
        id: 302,
        author: 'ReelTalk',
        comment: 'Funny, charming, and surprisingly deep. One of the best of the year.',
        rating: 8,
        movieId: 20,
        movieTitle: 'Barbie',
        moviePosterUrl: 'https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg',
      }
    ],
  },
];