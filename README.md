# fleet-management-services
Bicycle fleet managment services

## Installation and running Frontend in the client folder
## `npm install` or `npm i`

## `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.


## Libraries used
  - React
  - Material UI 5 [MUI](https://mui.com/)
  - React-Redux
  - Redux Middleware Thunk
  - AMCharts [Charting library](https://www.amcharts.com/)
  - React-LeafLet [Map & Geo location library](https://react-leaflet.js.org/)


### Installation and running Backend in the server folder

### Create a virtual environment
# ` pip install virtualenv`

**INSIDE** server folder _create a new virtualenv_ and activate
  - virtualenv env
  - Activate virtualenv
  - source env/bin/activate

### Running the server
# `python app.py`

Runs the app in the development mode.\
Use [http://localhost:5000](http://localhost:5000) to execute APIs in Postman.


## Packages used
  - Flask
  - Flask-Restful
  - Pandas
  - SQLAlchemy

### Running the postgres dataabase
  - Run the db [script](https://github.com/Vin-1991/fleet-services/tree/main/db_script) to create thee dataase with the data(optional).
  - Chnage the database related configurattion in the `.env` [file](https://github.com/Vin-1991/fleet-services/blob/main/server/config/.env).


