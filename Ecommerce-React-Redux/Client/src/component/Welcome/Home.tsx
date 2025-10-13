import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import DisplayAllProduct from "../../Pages/User/DisplayAllProduct";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user, authorize } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
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
        <button onClick={() => navigate("/cart")}>My Cart</button>
        <DisplayAllProduct />
      </div>
    </div>
  );
};

export default Home;
