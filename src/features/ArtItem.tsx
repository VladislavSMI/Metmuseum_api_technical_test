import React, { useState, useEffect } from "react";
import { IArtDetails } from "../app/models/arts";
import ArtDetails from "./ArtDetails";

interface Props {
  details: IArtDetails;
}

export default function ArtItem({ details }: Props) {
  const [modal, setModal] = useState<boolean>(false);

  const {
    primaryImageSmall,
    objectName,
    title,
    artistDisplayName,
    objectDate,
    medium,
  } = details;

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [modal]);

  const changeModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <div className="art-item border-white">
        <div className="art-item-img">
          {primaryImageSmall ? (
            <img className="art-img" src={primaryImageSmall} alt={objectName} />
          ) : (
            <img src="../assets/placeholder.png" alt="" />
          )}
        </div>
        <div className="art-item-list">
          <ul>
            {title && (
              <li>
                <span>Title:</span> {title}
              </li>
            )}

            {artistDisplayName && (
              <li>
                <span>Artist's name:</span> {artistDisplayName}
              </li>
            )}

            {objectDate && (
              <li>
                <span>Date:</span> {objectDate}
              </li>
            )}

            {medium && (
              <li>
                <span> Medium:</span> {medium}
              </li>
            )}
          </ul>
          <button onClick={changeModal} className="btn btn-art-item">
            More info
          </button>
        </div>
      </div>
      {modal && <ArtDetails changeModal={changeModal} details={details} />}
    </>
  );
}
