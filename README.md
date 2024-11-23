# Public Message Board App
This is a full-stack application that allows users to publish messages to a public forum, and allows them to rate their favorite messages by likes, and allows users to delete messages.
## View Website
Navigate to https://savage-demo.onrender.com/
## How It's Made:
Public Message Board is built using the following technologies:

- **Node.js**: Utilized for server-side development.
- **JavaScript (JS)**: Employed for both client and server-side functionality.
- **MongoDB**: Used as the database to store messages and likes.
The core functionality is implemented on the server side using CRUD (Create, Read, Update, Delete) operations, enabling the handling of messages and likes. On the client side, event listeners are employed. Users initiate CRUD functions by filling out forms and clicking buttons on the interface.

**Key Packages Used:**

- **mongoose**: Facilitates interaction with MongoDB.
- **express**: Provides a framework for building the web application.

## Installation

1. Clone repo
2. run `npm install`

## Usage

1. run `npm run savage`
2. Navigate to `localhost:3000`

## What I Learned
- **Dynamically create unique documents** to store messages and likes
- **Code Organization** to clearly route client and server side data
