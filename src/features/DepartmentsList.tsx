import React, { useState, useEffect } from "react";
import DepartmentItem from "./DepartmentItem";
import Spinner from "../app/layout/Spinner";

import { IDepartment } from "../app/models/arts";
import { history } from "../App";

import agent from "../app/api/agent";

const countIncrease = 3;
const initialCount = 15;

export default function AllDepartments() {
  const [loading, setLoading] = useState<boolean>(false);
  const [allDepartments, setAllDepartments] = useState<IDepartment[]>([]);
  const [departments, setDepartments] = useState<IDepartment[]>([]);
  const [count, setCount] = useState<number>(initialCount);
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    const loadAllDepartments = async () => {
      setLoading(true);

      try {
        const { departments } = await agent.Data.departments();
        setAllDepartments(departments);
        setDepartments(departments.slice(0, count));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    loadAllDepartments();

    //Eslint disable for next line => useEffect to run only once on initial mount
    // eslint-disable-next-line
  }, []);

  const loadNext = () => {
    setDepartments([
      ...departments,
      ...allDepartments.slice(count, count + countIncrease),
    ]);
    setCount(count + countIncrease);
    if (allDepartments.length <= count + countIncrease) {
      setDisabled(true);
    }
  };

  const deleteDepartment = (id: number) => {
    const filteredDepartments = departments.filter(
      (department) => department.departmentId !== id
    );
    
    setDepartments(filteredDepartments);

    if (!filteredDepartments.length) {
      history.go(0);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex-center-column">
      <h1 className="text-center">Select Department</h1>
      {departments.length > 0 &&
        departments.map(({ departmentId, displayName }: IDepartment) => (
          <DepartmentItem
            key={departmentId}
            id={departmentId}
            name={displayName}
            handleDelete={deleteDepartment}
          />
        ))}

      <button className="btn" disabled={disabled} onClick={() => loadNext()}>
        Load next
      </button>
    </div>
  );
}
