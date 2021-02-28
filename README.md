# Team Matcher
The browser extension is to create skill-even teams from meetup.com event attendees. It can be useful for team sports like soccer, volleyball, etc.

## Compatibility
The extension works in Firefox and Chrome on desktop and in Kiwi Browser on Android (tested in these 3 only). Very few mobile browsers allow users to install extensions.

## How it works
After installing it, the extension adds an extra "Make teams" button to event attendee pages (htt<span></span>ps://w<span></span>ww.meetup.com/&lt;group id>/events/&lt;event id>/attendees/):

Kiwi Browser             |  Chrome on a desktop
:-----------------------:|:-------------------------:
<img src="https://user-images.githubusercontent.com/70592592/92333917-2615b800-f057-11ea-8b0d-b97b644df717.png" width="400"> | <img src="https://user-images.githubusercontent.com/61709855/92332588-0083b100-f04d-11ea-9eb6-a5de8cacd0bd.png" width="600">

The button redirects to https://www.keamk.com/random-team-generator and pop ups the list of attendees from the event. If a person's skill level was evaluated before, the extension will set it to the assigned value. It makes it easier to prepare teams for repeated events with recurring attendees.

<img src="https://user-images.githubusercontent.com/70592592/109427058-9d048b80-79be-11eb-891c-48e20f51ecea.png" width="400">

After assigning skill levels to everyone and selecting the right number of teams, you need to click "Generate teams" at the bottom of the page.

<img src="https://user-images.githubusercontent.com/70592592/109427059-9d048b80-79be-11eb-87e5-f71d54878727.png" width="400">

Generated teams will be closely balansed by skill level and by number of players per team.

<img src="https://user-images.githubusercontent.com/70592592/109427060-9d048b80-79be-11eb-858c-9c9040bb8f02.png" width="400">

There are some usefull buttons at the bottom of the page. The Edit button allows you to edit skill levels. The Relaunch button lets you re-shuffle teams.

Limitations | A way around it
:-----------------------|:-------------------------
No manual edit of teams | - Click Relaunch 1, 2, ... times <br> - Before/after telling players their teams, take a moment to evaluate teams and make some manual changes 
No balance by height, special skills, gender and skill combo | The Skill field should somehow combine all abilities

