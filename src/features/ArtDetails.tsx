import { IArtDetails } from "../app/models/arts";

interface Props {
  changeModal: () => void;
  details: IArtDetails;
}

export default function ArtDetails({ changeModal, details }: Props) {
  const {
    title,
    primaryImageSmall,
    objectName,
    artistDisplayName,
    department,
    objectDate,
    accessionYear,
    culture,
    dynasty,
    reign,
    portfolio,
    artistRole,
    artistDisplayBio,
    artistNationality,
    artistBeginDate,
    artistEndDate,
    dimensions,
    country,
  } = details;

  return (
    <div className="modal-container">
      <h1 className="text-center">{title}</h1>
      <div className="modal-item">
        <div className="modal-item-img">
          {primaryImageSmall ? (
            <img className="art-img" src={primaryImageSmall} alt={objectName} />
          ) : (
            <img src="../assets/placeholder.png" alt="" />
          )}
        </div>
        <div className="modal-item-list">
          <ul>
            <li>
              <span>Title:</span> {title}
            </li>
            <li>
              <span>Artist's name:</span> {artistDisplayName}
            </li>
            <li>
              <span>Department:</span> {department}
            </li>
            <li>
              <span>Artwork was acquired in:</span> {accessionYear}
            </li>
            <li>
              <span>Date:</span> {objectDate}
            </li>
            <li>
              <span>Type:</span> {objectName}
            </li>
            <li>
              <span>Culture:</span> {culture}
            </li>
            <li>
              <span>Dynasty:</span> {dynasty}
            </li>
            <li>
              <span>Reign:</span> {reign}
            </li>
            <li>
              <span>Portfolio:</span> {portfolio}
            </li>
            <li>
              <span>Artist'role:</span> {artistRole}
            </li>
            <li>
              <span>Artist's bio:</span> {artistDisplayBio}
            </li>
            <li>
              <span>Artist's nationality:</span> {artistNationality}
            </li>
            <li>
              <span>Artist's birthday:</span> {artistBeginDate}
            </li>
            <li>
              <span>Artist's death:</span> {artistEndDate}
            </li>
            <li>
              <span>Size of the artwork:</span> {dimensions}
            </li>
            <li>
              <span>Coountry of creation:</span> {country}
            </li>
          </ul>
          <button
            className="btn btn-art-item"
            onClick={() => changeModal()}
          >
            Back
          </button>
          <button
            className="department-button btn-modal-close"
            onClick={() => changeModal()}
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
}
