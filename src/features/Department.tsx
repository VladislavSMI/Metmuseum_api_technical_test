import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import agent from "../app/api/agent";
import Spinner from "../app/layout/Spinner";

const countIncrease = 1;

export default function Department() {
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(false);
  const [artsIDs, setArtsIDs] = useState<any>([]);
  const [artsDetails, setArtsDetails] = useState<any>([]);
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
    <div>
      <h1>{totalItems}</h1>
      <h1>dispalayed items {artsDetails.length}</h1>
      {artsDetails &&
        artsDetails.map((details: any) => (
          <div key={details.objectID}>
            <h3>{details.objectID}</h3>
            <h3>{details.artistAlphaSort}</h3>
          </div>
        ))}
      {loading && <Spinner />}
      <button disabled={disabled} onClick={() => loadDetails()}>
        Load more
      </button>
    </div>
  );
}
