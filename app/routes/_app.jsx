import { Outlet } from "@remix-run/react";
import ExpensesHeader from "../components/navigation/ExpensesHeader";
import expenseStyles from "../styles/expenses.css";

export default function ExpenseAppLayou() {
  return (
    <>
      <ExpensesHeader />
      <Outlet />
    </>
  );
}

export const links = () => [{ rel: "stylesheet", href: expenseStyles }];
