import axios from "axios";
import CSVtoJSON from "csvtojson";

// Bot controller
export const stockBot = async stockId => {
  const rawData = await fetchStock(stockId);
  const parsedData = await CSVtoJSON().fromString(rawData);
  console.log(parsedData);
  const stockName = parsedData[0].Symbol;
  const stockClose = parsedData[0].Close;
  //   Bot Message Structure:
  const foundShare = param => {
    let msg = ``;
    if (param == "found") {
      msg = `${stockName} quote is $${stockClose} per share`;
    } else {
      msg = `I can't retrieve the value for ${stockName} right now, try again in a few minutes`;
    }
    let obj = {
      _id: "1",
      message: msg,
      sender: { name: "StockBot" },
      type: "Bot Message",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      __v: 0
    };
    return obj;
  };
  // Response setup
  if (stockClose == "N/D") {
    //  If the provider doesn`t give any value yet, notify the user
    return foundShare("notFound");
  } else {
    // The closed value is the official value until the change @ the next day
    return foundShare("found");
  }
};
// Fetch the Stock Data
export const fetchStock = async stockId => {
  try {
    // Transform stockId to lowerCase
    const stockLower = stockId.toLowerCase();
    // Separate the code from the Code
    const stockCode = stockLower.split("=")[1];
    // Define the URL for the request as a variable
    const apiURL = `https://stooq.com/q/l/?s=${stockCode}&f=sd2t2ohlcv&h&e=csv`;
    // Fetch Data from Api
    const fetchedData = await axios(apiURL)
      .then(response => {
        // Return the data as CSV
        const data = response.data;
        return data;
      })
      .catch(error => {
        console.log(error);
      });
    return fetchedData;
  } catch (err) {
    console.log(err);
  }
};
