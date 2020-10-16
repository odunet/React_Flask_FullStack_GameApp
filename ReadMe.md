![Game1](/img_readme/snake_rm.gif)
![Game1](/img_readme/tictac_rm.gif)

# FullStack Web Game
This web has host a number of games served at using a Flask back end. The games are written in JS using frameworks/Libraries such as ReackJS and P5js.

**Server**
  - The server is written in Python using the Flask frame work 
  - The server can be fired up in two ways:
```sh
#Flask development server
python3 manager.py 
```
```sh
#Gunicorn production server
gunicorn app:app
```

**Client**
  - The client side has html templates for each route. Each html template has it's JS bundle file. 
  - The React code is written in JSX and "transpiled" using Babel and WebPack to create the respective bundle.js

**Feedback API**
  - Feedback page is available for use. The feedback page is powered by a Node/Express backend and all data are stored in a PostgreSQL DB

### Tech

Script uses widely available libraries
* P5js - Frontend
* ReactJS - Frontend
* Flask - Backend
* Node/Express - Feedback page REST API
* PostgreSQL - Feedback page REST API


### Installation

#### Backend

Install the dependencies from the *Tech* list above.

```sh
pip install -r requirements.txt
```

#### Frontend

Install the dependencies from the *Tech* list above.

```sh
#Install all dependencies from the package.json file
npm install
```

License
----

MIT
**Free Script**