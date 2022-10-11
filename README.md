
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

- setup firebase project
- setup build pipeline and firebase hosting
- integrate firestore database
- setup firestore rules
- add ability to create/edit/delete player & course data using modals
- scope data editing to specific users

### Should

- allow users to hide their scorecards

### Could

- add player statistics
- add search filters to each page using the MultiSelect component

### Wish

- add ability to create and join user groups
  - user groups scope what courses, players and scorecards that group can see
  - which will mean users need roles such as group captain and group member
  - captains can invite and remove users from groups
