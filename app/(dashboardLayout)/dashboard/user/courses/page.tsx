"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    Search,
    MoreHorizontal,
    Eye,
    Edit,
    Trash2,
    Plus,
} from "lucide-react";
import { useForm } from "react-hook-form";
import Pagination from "@/components/shared/pagenation";

import { Course } from "@/types";
import {
    useCreateCourseMutation,
    useDeleteCourseMutation,
    useGetMyCoursesQuery,
} from "@/redux/features/course/courseApi";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

export default function MyCourses() {
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const limit = 5;
    const user = useSelector(selectCurrentUser)

    const { data: courseData } = useGetMyCoursesQuery({
        searchTerm,
        page,
        limit,
    });
    const [deleteCourseById] = useDeleteCourseMutation();
    const courses = courseData?.data;

    const [createCourse] = useCreateCourseMutation()

    const handleDeleteCourse = async (id: string) => {
        try {
            await deleteCourseById(id).unwrap();
        } catch (err) {
            console.error("Failed to delete course", err);
        }
    };

    const CourseForm = ({
        course,
        onClose,
    }: {
        course?: Course;
        onClose: () => void;
    }) => {
        const { register, handleSubmit} = useForm({
            defaultValues: {
                isFree: course?.isFree ?? false,
                price: course?.price ?? 0,
                title: course?.title ?? "",
                categoryId: course?.categoryId ?? "",
                description: course?.description ?? "",
                features: course?.features?.join(", ") ?? "",
                overviews: course?.overviews?.join(", ") ?? "",
                stack: course?.stack?.join(", ") ?? "",
                thumbnail: undefined as FileList | undefined,
                authorId: user?.id,
            },
        });


        const { data: categoryData } = useGetAllCategoriesQuery(undefined);


      const onSubmit = async (data: any) => {
  try {
    const formData = new FormData();

    // price is a number here, convert to string
    formData.append("price", String(data.price));

    // isFree is boolean here, convert to 'true' or 'false' string
    formData.append("isFree", data.isFree ? "true" : "false");

    formData.append("title", data.title);
    formData.append("categoryId", data.categoryId);
    formData.append("description", data.description);
    formData.append("authorId", data.authorId);

    if (data.thumbnail && data.thumbnail[0]) {
      formData.append("thumbnail", data.thumbnail[0]);
    }

    data.features?.split(",").forEach((item: string) => {
      formData.append("features[]", item.trim());
    });

    data.overviews?.split(",").forEach((item: string) => {
      formData.append("overviews[]", item.trim());
    });

    data.stack?.split(",").forEach((item: string) => {
      formData.append("stack[]", item.trim());
    });

    const res = await createCourse(formData).unwrap();
    console.log(res);
    // reset();
    // onClose();
  } catch (err) {
    console.error("Error submitting course:", err);
  }
};



        return (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    {/* Title */}
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            placeholder="Enter course title"
                            {...register("title", { required: true })}
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <Label htmlFor="price">Price</Label>
                        <Input
                            id="price"
                            type="number"
                            step="0.01"
                            placeholder="Enter course price"
                            {...register("price", { valueAsNumber: true, required: true })}
                        
                        />
                    </div>

                    {/* Is Free */}
                    <div>
                        <Label htmlFor="isFree">Is Free?</Label>
                        <select
                            id="isFree"
                            {...register("isFree", {
                                required: true,
                                setValueAs: (v) => v === "true", // ✅ string থেকে boolean কনভার্ট
                            })}
                            className="w-full h-10 rounded-md border"
                        >
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </select>
                    </div>


                    {/* Category */}
                    <div>
                        <Label htmlFor="categoryId">Category</Label>
                        <select
                            id="categoryId"
                            {...register("categoryId", { required: true })}
                            className="w-full h-10 rounded-md border"
                        >
                            <option value="">Select Category</option>
                            {categoryData?.data?.map((cat: any) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Thumbnail */}
                    <div className="col-span-2">
                        <Label htmlFor="thumbnail">Thumbnail (Image)</Label>
                        <Input
                            id="thumbnail"
                            type="file"
                            {...register("thumbnail")}
                            accept="image/*"
                        />
                    </div>

                    {/* Description */}
                    <div className="col-span-2">
                        <Label htmlFor="description">Description</Label>
                        <textarea
                            id="description"
                            placeholder="Write a short description"
                            {...register("description", { required: true })}
                            className="w-full border rounded-md p-2 min-h-[100px]"
                        />
                    </div>

                    {/* Features */}
                    <div className="col-span-2">
                        <Label htmlFor="features">Features (comma separated)</Label>
                        <Input
                            id="features"
                            placeholder="E.g. Lifetime access, Certificate"
                            {...register("features")}
                        />
                    </div>

                    {/* Overviews */}
                    <div className="col-span-2">
                        <Label htmlFor="overviews">Overviews (comma separated)</Label>
                        <Input
                            id="overviews"
                            placeholder="E.g. What will you learn..."
                            {...register("overviews")}
                        />
                    </div>

                    {/* Stack */}
                    <div className="col-span-2">
                        <Label htmlFor="stack">Tech Stack (comma separated)</Label>
                        <Input
                            id="stack"
                            placeholder="E.g. React, Node.js, MongoDB"
                            {...register("stack")}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button type="button" variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit" className="bg-[#d5d52b] text-[#313e3b] ">{course ? "Update" : "Create"} Course</Button>
                </DialogFooter>
            </form>
        );
    };


    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
                    <p className="text-gray-600">
                        Manage and update your uploaded courses
                    </p>
                </div>

                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Course
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl z-[9999] bg-[#006d5d]">
                        <DialogHeader>
                            <DialogTitle>Create New Courses</DialogTitle>
                            <DialogDescription>
                                Add a new course for other user
                            </DialogDescription>
                        </DialogHeader>
                        <CourseForm onClose={() => setIsAddDialogOpen(false)} />
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Course List</CardTitle>
                    <CardDescription>Your uploaded course details</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                placeholder="Search courses..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {courses?.map((course: Course) => (
                                <TableRow key={course.id}>
                                    <TableCell>{course.title}</TableCell>
                                    <TableCell>
                                        {course.isFree ? "Free" : `$${course.price}`}
                                    </TableCell>
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
                                                <DropdownMenuItem
                                                    onClick={() => setEditingCourse(course)}
                                                >
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handleDeleteCourse(course.id)}
                                                    className="text-red-600"
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <Pagination
                        page={page}
                        setPage={setPage}
                        length={courses?.length}
                        limit={limit}
                    />
                </CardContent>
            </Card>

            {/* Edit Dialog */}
            <Dialog open={!!editingCourse} onOpenChange={() => setEditingCourse(null)}>
                <DialogContent className="max-w-2xl z-[9999] backdrop-blur-sm">
                    <DialogHeader>
                        <DialogTitle>Edit Course</DialogTitle>
                        <DialogDescription>Update course details</DialogDescription>
                    </DialogHeader>
                    {editingCourse && (
                        <CourseForm
                            course={editingCourse}
                            onClose={() => setEditingCourse(null)}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
