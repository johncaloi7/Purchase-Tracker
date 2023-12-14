import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "../components/util/Modal";
import { useNavigate } from "@remix-run/react";
import { validateExpenseInput } from "../data/validation.server";
import { deleteExpense, updateExpense } from "../data/expenses.server";
import { redirect } from "@remix-run/node";
import { requireUserSession } from "../data/auth.server";

export default function Page() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("..");
  };
  return (
    <Modal onClose={handleClose}>
      <ExpenseForm />
    </Modal>
  );
}

// export function loader({ params }) {
//   const expenseId = params.id;
//   const expense = getExpense(expenseId);

//   return expense;
// }

export async function action({ params, request }) {
  await requireUserSession(request);
  const expenseId = params.id;

  if (request.method === "PATCH") {
    const formData = await request.formData();
    const expenseData = Object.fromEntries(formData);

    try {
      validateExpenseInput(expenseData);
    } catch (error) {
      return error;
    }

    await updateExpense(expenseId, expenseData);
    return redirect("/expenses");
  } else {
    await deleteExpense(expenseId);
    return { deletedId: expenseId };
  }
}

export function meta({ params }) {
  return [
    { title: `Edit expense ${params.id}` },
    {
      name: "description",
      content: "The best app for handling all your important notes.",
    },
  ];
}
