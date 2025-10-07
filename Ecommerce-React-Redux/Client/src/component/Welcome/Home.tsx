import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import DisplayAllProduct from "../../Pages/User/DisplayAllProduct";

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user, authorize } = useSelector((state: RootState) => state.auth);
  return (
    <div>
      Welcome{" "}
      {authorize ? (
        <h1>
          {user?.name} {user?.email}
        </h1>
      ) : (
        <h1> Please Login </h1>
      )}
      <div>
        <DisplayAllProduct />
      </div>
    </div>
  );
};

export default Home;
