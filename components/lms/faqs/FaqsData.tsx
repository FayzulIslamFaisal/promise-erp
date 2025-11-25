import { getFaqs } from "@/apiServices/faqsService";
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
import DeleteButton from "@/components/lms/faqs/DeleteButton";

type SearchParams = Record<string, string | string[] | undefined>;

export default async function FaqsData({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}) {
    const paramsObj = await searchParams;

    const page = typeof paramsObj.page === "string" ? Number(paramsObj.page) : 1;

    // --- FIXED PARAMS ---
    const params = {
        search:
            typeof paramsObj.search === "string" ? paramsObj.search : undefined,

        sort:
            typeof paramsObj.sort === "string" ? paramsObj.sort : "desc",

        status:
            typeof paramsObj.status === "string"
                ? Number(paramsObj.status)
                : undefined,

        per_page: 15,
        page,
    };

    let data;

    try {
        data = await getFaqs(page, params);
    } catch (error: any) {
        return (
            <ErrorComponent
                message={error?.message ?? "Failed to load FAQs"}
            />
        );
    }

    const faqs = data?.data?.faq_sections ?? [];
    console.log("FAQs Data:", data);
    const pagination = data?.data?.pagination;

    if (!faqs.length) {
        return <NotFoundComponent message="No FAQs found." />;
    }

    return (
        <>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead className="text-center">Action</TableHead>
                            <TableHead>Question</TableHead>
                            <TableHead>Answer</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {faqs.map((faq: any, index: number) => (
                            <TableRow key={faq.id}>
                                <TableCell>{index + 1}</TableCell>

                                <TableCell className="text-center">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Badge variant="default" className="cursor-pointer">
                                                Action
                                            </Badge>
                                        </DropdownMenuTrigger>

                                        <DropdownMenuContent align="center">
                                            <DropdownMenuItem asChild>
                                                <Link
                                                    href={`/lms/faqs/${faq.id}/edit`}
                                                    className="flex items-center"
                                                >
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    Manage
                                                </Link>
                                            </DropdownMenuItem>

                                            <DropdownMenuItem asChild>
                                                <DeleteButton id={faq.id} />
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>

                                <TableCell>{faq?.question}</TableCell>
                                <TableCell>{faq?.answer}</TableCell>

                                <TableCell>
                                    {faq?.status === 1 ? (
                                        <Badge className="bg-green-600">Active</Badge>
                                    ) : (
                                        <Badge variant="destructive">Inactive</Badge>
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
