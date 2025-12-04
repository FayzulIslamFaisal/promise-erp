import { getFacilities } from "@/apiServices/facilitiesService";
import ErrorComponent from "@/components/common/ErrorComponent";
import NotFoundComponent from "@/components/common/NotFoundComponent";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Pencil } from "lucide-react";
import Link from "next/link";
import Pagination from "@/components/common/Pagination";
import DeleteFacilityButton from "@/components/lms/facilities/DeleteButton";
import Image from "next/image";

type SearchParams = Record<string, string | string[] | undefined>;

export default async function FacilitiesData({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}) {
    const paramsObj = await searchParams;

    const params = {
        search: typeof paramsObj.search === "string" ? paramsObj.search : undefined,
        sort: typeof paramsObj.sort === "string"  ? paramsObj.sort : "desc",
        status: typeof paramsObj.status === "string" ? Number(paramsObj.status) : undefined,
        page : typeof paramsObj.page === "string" ? Number(paramsObj.page) : 1,
        per_page: 15,
    };

    let data;

    try {
        data = await getFacilities(params);
    } catch (error: any) {
        return (
            <ErrorComponent
                message={error?.message ?? "Failed to load Facilities"}
            />
        );
    }

    const facilities = data?.data?.facilities ?? [];
    const pagination = data?.data?.pagination;

    if (!facilities.length) {
        return <NotFoundComponent message="No facilities found." />;
    }

    return (
        <>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead className="text-center">Action</TableHead>
                            <TableHead>Image</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {facilities.map((item: any, index: number) => (
                            <TableRow key={item.id}>
                                <TableCell>{index + 1}</TableCell>

                                {/* ACTION DROPDOWN */}
                                <TableCell className="text-center">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Badge
                                                variant="default"
                                                className="cursor-pointer"
                                            >
                                                Action
                                            </Badge>
                                        </DropdownMenuTrigger>

                                        <DropdownMenuContent align="center">
                                            <DropdownMenuItem asChild>
                                                <Link
                                                    href={`/lms/facilities/${item.id}/edit`}
                                                    className="flex items-center"
                                                >
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    Manage
                                                </Link>
                                            </DropdownMenuItem>

                                            <DropdownMenuItem asChild>
                                                <DeleteFacilityButton
                                                    id={item.id}
                                                />
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>

                                {/* IMAGE */}
                                <TableCell className="font-medium">
                                    <Image
                                        src={
                                            item.image ||
                                            "/images/placeholder.png"
                                        }
                                        alt={item.title}
                                        width={40}
                                        height={40}
                                        className="object-cover rounded-md border"
                                    />
                                </TableCell>

                                {/* TITLE */}
                                <TableCell>{item.title}</TableCell>

                                {/* STATUS */}
                                <TableCell>
                                    {item.status === 1 ? (
                                        <Badge className="bg-green-600">
                                            Active
                                        </Badge>
                                    ) : (
                                        <Badge variant="destructive">
                                            Inactive
                                        </Badge>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Pagination pagination={pagination} />
        </>
    );
}
