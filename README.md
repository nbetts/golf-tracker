
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

- allow users to create & edit courses *
- allow users to create players *
- allow users to edit their own player data *

\* use modals

### Should

- allow users to delete data (implement soft delete)
- allow users to hide their scorecards
- fix vite issue using absolute imports for `src/**/*`

### Could

- add player statistics
- add search filters to each page using the MultiSelect component

### Wish

- fetch sorted data using firestore query sort
- add ability to create and join user groups
  - user groups scope what courses, players and scorecards that group can see
  - which will mean users need roles such as group captain and group member
  - captains can invite and remove users from groups
