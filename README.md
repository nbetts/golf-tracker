
# Golf Tracker

Golf tracker is a web app that allows you to record your golf scorecards online: <https://golftracker.app>

## Features

- View & edit golf courses and your scorecards
- Login with Google
- Real time data
- Light/dark mode support

## Run Locally

Clone the project

```bash
  git clone https://github.com/nbetts/golf-tracker
```

Go to the project directory

```bash
  cd golf-tracker
```

Install dependencies

```bash
  yarn
```

Start the server

```bash
  yarn dev
```

## Tech Stack

**Client:** React, Typescript, Next.js, Mantine, React-query-firebase

**Server:** Firebase hosting, Firebase auth, Firestore database

## To do

### Must

none

### Should

- add sensible signed out home page
- support signing in with other providers
- allow users to delete data (implement soft delete)
- fix bug where react-query or firestore data does not load after fast-refresh executes
- add sensible form validation to all forms
- use multiple firebase projects to separate dev/prod environments

### Could

- add player statistics
- add search filters to each page using the MultiSelect component

### Wish

- add firebase analytics
- make scorecard filtering more efficient (e.g. use maps instead of arrays)
- add ability to create and join user groups
  - user groups scope what courses, players and scorecards that group can see
  - which will mean users need roles such as group captain and group member
  - captains can invite and remove users from groups
