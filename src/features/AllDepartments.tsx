import React, { useState, useEffect } from "react";
import agent from "../app/api/agent";
import { IDepartment } from "../app/models/apiTypes";
import Spinner from "../app/layout/Spinner";
import { Link } from "react-router-dom";
import { history } from "../App";

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
    console.log(filteredDepartments);
    setDepartments(filteredDepartments);

    console.log(departments.length);
    if (!filteredDepartments.length) {
      history.go(0);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <h1>Select Department</h1>
      <ul>
        {departments.length > 0 &&
          departments.map((department: IDepartment) => (
            <li key={department.departmentId}>
              {department.displayName}
              <Link to={`/department/${department.departmentId}`}>Select</Link>
              <button onClick={() => deleteDepartment(department.departmentId)}>
                Delete
              </button>
            </li>
          ))}
      </ul>
      <button disabled={disabled} onClick={() => loadNext()}>
        Load next
      </button>
    </div>
  );
}
