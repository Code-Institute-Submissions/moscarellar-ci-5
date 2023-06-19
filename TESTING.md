# Table of Content

- [**Testing**](<#testing>)
    - [Testing User Stories](#testing-user-stories)
    - [Code Validation](#code-validation)
    - [Additional Testing](#additional-testing)
    - [Known Bugs](#known-bugs)

## Testing User Stories

### Access the website

Accessing the Website
User Perspective: To navigate between pages and explore the content seamlessly, there is a visible navbar at the top upon entering the website.

User Perspective: To create a personal profile, users can click on the Sign Up link, which redirects them to the account creation form.

User Perspective: By clicking the Login link, users can access all the features of the website by entering their credentials in the login form.

User Perspective: Users can enjoy a continuous user experience as they remain logged in until they decide to logout. When a user logs in, a JWT (JSON Web Token) is stored in the local storage, and they stay signed in until they manually click the logout button.

User Perspective (Logged Out): Users who are not logged in can view the signup and login options in the menu, enabling them to either create a new account or login to an existing one.

### Create a Meme

- As a user I can add a Meme Post so that I can share it with the community.
    - When the user clicks on the Meme button it takes him to the add meme form.

### Interact with Post

User Perspective: Users can access detailed information about a specific Post by clicking on it, which redirects them to the dedicated Post page.

User Perspective: Users can express their interest in a Post by liking it. Clicking the thumbs-up icon of a Post adds the user to the list of users who liked that Post.

### ToDo List page

User Perspective: Users can create a task list to keep track of their to-do items and manage their responsibilities efficiently.

User Perspective: Users can add tasks to the list by entering the task details into the input field and clicking the "Add" button.

### Profile page
Test: As a user, I want to be able to click on a username and be directed to the user's profile page, where I can see their posts and learn more about them.

Result: After performing the test, the functionality was successfully implemented. Clicking on a username now redirects the user to the corresponding profile page, displaying all relevant information about the user, including their posts.


[Back to top](#table-of-content)

## Code Validation
During the coding the Prettier and ESLint extensions were used throught which automaticaly checks the code for errors as it is typed. This helped debug any issues with the code earlier on during the development process.

### CSS Validaton
When using the W3C CSS validator all code passed with no known issues.

![W3C Validator](src/assets/readme/css_validation.png)

### JavaScript Validation
At the end of the project ESLint passed all the code with no known validation issues.

[Back to top](#table-of-content)

## Additional Testing

### Manual Testing

In addition to the validations and tests mentioned above, I have conducted several manual tests throughout the development of the project. Here are some of the tests I performed:

Test: Viewing all posts as a logged-out user.
Test: Viewing all posts as a logged-in user.
Test: Searching for posts using the search input.
Test: Filtering posts by category.
Test: Only viewing posts by followed users in the home feed.
Test: Viewing posts by a specific author.
Test: Viewing other users' profile pages and their posts.
Test: Creating an account.
Test: Logging into the website.
Test: Following and unfollowing a user.
Test: Adding a post.
Test: Editing a post.
Test: Deleting a post.
Test: Editing the profile page.
Test: Liking and saving a post.
Test: Commenting on a post.
Test: Editing and deleting a comment.
Test: Replying to a comment.
Test: Editing and deleting a reply.
Test: Attempting to access a broken URL and verifying the display of the 404 page.
These manual tests were carried out to ensure the proper functionality and user experience of the application.


### Responsiveness Test
The responsive design tests were carried out manually with [Google Chrome DevTools](https://developer.chrome.com/docs/devtools/) and [Responsive Design Checker](https://www.responsivedesignchecker.com/).

[Back to top](#table-of-content)

### Browser Compatibility

[Back to top](#table-of-content)

### Lighthouse

 ![Lighthouse](src/assets//readme/lighthouse.png)


## Known bugs
At the moment known bugs are:

- 

[Back to top](#table-of-content)

Back to [**README file.**](README.md)