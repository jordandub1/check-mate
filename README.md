# Check-Mate Financial Planner

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

Check-mate is a full-stack web application for keeping track of your expenses and setting smart savings goals.
The application uses node.js, express.js, mySQL, and Sequelize to keep track of users, their transactions, and their budget goals on the back end and Chart.js, Bootstrap, and Handlebars to visualize every users personal information.

## Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

The application is hosted online via heroku and doesn't require any installation to use.
If you would like to download the application and run it on a local server/db, you will need the following technologies:

- [MySQL] (https://dev.mysql.com/downloads/installer/)
- [node.js] (https://nodejs.org/)

After you've installed both of these, open the project folder and run the following commands:

- `npm i` to download all required dependencies
- `mysql -u [username, like 'root'] -p` followed by your local db password to enter the mySQL shell; then run `SOURCE schema.sql` to create an empty database on your system.

You may also run "npm seed" to seed the database with filler information.

Next, adjust the .env variables DB_USER and DB_PASSWORD to match the username and password of your local mySQL database.

Finally, use the command 'npm start' to run the program.

## Usage

Users must register to use the program by selecting 'Register Here' on the login page. After registering, users can login in a view their budget and transaction data. Budgets can be set on the left via 'Edit Budget'; income and expenses can be added similarly via 'Add Income or Expense'. Adding budgets and expenses will update the cards in the center of the application: the donut chart will reflect the amount spent in various categories, the line chart will show how much was spent each day, and the monthly expenses table will show details on that months expenses.

Details about all transactions and budget info can be seen by selecting 'Budget Page' and 'Transaction Page' on the left.

## Credits

- [jordandub1 ](https://github.com/jordandub1)
- [jparris3213 ](https://github.com/jparris3213)
- [TimRob584 ](https://github.com/Timrob584)
- [wstaylor27 ](https://github.com/wstaylor27)
- [jkohrt7 ](https://github.com/jkohrt7)

## License

[MIT](https://opensource.org/licenses/MIT)

