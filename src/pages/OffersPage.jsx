import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OfferItem } from "../components/OfferItem";
import "../index.css";
import { getAllOffer } from "../redux/features/offer/offerSlice";

export const OffersPage = () => {
  const dispatch = useDispatch();
  const { offers } = useSelector((state) => state.offer);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllOffer());
  }, [dispatch]);

  if (!offers.length) {
    return <main>Записи відсутні</main>;
  }

  return (
    <main>
      <div className="offers">
        {user?._id &&
          offers?.map((offer, idx) => <OfferItem key={idx} offer={offer} />)}
      </div>
    </main>
  );
};
