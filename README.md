# Shop Book

This project contains a shopping list application developed using React Native and Expo. Users can create, edit, filter, and sort shopping lists with ease.

<div align="center">
  <img src="https://github.com/afurgapil/shop-book/assets/99171546/afba81ec-eeac-4966-ac01-d098a8b919ab" alt="Live Preview">
</div>

## Features

- Create, edit, and delete shopping lists.
- Add, edit, and remove items from the list.
- Filter and sort the shopping list based on different criteria.
- User-friendly interface and intuitive usage.

## Requirements

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) should be installed.
- [Expo CLI](https://docs.expo.dev/get-started/installation/) should be installed.
- Access to a [MongoDB](https://www.mongodb.com/) database.

For a detailed list of project dependencies and their versions, please refer to the `package.json` file.

## Installation

1. Clone this repository: `git clone https://github.com/afurgapil/shop-book.git`
2. Navigate to the project folder: `cd shop-book`
3. Install dependencies: `npm install`
4. Start the Expo development server: `npm start`

## Configuration

1. Create a `.env` file in the `services` directory.
2. Add the following line to your `.env`file and replace `YOUR_MONGODB_URI` with your actual MongoDB connection string:

   ```plaintext
   MONGODB_CONNECTION_STRING=mongodb+srv://username:password@your-cluster.mongodb.net/your-database-name
   ```

Default API_URL is set to 'http://localhost:3000/'

## Usage

1. The Expo interface will open in your browser.
2. You can test the app using Android or iOS simulators.
3. If you want to test on a real device, you can use the Expo Client app.

## Contributions

Contributions are welcome! If you would like to contribute to the project, please create a new branch and send a pull request.

## License

This project is licensed under the MIT License. For more information, please refer to the `LICENSE` file.
