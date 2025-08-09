"use client"


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MoreHorizontal, Eye, Edit, Trash2, Clock, Upload } from 'lucide-react'


import { useGetUsersQuery } from "@/redux/features/auth/authApi"
import { useState } from "react"
import Pagination from "@/components/shared/pagenation"

export default function UserManagement() {
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1)
    const limit = 5
    const { data:userData } = useGetUsersQuery({
        searchTerm,
        page,
        limit,
    })
    // Placeholder for user management logic
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                    <p className="text-gray-600">Create, edit, and manage your users</p>
                </div>

            </div>


            <Card>
                <CardHeader>
                    <CardTitle>User List</CardTitle>
                    <CardDescription>Manage all your application users</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                placeholder="Search users..."
                                value={searchTerm}
                                onChange={(e)=> setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                       
                     
                        
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Avatar</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                {/* <TableHead>Role</TableHead>
                              */}
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {/* Map users here */}
                           {
                            userData?.data?.map((user:User)=>(
                                 <TableRow key={user?.id}>
                                <TableCell>
                                    <img src={user?.avatar} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
                                </TableCell>
                                <TableCell>{user?.name}</TableCell>
                                <TableCell>{user?.email}</TableCell>
                                {/* <TableCell><Badge className="bg-blue-100 text-blue-800">{user?.isAdmin}</Badge></TableCell>  */}
                            
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem>
                                                <Eye className="mr-2 h-4 w-4" />
                                                View Details
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Edit className="mr-2 h-4 w-4" />
                                                Edit User
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-red-600">
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Delete User
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                            ))
                           }
                        </TableBody>
                    </Table>

                    <Pagination page={page} setPage={setPage} length={userData?.data?.users?.length} limit={10} />
                </CardContent>
            </Card>
        </div>
    )
}
