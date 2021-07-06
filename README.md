# Gleddit Coding Challenge 🎧 &nbsp; ![hard](https://img.shields.io/badge/-Medium-yellow) ![time](https://img.shields.io/badge/%E2%8F%B0-1Day-blue)

# Implementation Notes

1. The website is build in a single-page-app architecture.
2. The website is pure front-end, it doesn't need a back-end server to be deployed.
3. In order to generate the production version, please run the following command:

```
$ npm install
$ npm run build
```

4. After building the website, the generated build folder may be uploaded to an object store such as (aws s3).
5. Because of the consideration mentioned above, I skipped implementing a Dockerfile as there will be no need for it.
6. I included CI/CD implementation to generate the production build folder automatically after every git push command.

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

- Fetch and display _Hot_ posts
- Fetch and display _New_ posts
- Fetch and display _Top_ posts
  - Posts should display information about the actual reddit post, including the subreddit, the author, the thumbnail/text of the post, the number of likes, comments, date posted. Optionally, add a button to favorite the post
  - Clicking on a post should bring up a new page to display the post's data
    - This page should include the comments section, with each comment displaying the text, date and author
- Loading state/UI _(optional, current UX is already clean)_
- Store and display favorite posts. _(optional, but advised)_
- Implement Reddit search API and display results on search page. _(optional, but advised)_
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
