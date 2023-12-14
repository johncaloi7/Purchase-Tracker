import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";
import Chart from "~/components/expenses/Chart";
import { getExpenses } from "../data/expenses.server";
import { json } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import Error from "../components/util/Error";
import { requireUserSession } from "../data/auth.server";

export default function ExpensesAnalysisPage() {
  const expenses = useLoaderData();
  return (
    <main>
      <Chart expenses={expenses} />
      <ExpenseStatistics expenses={expenses} />
    </main>
  );
}

export async function loader({ request }) {
  const userId = await requireUserSession(request);
  const expenses = await getExpenses(userId);

  if (!expenses || expenses.length === 0) {
    throw json(
      { message: "Could not load expenses for analysis" },
      { status: 404, statusText: "Expenses not found" }
    );
  }

  return expenses;
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <main>
        <Error title={error.statusText}>
          <p>
            {error.data?.message ||
              "Something is wrong, can't load expenses data"}
          </p>
        </Error>
      </main>
    );
  }
}

export function meta() {
  return [
    { title: "Expense Analysis" },
    {
      name: "description",
      content: "Monitor your expenses with our chart easily. ",
    },
  ];
}
