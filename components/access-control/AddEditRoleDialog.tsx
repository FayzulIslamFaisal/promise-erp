"use client";

import { useState, useEffect } from "react";
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

interface Permission {
  role: string;
  view: boolean;
  edit: boolean;
  create: boolean;
  delete: boolean;
}

interface AddEditRoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialRoleName?: string | null; // If editing
}

const AddEditRoleDialog: React.FC<AddEditRoleDialogProps> = ({
  open,
  onOpenChange,
  initialRoleName = null,
}) => {
  const [roleName, setRoleName] = useState(initialRoleName || "");
  const [permissions, setPermissions] = useState<Permission[]>([
    { role: "Admin", view: false, edit: false, create: false, delete: false },
    { role: "Editor", view: false, edit: false, create: false, delete: false },
    { role: "Viewer", view: false, edit: false, create: false, delete: false },
  ]);

  useEffect(() => {
    setRoleName(initialRoleName || "");
  }, [initialRoleName]);

  // Handle checkbox changes
  const handlePermissionChange = (
    index: number,
    field: keyof Omit<Permission, "role">,
    value: boolean,
  ) => {
    const newPermissions = [...permissions];
    newPermissions[index][field] = value;
    setPermissions(newPermissions);
  };

  const saveRole = () => {
    console.log("Role Name:", roleName);
    console.log("Permissions:", permissions);
    if (initialRoleName) {
      console.log("Edited role:", roleName);
      // Call API to update role
    } else {
      console.log("Added new role:", roleName);
      // Call API to add new role
    }
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-2xl w-full">
        <AlertDialogHeader className="relative">
          <AlertDialogTitle>
            {initialRoleName ? "Edit Role" : "Add Role"}
          </AlertDialogTitle>
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-0 top-0 rounded-sm p-1 text-white hover:text-white bg-red-600 transition cursor-pointer"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </AlertDialogHeader>

        <div className="flex flex-col gap-6 mt-4">
          {/* Role Name Input */}
          <div className="space-y-2">
            <Label htmlFor="role-name" className="text-sm font-medium">
              Role Name
            </Label>
            <input
              id="role-name"
              placeholder="Enter a role name"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Permissions Table */}
          <Card>
            <CardContent className="p-0">
              <div className="p-4 border-b">
                <h3 className="text-lg font-semibold">Role Permissions</h3>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Role</TableHead>
                      <TableHead className="text-center font-semibold">
                        View
                      </TableHead>
                      <TableHead className="text-center font-semibold">
                        Edit
                      </TableHead>
                      <TableHead className="text-center font-semibold">
                        Create
                      </TableHead>
                      <TableHead className="text-center font-semibold">
                        Delete
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {permissions.map((permission, index) => (
                      <TableRow
                        key={permission.role}
                        className="hover:bg-muted/50"
                      >
                        <TableCell className="font-medium">
                          {permission.role}
                        </TableCell>
                        <TableCell className="text-center">
                          <Checkbox
                            checked={permission.view}
                            onCheckedChange={(checked) =>
                              handlePermissionChange(
                                index,
                                "view",
                                checked as boolean,
                              )
                            }
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <Checkbox
                            checked={permission.edit}
                            onCheckedChange={(checked) =>
                              handlePermissionChange(
                                index,
                                "edit",
                                checked as boolean,
                              )
                            }
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <Checkbox
                            checked={permission.create}
                            onCheckedChange={(checked) =>
                              handlePermissionChange(
                                index,
                                "create",
                                checked as boolean,
                              )
                            }
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <Checkbox
                            checked={permission.delete}
                            onCheckedChange={(checked) =>
                              handlePermissionChange(
                                index,
                                "delete",
                                checked as boolean,
                              )
                            }
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Buttons */}
        <AlertDialogFooter className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={saveRole}>
            {initialRoleName ? "Update" : "Submit"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddEditRoleDialog;
