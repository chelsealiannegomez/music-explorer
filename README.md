## Unit Assignment: Music Playlist Explorer

Submitted by: **Chelsea Lianne Tan Gomez**

Estimated time spent: **20** hours spent in total

Deployed Application (**required**): [Music Playlist Explorer Deployed Site](https://music-explorer-67ol.onrender.com/)

### Application Features

#### CORE FEATURES

- [X] **Display Playlists**
  - [X] Dynamically render playlists on the homepage using JavaScript.
    - [X] Playlists should be shown in grid view.
    - [X] Playlist images should be reasonably sized (at least 6 playlists on your laptop when full screen; large enough that the playlist components detailed in the next feature are legible).
  - [X] Fetch data from a provided Javascript file and use it to create interactive playlist tiles.

- [X] **Playlist Components**
  - [X] Each tile should display the playlist's:
    - [X] Cover image
    - [X] Name
    - [X] Author
    - [X] Like count

- [X] **Playlist Details**
  - [X] Create a modal pop-up view that displays detailed information about a playlist when a user clicks on a playlist tile.
  - [X] The modal should show the playlist's:
    - [X] Cover image
    - [X] Name
    - [X] Author
    - [X] List of songs, including each song's:
      - [X] Title
      - [X] Artist
      - [X] Duration
  - [X] The modal itself should:
    - [X] Not occupy the entire screen.
    - [X] Have a shadow to show that it is a pop-up.
    - [X] Appear floating on the screen.
    - [X] The backdrop should appear darker or in a different shade.

- [X] **Like Playlists**
  - [X] Implement functionality to allow users to like playlists by clicking a heart icon on each playlist tile.
  - [X] When the heart icon is clicked:
    - [X] If previously unliked:
      - [X] The like count on the playlist tile should increase by 1.
      - [X] There should be visual feedback (such as the heart turning a different color) to show that the playlist has been liked by the user.
    - [X] If previously liked:
      - [X] The like count on the playlist tile should decrease by 1.
      - [X] There should be visual feedback (such as the heart turning a different color) to show that the playlist has been unliked by the user.
    - [X] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS:** In addition to showcasing the above features, for ease of grading, please film yourself liking and unliking:
      - [X] a playlist with a like count of 0
      - [X] a playlist with a non-zero like count

- [X] **Shuffle Songs**
  - [X] Enable users to shuffle the songs within a playlist using a shuffle button in the playlist's detail modal.
  - [X] When the shuffle button is clicked, the playlist's songs should display in a different order.
  - [X] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS:** In addition to showcasing the above features, for ease of grading, please show yourself shuffling the same playlist more than once. 
  
- [X] **Featured Page**
  - [X] Application includes a dedicated page that randomly selects and displays a playlist, showing the playlist’s:
    - [X] Playlist Image
    - [X] Playlist Name
    - [X] List of songs, including each song's:
      - [X] Title
      - [X] Artist
      - [X] Duration
  - [X] When the page is refreshed or reloaded, a new random playlist is displayed
    - For example, navigating to the all playlists page and then back to the featured playlist page should result in a new random playlist being displayed
    - Note that because your algorithm will not be truly random, it is possible that the same playlist will feature twice in a row. 
    - [X] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS:** In addition to showcasing the above features, for ease of grading, please show yourself refreshing the featured page more than once. 
  - [X] Application includes a navigation bar or some other mechanism such that users can navigate to the page with all playlists from the featured page and vice versa without using the browser's back and forward buttons. 

#### STRETCH FEATURES

- [X] **Add New Playlists**
  - [X] Allow users to create new playlists.
  - [X] Using a form, users can input playlist:
    - [X] Name
    - [X] Author
    - [X] Cover image
    - [X] Add one or more songs to the playlist, specifying the song's:
      - [X] Title
      - [X] Artist
  - [X] The resulting playlist should display in the grid view.
  - [X] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS:** For ease of grading, please show yourself adding at least two songs to the playlist. 

- [ ] **Edit Existing Playlists**
  - [X] Enable users to modify the details of existing playlists.
  - [X] Add an edit button to each playlist tile.
  - [X] Users can update the playlist:
    - [X] Name
    - [X] Author
    - [X] Songs
  - [X] The playlist grid view and playlist detail modal should update to display any changes (see Required Features, Criterion 1 & 2).
  - [X] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS:** For ease of grading, please show yourself:
    - [X] Editing all of a playlist's features (name, creator, AND songs)
    - [X] Editing some of a playlist's features (name, creator, OR songs) 

- [X] **Delete Playlists**
  - [X] Add a delete button to each playlist tile within the grid view.
  - [X] When clicked, the playlist is removed from the playlist grid view.

- [X] **Search Functionality**
  - [X] Implement a search bar that allows users to filter playlists by:
    - [X] Name 
    - [X] Author
  - [X] The search bar should include:
    - [X] Text input field
    - [X] Submit/Search Button
    - [X] Clear Button
  - [X] Playlists matching the search query in the text input are displayed in a grid view when the user:
    - [X] Presses the Enter Key
    - [X] Clicks the Submit/Search Button 
  - [X] User can click the clear button. When clicked:
    - [X] All text in the text input field is deleted
    - [X] All playlists in the `data.json` file are displayed in a grid view
    - [X] **Optional:** If the Add Playlist, Edit Existing Playlist, or Delete Playlist stretch features were implemented:
      - [X] If users can add a playlist, added playlists should be included in search results.
      - [X] If users can edit a playlist, search results should reflect the latest edits to each playlist.
      - [X] If users can delete a playlist, deleted playlists should no longer be included in search results.
      - **Note:** You will not be graded on the implementation of this optional subfeature to keep your grade of this stretch feature independent of your implementation of other stretch features. However, we highly suggest including this in your implementation to model realistic behavior of real applications. 

- [X] **Sorting Options**
  - [X] Implement a drop-down or button options that allow users to sort the playlist by:
    - [X] Name (A-Z alphabetically)
    - [X] Number of likes (descending order)
    - [X] Date added (most recent to oldest, chronologically)
  - [X] Selecting a sort option should result in a reordering based on the selected sort while maintaining a grid view.

### Walkthrough Video

[Link to Video](https://www.loom.com/share/875f4d0ed6484782845cd2fbc9794912?sid=2f824879-f47b-4eb4-b3ec-22dafa18ac66)


### Reflection

* Did the topics discussed in your labs prepare you to complete the assignment? Be specific, which features in your weekly assignment did you feel unprepared to complete?

Yes, the topics discussed in the labs prepareed me to complete the assignments. I liked how the project still challenged us as they were a step above the labs. 

* If you had more time, what would you have done differently? Would you have added additional features? Changed the way your project responded to a particular event, etc.
  
If I had more time, I would style the components better since my components are functional but some features could look better in terms of spacing, color, and size. 

* Reflect on your project demo, what went well? Were there things that maybe didn't go as planned? Did you notice something that your peer did that you would like to try next time?

I think some things that went well are some of my hover effects, the functionality of the modals, and the search function. I noticed that one of my peers implemented song matching where if a song is already in one of the playlists, if it is added again, it will be recognized even with differences in capitalization and it will be automatically corrected. I would like to implement more features like that next time.

### Shout out

Thank you to Jesus Perez for helping me out with my fetch function and explaining the concepts behind it while we debugged my code. Thank you as well to Terrence for pointing me in the right direction when I have a question about a feature.