// import { useEffect } from "react";
// import { Outlet, useNavigate } from "react-router-dom";
import SpendingTable from '../components/SpendingTable/SpendingTable'
import Header from '../components/Header/Header'

const SpendingTablePage = () => {
  //   const { tasks, loading, error, loadTasks } = useTasks();
  //   const navigate = useNavigate();

  //   useEffect(() => {
  //     if (!localStorage.getItem("userInfo")) {
  //       navigate("/login");
  //       return;
  //     }
  //     loadTasks();
  //   }, [loadTasks, navigate]);

  return (
    <div>
      <Header isSpendingTablePage={true} />
      <SpendingTable />
    </div>
  )
}

export default SpendingTablePage
