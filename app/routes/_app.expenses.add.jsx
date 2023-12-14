import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "../components/util/Modal";
import { useNavigate } from "@remix-run/react";
import { addExpense } from "../data/expenses.server";
import { redirect } from "@remix-run/node";
import { validateExpenseInput } from "../data/validation.server";
import { requireUserSession } from "../data/auth.server";

export default function AddExpensesPage() {
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

export async function action({ request }) {
  const userId = await requireUserSession(request);
  const formData = await request.formData();
  const expenseData = Object.fromEntries(formData);

  try {
    validateExpenseInput(expenseData);
  } catch (error) {
    return error;
  }

  await addExpense(expenseData, userId);
  return redirect("/expenses");
}
