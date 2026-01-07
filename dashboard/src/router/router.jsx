import { Route, Navigate, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Customers from "../pages/Customers";
import Invoices from "../pages/Invoices";
import Orders from "../pages/Orders";
import SelectCustomer from "../pages/SelectCustomer";
import RouteSales from "../pages/RouteSales";
import LeadsList from "../pages/LeadsList";
import ExpenseList from "../pages/ExpenseList";
import CreateExpense from "../pages/CreateExpense";
import CreateLead from "../pages/CreateLead";

const PageRoutes = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/*" element={<Navigate to="/sign-in" replace />} />

			<Route path="/sign-in" element={<Login />} />
			<Route path="dashboard">
				<Route index element={<Dashboard />} />
				<Route path="customers" element={<Customers />} />
				<Route path="invoices" element={<Invoices />} />
				<Route path="orders" element={<Orders />} />
				<Route path="select-customer" element={<SelectCustomer />} />
				<Route path="route-sales" element={<RouteSales />} />
				<Route path="leads" element={<LeadsList />} />
				<Route path="expenses" element={<ExpenseList />} />
				<Route path="create-expense" element={<CreateExpense />} />
				<Route path="create-lead" element={<CreateLead />} />
			</Route>
		</>
	)
);

export default PageRoutes;
