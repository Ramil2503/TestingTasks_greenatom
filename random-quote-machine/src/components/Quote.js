import React from "react";

const Quote = ({ quote }) => {
  return (
    <div className="well">
      <p className="quote-text">{quote.quoteText}</p>
      <p className="author-text">{quote.quoteAuthor}</p>
    </div>
  );
};

export default Quote;
