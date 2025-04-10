
# Golf Tracker

Golf tracker is a web app that allows you to record your golf scorecards online: <https://golf-tracker-302ca.web.app>

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

Log into the Firebase CLI

```bash
firebase login
```

Start the dev server

```bash
  yarn dev
```

## Tech Stack

**Client:** React, Typescript, Next.js, Mantine, React-query-firebase

**Server:** Firebase hosting, Firebase auth, Firestore database

## To do

- fix bug where react-query or firestore data does not load after fast-refresh executes
- make scorecard filtering more efficient (e.g. use maps instead of arrays)
- auto-hide header on scroll down when on mobile
