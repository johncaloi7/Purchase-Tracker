import { getExpenses } from "../data/expenses.server";

export async function loader() {
  return await getExpenses();
}
