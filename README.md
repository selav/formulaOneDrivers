# Formula 1 drivers

[](#top_of_page)Overview
------------------------
A client-server web application that displays Formula 1 drivers data.
### Functionality
1. Main page -A table of drivers sorted by the wins in the current season.
2. Driver Profile - specific driver page with all of his races from all the years.
3. Like/Unlike driver mechanism - using Google API for authentication

### Stack
* Client - Angular (v10)
* Server - Node.js
* DB - PostgreSQL

[](#top_of_page)Installation
------------------------
### Get project files 
> clone the project from GitHub
```
git clone https://github.com/selav/formulaOneDrivers.git
```
### Server Install 
> On project main folder - navigate to Server folder:
```
cd Server
```
>With [node.js](http://nodejs.org/) and the npm package manager:
```
npm install
```

### DB Initialize
> Make sure you have [PostgreSQL](https://www.postgresql.org/) DB server installed.
> Make surcdde that db connection config (development env) is correct on `Server\src\config\database.json` file. You don't need to create DB instance.

> on Server folder run db init command:
```
npm run db::init
```
This command will create the db and fill it with initial data. it may take few minutes.

### Client Install
On project main folder - navigate to Client folder:
```
cd Client
```
>With [node.js](http://nodejs.org/) and the npm package manager:
```
npm install
```

[](#top_of_page)Running the project
------------------------
### Server
> navigate to Server folder and run start command:
```
cd Server
npm start
```

### Client
> navigate to Client folder and run angular serve command:
```
cd Client
ng serve
```
