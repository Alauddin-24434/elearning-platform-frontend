"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
} from "@/redux/features/category/categoryApi"
import { Category } from "@/types"
import Pagination from "@/components/shared/pagenation"
import { Plus, Search, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function CategoryManagement() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [page, setPage] = useState(1)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const limit = 5

  const { data: categoryData } = useGetAllCategoriesQuery({ searchTerm, limit, page })
  const [createCategory, { isLoading: creating }] = useCreateCategoryMutation()
  const [deleteCategoryById] = useDeleteCategoryMutation()

  const categories = categoryData?.data

 

  const handleDeleteCategory = (id: string) => {
    deleteCategoryById(id)
  }

  const CategoryForm = ({ category, onClose }: { category?: Category; onClose: () => void }) => {
    const isEdit = !!category
    const { register, handleSubmit, reset } = useForm()

    const onSubmit = async (data: any) => {
      try {
        if (!isEdit) {
          await createCategory(data).unwrap()
        }
        reset()
        onClose()
      } catch (err) {
        console.error(err)
      }
    }

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          placeholder="Category Name"
          defaultValue={category?.name}
          {...register("name", { required: true })}
          className="border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 rounded-md px-3 py-2 w-full"
        />
        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={creating}>
            {isEdit ? "Update" : creating ? "Creating..." : "Create"}
          </Button>
        </div>
      </form>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Category Management</h1>
          <p className="text-gray-600">Create, edit, and manage your categories</p>
        </div>
        <div className="flex gap-2">
          <Button
            className="bg-[#32287B] text-white hover:bg-[#241D59]"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Category
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="flex gap-4 mt-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 rounded-md border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 w-full"
          />
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedCategories.length > 0 && (
        <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-lg mt-2">
          <span>{selectedCategories.length} selected</span>
          <Button
            variant="destructive"
            className="flex items-center gap-2"
            onClick={() => selectedCategories.forEach(id => handleDeleteCategory(id))}
          >
            <Trash2 className="w-4 h-4" /> Delete Selected
          </Button>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white border border-gray-200 rounded-md text-center">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-center px-6 py-3 font-bold text-gray-700 border-r border-gray-300">
                Name</th>
              <th className="text-center px-6 py-3 font-bold text-gray-700 border-r border-gray-300">
                Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categories?.map((category:Category) => (
              <tr key={category.id} className="hover:bg-gray-50">
                                              <td className="px-4 py-2 text-center text-gray-700 border-r border-gray-200">

                  {category.name}</td>
                <td className="px-4 py-2 text-gray-700 border-r border-gray-200 text-center flex justify-center gap-2">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => setEditingCategory(category)}
                  >
                    <Edit className="w-4 h-4" /> Edit
                  </Button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4">
        <Pagination page={page} setPage={setPage} length={categories?.length} limit={limit} />
      </div>

      {/* Add/Edit Dialog */}
      {isAddDialogOpen || editingCategory ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl">
            <h2 className="text-xl font-semibold mb-2">{editingCategory ? "Edit Category" : "Add Category"}</h2>
            <p className="text-gray-500 mb-4">
              {editingCategory ? "Update category information" : "Add a new category for your services"}
            </p>
            <CategoryForm
              category={editingCategory || undefined}
              onClose={() => {
                setIsAddDialogOpen(false)
                setEditingCategory(null)
              }}
            />
          </div>
        </div>
      ) : null}
    </div>
  )
}
