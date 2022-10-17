
# Golf Tracker

Golf tracker is a simple website to track golf score cards.

## Features

- View scorecards, courses and players
- Login with Google accounts
- Light/dark mode toggle

## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
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

**Client:** React, Typescript, Mantine, Vite

**Server:** Firebase hosting, Firestore database

## To do

### Must

- create players record upon first sign in
- allow users to edit their own player data *

\* use modals

### Should

- support signing in with other providers
- allow users to delete data (implement soft delete)
- fix bug where react-query or firestore data does not load after fast-refresh executes
- add sensible form validation to all forms

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
- consider locking down all read/write access to firestore and instead using firebase functions for all data access
