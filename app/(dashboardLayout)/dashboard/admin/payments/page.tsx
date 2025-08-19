"use client"

import { useState } from "react"
import { useGetPaymentsQuery } from "@/redux/features/payment/paymentApi"
import Pagination from "@/components/shared/pagenation"
import { Payment } from "@/types"

export default function PaymentManagement() {
  const [page, setPage] = useState(1)
  const [selectedPayments, setSelectedPayments] = useState<string[]>([])
  const limit = 10

  const { data: paymentData } = useGetPaymentsQuery({ page, limit })
  const payments = paymentData?.data || []

  const toggleSelectPayment = (id: string) => {
    setSelectedPayments(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    )
  }

  const toggleSelectAll = () => {
    if (selectedPayments.length === payments.length) {
      setSelectedPayments([])
    } else {
      setSelectedPayments(payments.map(p => p.id))
    }
  }

  // const handleDeletePayment = (id: string) => {
  //   // TODO: implement delete API
  //   console.log("Delete payment", id)
  // }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Payment Management</h1>
      <p className="text-gray-600">Monitor all recent transactions</p>

      {/* Table */}
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white rounded-lg shadow-md border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-center px-4 py-3 border-r border-gray-300 w-12">
                <input
                  type="checkbox"
                  checked={selectedPayments.length === payments.length && payments.length > 0}
                  onChange={toggleSelectAll}
                />
              </th>
              <th className="text-center px-6 py-3 font-bold text-gray-700 border-r border-gray-300">
                Transaction ID
              </th>
              <th className="text-center px-6 py-3 font-bold text-gray-700 border-r border-gray-300">
                Phone
              </th>
              <th className="text-center px-6 py-3 font-bold text-gray-700 border-r border-gray-300">
                Amount
              </th>
              <th className="text-center px-6 py-3 font-bold text-gray-700 border-r border-gray-300">
                Status
              </th>
              <th className="text-center px-6 py-3 font-bold text-gray-700 border-r border-gray-300">
                Currency
              </th>
              {/* <th className="text-center px-6 py-3 font-bold text-gray-700">
                Actions
              </th> */}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {payments.map((payment: Payment) => (
              <tr key={payment.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 text-center border-r border-gray-200">
                  <input
                    type="checkbox"
                    checked={selectedPayments.includes(payment.id)}
                    onChange={() => toggleSelectPayment(payment.id)}
                  />
                </td>
                <td className="px-6 py-4 text-center font-medium text-gray-900 border-r border-gray-200">
                  {payment.transactionId}
                </td>
                <td className="px-6 py-4 text-center text-gray-700 border-r border-gray-200">
                  {payment.phone}
                </td>
                <td className="px-6 py-4 text-center text-gray-700 border-r border-gray-200">
                  ${payment.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-center border-r border-gray-200">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium
                      ${
                        payment.status === "PAID"
                          ? "bg-green-100 text-green-700"
                          : payment.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                  >
                    {payment.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center border-r border-gray-200">
                  {payment.currency}
                </td>
                {/* <td className="px-6 py-4 flex justify-center gap-3 items-center">
                  <button
                    className="flex items-center gap-1 text-red-600 hover:underline"
                    onClick={() => handleDeletePayment(payment.id)}
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4">
        <Pagination page={page} setPage={setPage} length={payments.length} limit={limit} />
      </div>
    </div>
  )
}
