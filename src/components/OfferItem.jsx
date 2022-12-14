import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

export const OfferItem = ({ offer }) => {
  if (!offer) {
    return <main>Завантаження...</main>;
  }

  return (
    <Link to={`/${offer._id}/one`} className="link-item">
      <section className="offer-card">
        <ul>
          <li className="offer-model">{offer.model}</li>
          <li className="offer-initials">
            {offer.FirstName} {offer.LastName}
          </li>
        </ul>
      </section>
    </Link>
  );
};
