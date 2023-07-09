import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

import Header from "./components/Header";
import Quote from "./components/Quote";
import Button from "./components/Button";

const App = () => {
  const [quote, setQuote] = useState({ quoteText: "", quoteAuthor: "" });
  const [backgroundColor, setBackgroundColor] = useState("#14cc8d");

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = () => {
    axios
      .get("https://api.quotable.io/random")
      .then((response) => {
        const { content: quoteText, author: quoteAuthor } = response.data;
        setQuote({ quoteText, quoteAuthor });
        generateRandomColor();
      })
      .catch((error) => console.log(error));
  };

  const generateRandomColor = () => {
    const colors = [
      "#14cc8d",
      "#1481cc",
      "#cc3114",
      "#bb14cc",
      "#14ccbb",
      "#5f14cc",
      "#cc8d14",
    ];
    const prevColor = backgroundColor;
    let randomColor = prevColor;

    while (prevColor === randomColor) {
      randomColor = colors[Math.floor(Math.random() * colors.length)];
    }

    setBackgroundColor(randomColor);
  };

  const handleNewQuote = () => {
    fetchQuote();
  };

  const tweetQuote = () => {
    const tweet = `https://twitter.com/intent/tweet?text=${quote.quoteText} Author ${quote.quoteAuthor}`;
    window.open(tweet);
  };

  return (
    <section className="container-fluid" style={{ background: backgroundColor }}>
      <Header />
      <Quote quote={quote} />
      <Button label="New Quote" onClick={handleNewQuote} />
      <Button label="Tweet" onClick={tweetQuote} />
    </section>
  );
};

export default App;
