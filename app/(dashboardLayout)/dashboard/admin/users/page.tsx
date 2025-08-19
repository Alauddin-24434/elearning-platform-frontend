"use client"

import { useState } from "react"
import { useGetUsersQuery } from "@/redux/features/auth/authApi"
import Pagination from "@/components/shared/pagenation"
import { Edit, Trash2, Eye, Search, Info } from "lucide-react"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

type User = {
    id: string
    name: string
    email: string
    isAdmin: boolean
    isActive: boolean
}

export default function UserManagement() {
    const [page, setPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedUsers, setSelectedUsers] = useState<string[]>([])
    const [rowsPerPage, setRowsPerPage] = useState(10)

    const limit = rowsPerPage

    const { data: userData } = useGetUsersQuery({
        page,
        limit,
        searchTerm,
    })

    const toggleSelectUser = (id: string) => {
        setSelectedUsers(prev =>
            prev.includes(id) ? prev.filter(u => u !== id) : [...prev, id]
        )
    }

    const toggleSelectAll = () => {
        if (selectedUsers.length === userData?.data?.length) {
            setSelectedUsers([])
        } else {
            setSelectedUsers(userData?.data?.map((u: User) => u.id) || [])
        }
    }

    // PDF Export function
    const exportPDF = () => {
        const doc = new jsPDF()
        const tableColumn = ["Name", "Email", "Is Admin", "Is Active"]
        const tableRows: any[] = []

        userData?.data?.forEach((user: User) => {
            tableRows.push([
                user.name,
                user.email,
                user.isAdmin ? "Yes" : "No",
                user.isActive ? "Active" : "Inactive",
            ])
        })

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
        })

        doc.save("users.pdf")
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                    <p className="text-gray-600">Manage all your application users</p>
                </div>

                {/* Export PDF Button */}
                <div>
                    <button
                        className="px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                        onClick={exportPDF}
                    >
                        Export PDF
                    </button>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-wrap gap-4 items-center mt-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <select
                    value={rowsPerPage}
                    onChange={e => setRowsPerPage(Number(e.target.value))}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value={5}>5 rows</option>
                    <option value={10}>10 rows</option>
                    <option value={25}>25 rows</option>
                    <option value={50}>50 rows</option>
                </select>
            </div>

            {/* Bulk Actions */}
            {selectedUsers.length > 0 && (
                <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-lg mt-2">
                    <span>{selectedUsers.length} selected</span>
                    <button className="text-red-600 hover:underline flex items-center gap-1">
                        <Trash2 className="w-4 h-4" /> Delete Selected
                    </button>
                </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto mt-4">
                <table className="min-w-full bg-white rounded-lg shadow-md border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="text-center px-4 py-3 border-r border-gray-300 w-12">
                                <input
                                    type="checkbox"
                                    checked={
                                        selectedUsers.length === userData?.data?.length &&
                                        userData?.data?.length > 0
                                    }
                                    onChange={toggleSelectAll}
                                />
                            </th>
                            <th className="text-center px-6 py-3 font-bold text-gray-700 border-r border-gray-300">
                                Name
                            </th>
                            <th className="text-center px-6 py-3 font-bold text-gray-700 border-r border-gray-300">
                                Email
                            </th>
                            <th className="text-center px-6 py-3 font-bold text-gray-700 border-r border-gray-300">
                                Is Admin
                            </th>
                            <th className="text-center px-6 py-3 font-bold text-gray-700 border-r border-gray-300">
                                Is Active
                            </th>
                            <th className="text-center px-6 py-3 font-bold text-gray-700 border-r border-gray-300">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {userData?.data?.map((user: User) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="px-4 py-4 text-center border-r border-gray-200">
                                    <input
                                        type="checkbox"
                                        checked={selectedUsers.includes(user.id)}
                                        onChange={() => toggleSelectUser(user.id)}
                                    />
                                </td>
                                <td className="px-6 py-4 text-center font-medium text-gray-900 border-r border-gray-200">
                                    {user.name}
                                </td>
                                <td className="px-6 py-4 text-center text-gray-700 border-r border-gray-200">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4 text-center text-gray-700 border-r border-gray-200">
                                    {user.isAdmin ? "Yes" : "No"}
                                </td>
                                <td className="px-6 py-4 text-center text-gray-700 border-r border-gray-200">
                                    {user.isActive ? "Active" : "Inactive"}
                                </td>
                                <td className="px-6 py-4 flex justify-center gap-3 items-center">
                                 
                                    
                                    <button className="flex items-center gap-1 text-red-600 hover:underline">
                                        <Trash2 className="w-4 h-4" /> Delete
                                        <Info className="w-4 h-4 text-gray-400 ml-1" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="mt-4">
                <Pagination
                    page={page}
                    setPage={setPage}
                    length={userData?.data?.length}
                    limit={rowsPerPage}
                />
            </div>
        </div>
    )
}
