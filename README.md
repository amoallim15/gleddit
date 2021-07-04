# Gleddit Coding Challenge 🎧 &nbsp; ![hard](https://img.shields.io/badge/-Medium-yellow) ![time](https://img.shields.io/badge/%E2%8F%B0-1Day-blue) 

&nbsp;
# Goals/Outcomes ✨
- To test knowledge of consuming APIs and handling responses
- Loading state and knowing where and how to make multiple API calls efficiently
- Packaging and deploying a containerized site

&nbsp;
# Pre-requisites ✅
- N/A

&nbsp;
# Requirements 📖
- Fetch and display *Hot* posts
- Fetch and display *New* posts
- Fetch and display *Top* posts
  - Posts should display information about the actual reddit post, including the subreddit, the author, the thumbnail/text of the post, the number of likes, comments, date posted. Optionally, add a button to favorite the post
  - Clicking on a post should bring up a new page to display the post's data
    - This page should include the comments section, with each comment displaying the text, date and author
- Loading state/UI *(optional, current UX is already clean)*
- Store and display favorite posts. *(optional, but advised)*
- Implement Reddit search API and display results on search page. *(optional, but advised)*
- Create docker file that packages the production version of the site

&nbsp;
# Think about 💡
- Take a look at the Reddit API documentation
- Do you resolve each API request one after the other or in parallel?
- Where do you make the API requests?
- How much logic do you offload out of the UI components?

&nbsp;
# What's Already Been Done 🏁
- Basic UI/UX for elements (mobile responsive)