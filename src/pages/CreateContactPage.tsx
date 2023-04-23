import React, { useEffect, useState } from "react";
import Modal from "../components/Modal";
import { useTable, Column, Row } from "react-table";
interface Contact {
    name: string;
    email: string;
    age: number;
    gender: string;
    contactNo: string;
    id: string
}
//   type Row = any
const CreateContactPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [singleContact, setSingleContact] = useState({})
    const storedData = JSON.parse(localStorage.getItem('formValues') || '[]');
    const data = React.useMemo(
        () => storedData,
        [storedData]
    );

    const columns = React.useMemo<Column<Contact>[]>(
        () => [
            {
                Header: "Name",
                accessor: "name",
            },
            {
                Header: "Email",
                accessor: "email",
            },
            {
                Header: "Age",
                accessor: "age",
            },
            {
                Header: "Gender",
                accessor: "gender",
            },
            {
                Header: "Contact No.",
                accessor: "contactNo",
            },
            {
                Header: "Actions",
                Cell: ({ row }: { row: Row<Contact> }) => (
                    <div className="flex justify-center">
                        <button onClick={() => onEdit(row)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2">
                            Edit
                        </button>
                        <button onClick={() => deleteValues(row)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-2">
                            Delete
                        </button>
                    </div>
                ),
            },
        ],
        []
    );

    const onEdit = (row: Row<Contact>) => {
        setSingleContact(row.original)
        setShowModal(true)
    }

    const deleteValues = (row: Row<Contact>) => {
        const currentValues = JSON.parse(localStorage.getItem("formValues") || "[]");
        const updatedValues = currentValues.filter((item: any) => item.id !== row.original.id);
        localStorage.setItem("formValues", JSON.stringify(updatedValues));
        window.location.reload()
    }

    const tableInstance = useTable({ columns, data });

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance;

    return (
        <div className="relative min-h-screen ">
            <div className="flex flex-col justify-center items-center">
                <h1 className="font-semibold p-6 text-2xl text-center text-slate-700">Contact Details</h1>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md absolute top-8 right-4"
                    onClick={() => setShowModal(true)}
                >
                    Add Contact
                </button>
            </div>
            {showModal ? <Modal onClose={showModal} onDone={setShowModal} singleContact={singleContact} /> : null}
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-4">Contact List</h1>
                <div className="overflow-x-auto">
                    <table {...getTableProps()} className="w-full">
                        <thead>
                            {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column) => (
                                        <th
                                            {...column.getHeaderProps()}
                                            className="bg-gray-200 text-gray-700 font-bold uppercase text-sm px-6 py-3 border border-gray-300 lg:table-cell"
                                        >
                                            {column.render("Header")}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {rows.map((row) => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map((cell) => {
                                            return (
                                                <td
                                                    {...cell.getCellProps()}
                                                    className="border-gray-300 border text-gray-700 px-6 py-4 whitespace-nowrap text-sm"
                                                >
                                                    {cell.render("Cell")}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
export default CreateContactPage;
