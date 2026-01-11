
import ErrorComponent from "@/components/common/ErrorComponent";
import NotFoundComponent from "@/components/common/NotFoundComponent";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Pagination from "@/components/common/Pagination";
import { getEnrollments } from "@/apiServices/enrollmentService";

export default async function EnrollmentsData({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const page =
        typeof searchParams.page === "string" ? Number(searchParams.page) : 1;

    const params = {
        page,
        search:
            typeof searchParams.search === "string"
                ? searchParams.search
                : undefined,
        sort_order:
            typeof searchParams.sort_order === "string"
                ? searchParams.sort_order
                : "desc",
        batch_id:
            typeof searchParams.batch_id === "string"
                ? searchParams.batch_id
                : undefined,
        branch_id:
            typeof searchParams.branch_id === "string"
                ? searchParams.branch_id
                : undefined,
        course_id:
            typeof searchParams.course_id === "string"
                ? searchParams.course_id
                : undefined,
        per_page: 15
    };

    let data;
    try {
        data = await getEnrollments(params);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return <ErrorComponent message={error.message} />;
        } else {
            return <ErrorComponent message="An unexpected error occurred." />;
        }
    }

    const enrollments = data?.data?.enrollments;
    const paginationData = data?.data?.pagination;

    if (enrollments?.length <= 0) {
        return <NotFoundComponent message={data?.message} title="Enrollment List" />;
    }

    console.log("enrollments", data);

    return (
        <>
            <div className="rounded-md border overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center w-[50px]">Sl</TableHead>
                            <TableHead className="text-center min-w-[150px]">Student Name</TableHead>
                            <TableHead className="min-w-[120px]">Email & Phone</TableHead>
                            <TableHead className="min-w-[150px]">Course & Batch</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                            <TableHead className="text-center min-w-[120px]">Enrollment Date</TableHead>
                            <TableHead className="text-center min-w-[100px]">Status</TableHead>
                            <TableHead className="text-center min-w-[120px]">Payment Status</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {enrollments?.map((enrollment, i) => (
                            <TableRow key={enrollment?.id}>
                                <TableCell className="text-center">{(page - 1) * 15 + (i + 1)}</TableCell>
                                <TableCell className="font-medium text-center">{enrollment.user?.name || "N/A"}</TableCell>
                                <TableCell>{enrollment.user?.email || "N/A"} <br /> {enrollment.user?.phone || "N/A"}</TableCell>
                                <TableCell>{enrollment.batch?.course?.title || "N/A"} <br /> {enrollment.batch?.name || "N/A"}</TableCell>
                                <TableCell className="text-right">
                                    <del>{enrollment.original_price} ৳</del> <br />
                                    <span className="font-semibold text-primary">{enrollment.final_price} ৳</span>
                                </TableCell>
                                <TableCell className="whitespace-nowrap text-xs text-center">
                                    {enrollment.enrollment_date ? new Date(enrollment.enrollment_date).toLocaleDateString() : "N/A"}
                                </TableCell>
                                <TableCell className="text-center">
                                    <Badge
                                        variant={enrollment.status === 1 ? "default" : "secondary"}
                                    >
                                        {enrollment.status_label || "N/A"}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-center">
                                    <Badge
                                        variant={enrollment.payment_status === 1 ? "default" : "secondary"}
                                    >
                                        {enrollment.payment_status_label || "N/A"}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            {paginationData && (
                <div className="mt-4">
                    <Pagination pagination={paginationData} />
                </div>
            )}
        </>
    );
}
