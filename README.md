# Thunder Junction

Final Project for CSCI E-114 by [David Troyer](mailto:dat670@g.harvard.edu)

## About

This site features cards from the most recent Magic the Gathering expansion set, [Outlaws of Thunder Junction](https://mtg.fandom.com/wiki/Outlaws_of_Thunder_Junction). Users can leave comments for individual cards.

## Page Data

* On build, data for the cards is retrieved from the [Scryfall API](https://scryfall.com/docs/api) and a paginated listing of the cards, as well as individual pages for each card, are generated.

## Extraordinary Distinction

The comments for each card is the extraordinary distinction for this project.

* Comments are stored in a MongoDB database.
* Comments that exist at build time are included on each individual card page.
* When a card page is loaded in the browser, a netlify function is used to query for comments that have been added since the site was last built, and those are added to the page.
* Users can add additional comments and those are stored to MongoDB via a netlify function and added to the page.

## Running the project

1. A MongoDB database with an existing collection and properly configured user and password is needed.
1. The following environment variables are necessary in a `.env` file

    ```properties
    MONGODB_CONNECTION_STRING=mongodb+srv://<username>:<password>@<cluster_url>/?retryWrites=true&w=majority&appName=<cluster_name>
    MONGODB_COLLECTION_NAME=<collection-name>
    MONGODB_DB_NAME=<db-name>
    ```
1. Run `npm install` followed by `npm run develop` to run a local netlify development server.
