"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  DollarSign,
  RefreshCw,
  Download,
  TrendingUp,
  Receipt,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
} from "lucide-react"

import { useGetPaymentsQuery } from "@/redux/features/payment/paymentApi"
import Pagination from "@/components/shared/pagenation"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Payment } from "@/types"

export default function PaymentManagement() {
  const [page, setPage] = useState(1)
  const limit = 10

  const { data: paymentData } = useGetPaymentsQuery({ page, limit })
  // const stats = paymentData?.data || {}

  // const getStatusCount = (status: string) => stats?.statusCounts?.[status] || 0


  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payment Management</h1>
          <p className="text-gray-600">Monitor transactions and financial analytics</p>
        </div>
       
      </div>

      {/* Stat Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex justify-between">
            <CardTitle>Total Revenue</CardTitle>
            <DollarSign className="text-green-600 h-5 w-5" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">${stats.totalRevenue?.toFixed(2) || '0.00'}</p>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" /> +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex justify-between">
            <CardTitle>Total Transactions</CardTitle>
            <Receipt className="text-blue-600 h-5 w-5" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">{stats.totalTransactions || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex justify-between">
            <CardTitle>Pending Payments</CardTitle>
            <Clock className="text-yellow-600 h-5 w-5" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-yellow-600">{getStatusCount('pending')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex justify-between">
            <CardTitle>Success Payments</CardTitle>
            <Clock className="text-green-600 h-5 w-5" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">{getStatusCount('success')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex justify-between">
            <CardTitle>Failed Payments</CardTitle>
            <XCircle className="text-red-600 h-5 w-5" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">{getStatusCount('failed')}</p>
          </CardContent>
        </Card>
      </div> */}

      {/* Category List */}
      <Card>
        <CardHeader>
          <CardTitle>Category List</CardTitle>
          <CardDescription>Manage all your service categories</CardDescription>
        </CardHeader>
        <CardContent>
         

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>TransactionId</TableHead>
           
                <TableHead>Phone</TableHead>
           
                <TableHead>Amount</TableHead>
           
                <TableHead>Status</TableHead>
                <TableHead>Currency</TableHead>
           
            
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentData?.data?.map((payment: Payment) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    <p className="font-medium">{payment.transactionId}</p>
                  </TableCell>
                  <TableCell>
                     <p className="font-medium">{payment.phone}</p>
                  </TableCell>
                  <TableCell>
                     <p className="font-medium">{payment.amount}</p>
                  </TableCell>
                  <TableCell>
                     <p className="font-medium">{payment.status}</p>
                  </TableCell>
                  <TableCell>
                     <p className="font-medium">{payment.currency}</p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Pagination page={page} setPage={setPage} length={paymentData?.data?.length} limit={limit} />
        </CardContent>
      </Card>
  

    </div>
  )
}
