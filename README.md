# Problem solved:
  With this tool decreased the effort and time of editing the text content in wikipedia page.
  
# Project description
  This is browser extension/add-on that can be added in any browsers.
  After user successfully logged, User can edit a text in wikipedia page just by selecting the text and giving correct text at popup in same page.
  Also user can enable or disable the edit mode
  
# How this project works
  This project working by calling the documented apis for editing the content in wiki, given in wikimedia page.
  With the csrf_token was used to identify the user and edit

# Initial stage
  We are started this project from scratch
  
# Current stage
  Created browser extension with login page and functionality to edit the content in wiki
  Due to CORS issue from the apis of wiki unable to get login and get csrf_token in this moment
  
# Working things
  Able to add this project as a local browser add-on
  Able to trigger login, token apis store the user logged in status (but failing due to CORS issue - Need to get this resolved from wikimedia dev team)
  Able to get the user selection of text and correct text for the selected text from user then can be call edit api(but failing due to CORS issue - Need to get this resolved from wikimedia dev team)
  
# Got here by
  Reffering documentation of firefox extension development and wikimedia apis documentation 
  
# Not working
  All wiki api calls are failing so unable to get login & edit content
  
# Pending tasks
  Enable and disable edit mode feature
  


  
  
