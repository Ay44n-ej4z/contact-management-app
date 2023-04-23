import { v4 as uuidv4 } from 'uuid';
import React, { useState, useEffect } from "react";

type ModalPreview = {
    onDone?: any;
    onClose: boolean;
    singleContact?: any
};
export default function Modal({
    singleContact,
    onClose,
    onDone,
}: ModalPreview) {
    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        age: "",
        gender: "",
        contactNo: "",
        id: ""
    });

    useEffect(() => {
        if (Boolean(singleContact)) {
            setFormValues(singleContact)
        }
    }, [])

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        // Submit logic here
        if (Object.keys(singleContact).length !== 0) {
            const storedData = JSON.parse(localStorage.getItem("formValues") || "");
            const update = storedData.map((item: any) =>
                item.id === formValues.id ? formValues : item);
            localStorage.setItem("formValues", JSON.stringify(update));
            onDone(false)
            return
        }
        formValues.id = uuidv4()
        const existingData = JSON.parse(localStorage.getItem('formValues') || '[]');

        // Add the new data to the existing data
        const newData = [...existingData, formValues];

        // Save the updated data to localStorage
        localStorage.setItem('formValues', JSON.stringify(newData));
        onDone(false)
    };

    const submitForm = () => {
        const formElement = document.querySelector('form');
        formElement?.submit();
    };


    return (
        <>

            <>
                <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                <h3 className="text-3xl font-semibold">
                                    Contact
                                </h3>
                                <button
                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={() => onDone(false)}
                                >
                                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                        ×
                                    </span>
                                </button>
                            </div>
                            {/*body*/}
                            <div className="relative flex-auto">
                                <div className=" max-w-7xl mx-auto">
                                    <div className="mt-5 md:mt-0 md:col-span-2">
                                        <form onSubmit={submitForm}>
                                            {/* <div className="shadow sm:rounded-lg sm:overflow-hidden"> */}
                                            <div className=" bg-white sm:p-6">
                                                <div className="grid grid-cols-6 gap-6">
                                                    <div className="col-span-6 sm:col-span-3">
                                                        <label
                                                            htmlFor="name"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            id="name"
                                                            value={formValues.name}
                                                            onChange={handleInputChange}
                                                            autoComplete="given-name"
                                                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                                                        />
                                                    </div>
                                                    <div className="col-span-6 sm:col-span-3">
                                                        <label
                                                            htmlFor="contactNo"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Contact No.
                                                        </label>
                                                        <input
                                                            type="number"
                                                            name="contactNo"
                                                            id="contactNo"
                                                            value={formValues.contactNo}
                                                            onChange={handleInputChange}
                                                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                                                        />
                                                    </div>
                                                    <div className="col-span-6 sm:col-span-3">
                                                        <label
                                                            htmlFor="email"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Email address
                                                        </label>
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            id="email"
                                                            value={formValues.email}
                                                            onChange={handleInputChange}
                                                            autoComplete="email"
                                                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                                                        />
                                                    </div>
                                                    <div className="col-span-6 sm:col-span-3">
                                                        <label
                                                            htmlFor="age"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Age
                                                        </label>
                                                        <input
                                                            type="number"
                                                            name="age"
                                                            id="age"
                                                            value={formValues.age}
                                                            onChange={handleInputChange}
                                                            autoComplete="age"
                                                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                                                        />
                                                    </div>
                                                    <div className="col-span-6 sm:col-span-3">
                                                        <label
                                                            // for="gender"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Gender
                                                        </label>
                                                        <select
                                                            id="gender"
                                                            name="gender"
                                                            autoComplete="gender"
                                                            onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                                                                handleInputChange(event)
                                                            }
                                                            value={formValues.gender}
                                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                        >
                                                            <option value="">Select</option>
                                                            <option value="male">Male</option>
                                                            <option value="female">Female</option>
                                                            <option value="other">Other</option>
                                                        </select>
                                                    </div>

                                                </div>
                                            </div>
                                            {/* </div> */}
                                        </form>
                                    </div>
                                </div>
                            </div>
                            {/*footer*/}
                            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => onDone(false)}
                                >
                                    Close
                                </button>
                                <button
                                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={handleSubmit}
                                // (event: React.ChangeEvent<HTMLSelectElement>) =>
                                //                                 handleInputChange(event)
                                //                               }
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
        </>
    );
}