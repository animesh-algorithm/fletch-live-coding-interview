import { useState } from "react";

export default function FlightListingResults({ flights, onBack }) {
  const [sort, setSort] = useState("asc");
  const [rating, setRating] = useState("");
  const visibleFlights = flights
    .filter((flight) => !rating || flight.rating === Number(rating))
    .sort((a, b) => (sort === "asc" ? a.price - b.price : b.price - a.price));

  return (
    <>
      <h2>Flight results</h2>
      <div className="controls">
        <label>
          Sort by price
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            <option value="asc">Low to high</option>
            <option value="desc">High to low</option>
          </select>
        </label>
        <label>
          Star rating
          <select
            value={rating}
            onChange={(event) => setRating(event.target.value)}
          >
            <option value="">All ratings</option>
            <option value="4">4 stars</option>
            <option value="5">5 stars</option>
          </select>
        </label>
      </div>
      <p aria-live="polite">{visibleFlights.length} flights found</p>
      {visibleFlights.map((flight) => (
        <article key={flight.id}>
          <strong>
            {flight.travellingFrom} → {flight.destination}
          </strong>
          <p>
            {flight.startTime} · {flight.journeyMinutes} minutes ·{" "}
            {flight.rating} stars
          </p>
          <strong>₹{flight.price.toLocaleString("en-IN")}</strong>
        </article>
      ))}
      {!visibleFlights.length && <p>No flights match your search.</p>}
      <button type="button" onClick={onBack}>
        Back to journey
      </button>
    </>
  );
}
