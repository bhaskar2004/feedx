# TODO: Fix Indian News Not Showing

## Tasks
- [x] Modify backend/server.js to handle 'indian' category using NewsAPI 'everything' endpoint with q='india'
- [x] Fix frontend newsApi.js to send category as-is without overriding for 'indian'
- [x] Test the fix by navigating to /category/indian in the app
- [x] Verify that Indian news articles are displayed without errors

## Notes
- NewsAPI free tier only supports top-headlines for US; use 'everything' for Indian news
- Frontend already sends category='indian' correctly
- Backend running on port 5001, frontend on 3000
- API test successful: Found 97 articles for Indian news
