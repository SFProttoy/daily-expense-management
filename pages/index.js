import Link from "next/link";
import Form from "../components/Form";
import Lists from "../components/Lists";

export default function Home() {
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between">
        <h1>Daily Expense Management</h1>
        <div>
          <Link href="/report">
            <a className="text-success text fs-2 text-decoration-none">
              Show Reports
            </a>
          </Link>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <Lists />
        <Form />
      </div>
    </div>
  );
}
