# React Matrix Table  

## Description  

This project implements a dynamic interactive table that is generated based on user input.  

### The production build is available at: [DEMO](https://matrix-12-di.vercel.app/)  

## Features  

- [x] The user inputs the number of columns, rows, and highlighted cells to generate the table.  
- [x] Each cell contains a random three-digit number.  
- [x] **The last column** contains the sum of all numbers in the corresponding row.  
- [x] Hovering over a sum cell in a row replaces all cell values in that row with their percentage of the total sum.  
- [x] **The last row** contains the 50th percentile of values in each column.  
- [x] Clicking on any cell increases its value by 1, and all dependent values (row sum, 50th percentile) are recalculated.  
- [x] Hovering over a cell highlights the **X** closest cells by value.  

## Technologies  

- **React + Vite**  
- **TypeScript**  
- **SCSS**  
- **React Context API**  

## Run Locally  

### 1. Clone the Repository  
```sh  
git clone https://github.com/diana-tuz/matrix  
cd matrix  
```

### 2. Install Dependencies
```sh
yarn
```

### 3. Start the Development Server
```sh
yarn start
```

The project will be available at http://localhost:5173