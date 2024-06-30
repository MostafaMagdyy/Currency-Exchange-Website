# Currency Exchange Website

## Overview

This project is a currency exchange website that allows users to convert between USD and EGP currencies based on the current exchange rates. It also provides the latest news updates and displays the latest gold prices. The website is built using React and deployed on Netlify.

## Clone and Run the Project

To clone and run this project on your local machine, follow these steps:

1. **Clone the Repository**
    ```bash
    git clone https://github.com/MostafaMagdyy/Currency-Exchange-Website.git
    cd currency-exchange-website
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Run the Application**
    ```bash
    npm start
    ```

The application will be available at `http://localhost:3000`.

## Features

### 1. Currency Converter

The currency converter allows users to convert between EGP and USD based on the current exchange rates. Users can select the currencies they want to convert between and enter the amount they want to convert.

<p align="center">
    <img src="https://github.com/MostafaMagdyy/Currency-Exchange-Website/assets/97239596/f7838413-86b1-4d4a-9a1c-20c4c647f22d" alt="Currency Converter">
</p>

### 2. Exchange Rate Chart

The exchange rate chart displays the historical exchange rates between USD and EGP over a specified period. Users can choose the time frame (e.g., past week, past month) and view the trends.

<p align="center">
    <img src="https://github.com/MostafaMagdyy/Currency-Exchange-Website/assets/97239596/929da44b-ea03-456e-9444-87ddd78abc0e" alt="Exchange Rate Chart">
</p>

### 3. Latest News

The latest news section fetches and displays news articles. The articles are fetched from an API and displayed with their title, source, image, and a link to read more.

<p align="center">
    <img src="https://github.com/MostafaMagdyy/Currency-Exchange-Website/assets/97239596/ef50d897-db50-471a-a2fd-534dd65796b5" alt="Latest News">
</p>

### 4. Recent Gold Prices

The recent gold prices section allows users to view the latest gold prices. This feature fetches data from an API and displays the current gold prices.

<p align="center">
    <img src="https://github.com/MostafaMagdyy/Currency-Exchange-Website/assets/97239596/f7527272-6750-4c92-a027-52ac5d45adf3" alt="Recent Gold Prices">
</p>

### 5. Automated Deployment

The project is configured to deploy automatically to Netlify whenever changes are pushed to the main branch. This ensures that the latest version of the website is always live.

## APIs Used

- [Exchange Rates API](https://exchangeratesapi.io)
- [Historical Exchange Rates API](https://apilayer.com/)
- [News API](https://api.thenewsapi.com/)
- [Gold API](https://www.goldapi.io/)

## Deployment Link

[https://main--currency-exchange-website-momagdy.netlify.app/](https://main--currency-exchange-website-momagdy.netlify.app/)

