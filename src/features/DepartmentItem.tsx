import React from "react";
import { Link } from "react-router-dom";

interface Props {
  id: number;
  name: string;
  handleDelete: (id: number) => void;
}

export default function DepartmentItem({ id, name, handleDelete }: Props) {
  return (
    <div className="department-item">
      <Link className="link" to={`/department/${id}`}>
        <h3>{name}</h3>
      </Link>
      <button className="department-button" onClick={() => handleDelete(id)}>
        X
      </button>
    </div>
  );
}
