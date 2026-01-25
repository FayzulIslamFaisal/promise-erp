"use client";

import { useState, useEffect, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import {
  getRolePermissionslist,
  RolePermissionModule,
  RolePermission,
} from "@/apiServices/rolePermissionService";

interface AddEditRoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialRoleName?: string | null;
  token?: string;
}

const AddEditRoleDialog: React.FC<AddEditRoleDialogProps> = ({
  open,
  onOpenChange,
  initialRoleName = null,
  token,
}) => {
  const [roleName, setRoleName] = useState(initialRoleName || "");
  const [rolePermissionList, setrolePermissionList] = useState<
    RolePermissionModule[]
  >([]);
  const [isPending, startTransition] = useTransition();

  // Fetch permissions list
  useEffect(() => {
    if (!token) return;

    startTransition(async () => {
      try {
        const response = await getRolePermissionslist({ token });
        if (response.success) {
          setrolePermissionList(response.data.permissions);
        } else {
          console.error(response.message);
        }
      } catch (error) {
        console.error("Permission fetch error:", error);
      }
    });
  }, [token]);

  useEffect(() => {
    setRoleName(initialRoleName || "");
  }, [initialRoleName]);

  // Mobile-friendly permission display
  const MobilePermissionRow = ({
    module,
  }: {
    module: RolePermissionModule;
  }) => (
    <div className="border rounded-lg p-4 mb-3 bg-white shadow-sm">
      <div className="flex justify-between items-center mb-3 pb-2 border-b">
        <h4 className="font-semibold text-sm truncate">
          {module.module_title}
        </h4>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
          Permissions
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center space-x-2">
          <Checkbox className="h-4 w-4" />
          <Label className="text-sm">View</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox className="h-4 w-4" />
          <Label className="text-sm">Edit</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox className="h-4 w-4" />
          <Label className="text-sm">Create</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox className="h-4 w-4" />
          <Label className="text-sm">Delete</Label>
        </div>
      </div>
    </div>
  );

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-4xl max-h-[90vh] overflow-hidden flex flex-col w-[95vw] mx-2 p-0">
        <AlertDialogHeader className="sticky top-0 z-10 bg-white border-b px-4 py-3">
          <div className="flex items-center justify-between">
            <AlertDialogTitle className="text-lg sm:text-xl">
              {initialRoleName ? "Edit Role" : "Add Role"}
            </AlertDialogTitle>
            <button
              onClick={() => onOpenChange(false)}
              className="rounded-full p-1.5 hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </AlertDialogHeader>

        <div className="flex-1 overflow-y-auto px-4 py-3">
          <div className="flex flex-col gap-4">
            {/* Role Name */}
            <div className="space-y-2">
              <Label htmlFor="role-name" className="text-sm font-medium">
                Role Name
              </Label>
              <input
                id="role-name"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                className="w-full border rounded-lg px-3 py-2.5 bg-white text-sm"
                placeholder="Enter role name"
              />
            </div>

            {/* Permission Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base sm:text-lg font-semibold">
                  Role Permissions
                </h3>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {rolePermissionList.length} modules
                </span>
              </div>

              {/* Desktop Table (hidden on mobile) */}
              <div className="hidden sm:block">
                <Card className="border rounded-lg overflow-hidden">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-gray-50 hover:bg-gray-50">
                            <TableHead className="font-semibold text-gray-700">
                              Module
                            </TableHead>
                            <TableHead className="text-center font-semibold text-gray-700">
                              View
                            </TableHead>
                            <TableHead className="text-center font-semibold text-gray-700">
                              Edit
                            </TableHead>
                            <TableHead className="text-center font-semibold text-gray-700">
                              Create
                            </TableHead>
                            <TableHead className="text-center font-semibold text-gray-700">
                              Delete
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {rolePermissionList.map((module) => (
                            <TableRow
                              key={module.module_title}
                              className="hover:bg-gray-50/50"
                            >
                              <TableCell className="font-medium py-3">
                                <span className="truncate block max-w-[180px]">
                                  {module.module_title}
                                </span>
                              </TableCell>
                              <TableCell className="text-center py-3">
                                <Checkbox className="mx-auto" />
                              </TableCell>
                              <TableCell className="text-center py-3">
                                <Checkbox className="mx-auto" />
                              </TableCell>
                              <TableCell className="text-center py-3">
                                <Checkbox className="mx-auto" />
                              </TableCell>
                              <TableCell className="text-center py-3">
                                <Checkbox className="mx-auto" />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Mobile Cards (visible on mobile) */}
              <div className="sm:hidden space-y-3">
                {rolePermissionList.map((module) => (
                  <MobilePermissionRow
                    key={module.module_title}
                    module={module}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <AlertDialogFooter className="sticky bottom-0 bg-white border-t px-4 py-3 mt-4">
          <div className="flex flex-col sm:flex-row w-full gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="w-full sm:w-auto order-2 sm:order-1"
              size="sm"
            >
              Close
            </Button>
            <Button className="w-full sm:w-auto order-1 sm:order-2" size="sm">
              Save Changes
            </Button>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddEditRoleDialog;
