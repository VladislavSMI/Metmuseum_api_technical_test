import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ArtItem from "./ArtItem";
import Spinner from "../app/layout/Spinner";

import agent from "../app/api/agent";

import { IArtDetails } from "../app/models/arts";

const countIncrease = 3;

export default function ArtsList() {
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(false);
  const [artsIDs, setArtsIDs] = useState<number[]>([]);
  const [artsDetails, setArtsDetails] = useState<IArtDetails[]>([]);
  const [count, setCount] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>();
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    const loadArtsIDs = async () => {
      setLoading(true);

      try {
        if (!id) return;

        const { objectIDs, total } = await agent.Data.artsIDs(+id);

        setArtsIDs(objectIDs);
        setTotalItems(total);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    loadArtsIDs();
  }, [id]);

  const loadDetails = async () => {
    setLoading(true);

    try {
      let artsArray = [];

      if (!artsIDs || !artsIDs.length || !totalItems) return;

      for (let i = count, y = count + countIncrease; i < totalItems; i++) {
        if (i === y) {
          break;
        }

        const result = await agent.Data.artsDetails(artsIDs[i]);
        artsArray.push(result);
      }

      setArtsDetails([...artsDetails, ...artsArray]);
      setCount(count + countIncrease);

      if (totalItems <= count + countIncrease) {
        setDisabled(true);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDetails();
    // eslint-disable-next-line
  }, [artsIDs]);

  if (loading && !artsDetails.length) {
    return <Spinner />;
  }

  return (
    <div className="flex-center-column">
      {artsDetails.length && <h1> {artsDetails[0].department}</h1>}
      <h2>
        Displayed arts:
        <span className="counter">
          {artsDetails.length} / {totalItems}
        </span>
      </h2>
      <div className="art-grid">
        {artsDetails &&
          artsDetails.map((details: IArtDetails) => (
            <ArtItem key={details.objectID} details={details} />
          ))}
      </div>
      {loading && <Spinner />}

      <button className="btn" disabled={disabled} onClick={() => loadDetails()}>
        Load more
      </button>
    </div>
  );
}
