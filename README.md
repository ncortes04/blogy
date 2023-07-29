# Rental Car

Blogar is a full-featured, user-friendly platform that allows users to share their stories, ideas, and perspectives. Whether you're a seasoned writer, an industry expert, or someone who enjoys sharing life experiences, Blogar provides a large and engaging community.

The landing page welcomes users with a Mega Menu that allows users to fiulter posts upon hover showing the newest posts that match that category.

Upon finding a blog post of interest, users can delve deeper into the content. By clicking on a blog post, users are directed to a dedicated page showcasing the full text, accompanying images, and the author's profile. An interactive comments section at the end of each blog allows for engaging discussions and feedback.

Users are able to create their own blog posts, complete with a bold header, a large cover image in which that user can upload, and engaging content. The blogging process is streamlined and user-friendly, with a built in post editor and a preview for what the post will look like.

With Blog Buddy, customizing your personal profile is a breeze. You can easily update your profile picture by navigating to your user profile and selecting the pencil option. From there, users can upload a new profile picture, update their designation, and update their bio

Experience the power of storytelling and community with Blog Buddy. Explore our wide array of blogs, engage with confidence, and begin your blogging journey with ease.

## Technologies Used

- **Front-end**: HTML, CSS, JavaScript, Next.js
- **Back-end**: Node.js, Express.js, Prisma, MySQL
- **Authentication**: bcrypt, JWT (JSON Web Tokens)
- **Other Tools**: Git, GitHub, Postman

## Installation

To run the project locally, follow these steps:

1. Clone the repository.
2. Install the dependencies using npm or yarn.
3. Set up the database and configure the connection.
4. Start the development server.
5. Access the website through your preferred browser.

## Pages

### Landing Page

![Landing Page](readme-images/landing.png)
_Figure 1: Landing Page_

The user is greeted with a functional search bar and a brief introduction of what this site stands for.

![Landing Page](readme-images/search-suggestions.png)
_Figure 2: Search Suggestions_

### Main Page

![Recent-Popular Page](readme-images/recent-popular.png)
_Figure 2: Recent-Popular Page_

Users can scroll down and find a section for popular cars and recent cars. The popular cars are calculated by the server, while the recent cars are temporarily stored in local storage.

### Footer

![Footer](readme-images/footer.png)
_Figure 3: Footer-Contact Page_

All pages end with a footer section containing a few links.

### Login

![Login](readme-images/login.png)
_Figure 4: Login Page_

Users can log in or sign up securely.

## Filter - View All

![View All Page](readme-images/filter-viewAll.png)
_Figure 5: View All/Filter_

When users are directed to the view all page, they have the option to functionally filter cars. If there is no filter, they can simply view all the cars.

## Single View

![Single View Page](readme-images/single-view.png)
_Figure 6: Single View_

Users can click on a car and be directed to a single view of that car, where they can get more information. They can check availability and interact with a functional calendar. The car's reviews can be viewed below its description. The number of reviews is counted, and the average rating is calculated and displayed in the form of stars.

## Calendar

![Calendar View](readme-images/calendar.png)
_Figure 7: Calendar View_

Users can select a range of available dates. Dates that have already been booked are disabled and displayed in grey, indicating their unavailability. Users can select dates and confirm their selection to proceed to the checkout pages.

## Reviews

![Review Section](readme-images/reviews.png)
_Figure 8: Review Section_

Users can view reviews made by other users, delete reviews, or add new reviews. The total number of reviews is indicated at the top. Users can rate the car from 1 to 5 stars, add a title, and provide a description.

## Checkout

![Checkout Page](readme-images/checkout.png)
_Figure 9: Checkout Page_

When users have found their desired vehicle and selected their dates, they can proceed to the checkout process. Although there is no current payment processing, a purchase ticket is generated, and the booking is confirmed. The confirmation updates the statistics and the number of days the car is booked.

## Admin Panel

![Admin Page](readme-images/admin-panel.png)
_Figure 10: Admin Panel_

If a user is an admin, they get access to exclusive analytics including the top 5 rentals, recent transactions, and adding a car. These features are functional and calculate the top 5 based on how frequently they are purchased, as per the purchase tickets.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Credits

- Express: The server framework used for handling HTTP requests and API endpoints. Express
- React Router: The library used for client-side routing and navigation. React Router
- jsonwebtoken: The library used for generating and verifying JSON Web Tokens (JWT) for user authentication.
- React Chart.js: The library used for creating interactive and responsive charts in React applications.
- react-date-range: The library used for displaying and selecting date ranges in React applications. react-date-range
- MySQL: The relational database management system used for storing and retrieving data. MySQL
- Redux: The library used for managing state in React applications. Redux
- react-redux: The official Redux bindings for React, used for integrating Redux with React components.
