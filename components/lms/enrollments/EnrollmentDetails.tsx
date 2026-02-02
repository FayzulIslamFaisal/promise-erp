"use client";

import { EnrollmentDetail } from "@/apiServices/enrollmentService";
import {
    createPayment,
} from "@/apiServices/paymentHistoryService";
import {
    PAYMENT_STATUS_PENDING,
    PAYMENT_STATUS_PAID,
    PAYMENT_STATUS_REFUNDED,
    PAYMENT_METHOD_BKASH,
    PAYMENT_METHOD_ROCKET,
    PAYMENT_METHOD_NAGAD,
    PAYMENT_METHOD_PAYLATER,
    PAYMENT_METHOD_CASH,
} from "@/apiServices/paymentConstants";
import EnrollmentStatusDropdown from "./EnrollmentStatusDropdown";
import PaymentHistoryStatusDropdown from "./PaymentHistoryStatusDropdown";
import ErrorComponent from "@/components/common/ErrorComponent";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

interface InfoRowProps {
    label: string;
    value?: string | number | null;
    className?: string;
}

const InfoRow = ({ label, value, className }: InfoRowProps) => (
    <div className={`flex items-center justify-between text-sm ${className || ""}`}>
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium text-right">
            {typeof value === 'object' && value !== null ? "N/A" : (value ?? "N/A")}
        </span>
    </div>
);

interface EnrollmentDetailsProps {
    enrollment?: EnrollmentDetail | null;
    errorMessage?: string;
}

const formatCurrency = (amount?: number | null) =>
    amount !== undefined && amount !== null
        ? `${Number(amount).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })} ৳`
        : "N/A";

export default function EnrollmentDetails({
    enrollment,
    errorMessage,
}: EnrollmentDetailsProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
    const [paymentFormData, setPaymentFormData] = useState({
        paid_amount: "",
        payment_method: PAYMENT_METHOD_BKASH.toString(),
        payment_status: PAYMENT_STATUS_PAID.toString(),
        comment: "",
    });

    if (errorMessage) {
        return <ErrorComponent message={errorMessage} />;
    }

    if (!enrollment) {
        return <ErrorComponent message="Enrollment details not found." />;
    }

    const paymentHistories = enrollment.payment_histories ?? [];
    const totalPaid = paymentHistories.reduce(
        (sum, history) =>
            sum + Number(history.payment_details?.paid_amount ?? 0),
        0
    );
    const dueAmount =
        enrollment.due_amount ??
        Math.max((enrollment.final_price ?? 0) - totalPaid, 0);


    const handleCreatePayment = () => {
        if (!paymentFormData.paid_amount || Number(paymentFormData.paid_amount) <= 0) {
            toast.error("Please enter a valid payment amount");
            return;
        }

        if (Number(paymentFormData.paid_amount) > dueAmount) {
            toast.error(`Payment amount cannot exceed due amount of ${formatCurrency(dueAmount)}`);
            return;
        }

        startTransition(async () => {
            try {
                const paidAmount = Number(paymentFormData.paid_amount);

                await createPayment({
                    enrollment_id: enrollment.id,
                    paid_amount: paidAmount,
                    payment_method: Number(paymentFormData.payment_method),
                    payment_status: Number(paymentFormData.payment_status),
                    comment: paymentFormData.comment || undefined,
                });

                toast.success("Payment created successfully");
                setIsPaymentDialogOpen(false);
                setPaymentFormData({
                    paid_amount: "",
                    payment_method: PAYMENT_METHOD_BKASH.toString(),
                    payment_status: PAYMENT_STATUS_PAID.toString(),
                    comment: "",
                });
                router.refresh();
            } catch (error: unknown) {
                if (error instanceof Error) {
                    toast.error(error.message);
                } else {
                    toast.error("Failed to create payment");
                }
            }
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                    <Link href="/lms/enrollments" className="flex items-center gap-2 py-2">
                        <ArrowLeft className="h-4 w-4" />
                        Back to enrollments
                    </Link>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Enrollment Details
                    </h1>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant={enrollment.status_label === "Active" ? "default" : "secondary"}>
                        {enrollment.status_label || "N/A"}
                    </Badge>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Student</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <InfoRow label="Name" value={enrollment.user?.name} />
                        <InfoRow label="Email" value={enrollment.user?.email} />
                        <InfoRow label="Phone" value={enrollment.user?.phone} />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Enrollment Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Status</span>
                            <EnrollmentStatusDropdown
                                enrollmentId={enrollment.id}
                                currentStatus={enrollment.status || 0}
                            />
                        </div>
                        <InfoRow label="Course" value={enrollment.batch?.course?.title} />
                        <InfoRow label="Batch" value={enrollment.batch?.name} />
                        <InfoRow label="Enrollment Date" value={enrollment.enrollment_date} />
                        <InfoRow label="Approved By" value={enrollment.approved_by ?? "N/A"} />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Payment Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <InfoRow label="Payment Status" value={enrollment.payment_status_label} />
                        <InfoRow label="Original Price" value={formatCurrency(enrollment.original_price)} />
                        <InfoRow label="Discount" value={formatCurrency(enrollment.discount_amount)} />
                        <InfoRow label="Final Price" value={formatCurrency(enrollment.final_price)} />
                        <InfoRow className="text-primary" label="Total Paid" value={formatCurrency(totalPaid || enrollment.payment_amount)} />
                        <InfoRow className="text-red-500" label="Due Amount" value={formatCurrency(dueAmount)} />
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Payment Histories</CardTitle>
                        {dueAmount > 0 && (
                            <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button size="sm" className="gap-2">
                                        <Plus className="h-4 w-4" />
                                        Add Payment
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[500px]">
                                    <DialogHeader>
                                        <DialogTitle>Create New Payment</DialogTitle>
                                        <DialogDescription>
                                            Add a new payment record for this enrollment. Due amount: {formatCurrency(dueAmount)}
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4 py-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="paid_amount">Payment Amount *</Label>
                                            <Input
                                                id="paid_amount"
                                                type="number"
                                                step="1"
                                                min="1"
                                                max={dueAmount}
                                                placeholder="Enter payment amount"
                                                value={paymentFormData.paid_amount}
                                                onChange={(e) =>
                                                    setPaymentFormData({
                                                        ...paymentFormData,
                                                        paid_amount: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="payment_method">Payment Method *</Label>
                                            <Select
                                                value={paymentFormData.payment_method}
                                                onValueChange={(value) =>
                                                    setPaymentFormData({
                                                        ...paymentFormData,
                                                        payment_method: value,
                                                    })
                                                }
                                            >
                                                <SelectTrigger id="payment_method" className="w-full">
                                                    <SelectValue placeholder="Select payment method" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value={PAYMENT_METHOD_BKASH.toString()}>bKash</SelectItem>
                                                    <SelectItem value={PAYMENT_METHOD_ROCKET.toString()}>Rocket</SelectItem>
                                                    <SelectItem value={PAYMENT_METHOD_NAGAD.toString()}>Nagad</SelectItem>
                                                    <SelectItem value={PAYMENT_METHOD_CASH.toString()}>Cash</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="payment_status">Payment Status *</Label>
                                            <Select
                                                value={paymentFormData.payment_status}
                                                onValueChange={(value) => setPaymentFormData({ ...paymentFormData, payment_status: value })}
                                            >
                                                <SelectTrigger id="payment_status" className="w-full">
                                                    <SelectValue placeholder="Select payment status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value={PAYMENT_STATUS_PAID.toString()}>Paid</SelectItem>
                                                    <SelectItem value={PAYMENT_STATUS_PENDING.toString()}>Pending</SelectItem>
                                                    <SelectItem value={PAYMENT_STATUS_REFUNDED.toString()}>Refunded</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="comment">Comment</Label>
                                            <Textarea
                                                id="comment"
                                                placeholder="Add any additional notes..."
                                                value={paymentFormData.comment}
                                                onChange={(e) => setPaymentFormData({ ...paymentFormData, comment: e.target.value })}
                                                rows={3}
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button
                                            variant="outline"
                                            onClick={() => setIsPaymentDialogOpen(false)}
                                            disabled={isPending}
                                        >
                                            Cancel
                                        </Button>
                                        <Button onClick={handleCreatePayment} disabled={isPending}>
                                            {isPending ? "Creating..." : "Create Payment"}
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        )}
                    </div>
                </CardHeader>
                <CardContent>
                    {paymentHistories.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No payment records found.</p>
                    ) : (
                        <div className="rounded-md border overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>#</TableHead>
                                        <TableHead>Method</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead className="text-right">Paid</TableHead>
                                        <TableHead className="text-right">Due</TableHead>
                                        <TableHead>Comment</TableHead>
                                        <TableHead>Approved By</TableHead>
                                        {/* <TableHead className="text-center">Action</TableHead> */}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {paymentHistories.map((history, index) => {
                                        return (
                                            <TableRow key={history.id}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{history.payment_details?.payment_method_name ?? "N/A"}</TableCell>
                                                <TableCell>
                                                    <PaymentHistoryStatusDropdown
                                                        paymentHistoryId={history.id}
                                                        currentStatus={history.payment_details?.payment_status_name}
                                                    />
                                                </TableCell>
                                                <TableCell>{history.payment_details?.payment_type_name ?? "N/A"}</TableCell>
                                                <TableCell className="text-right">
                                                    {formatCurrency(history.payment_details?.paid_amount)}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    {formatCurrency(history.payment_details?.due_amount)}
                                                </TableCell>
                                                <TableCell className="max-w-[240px]">
                                                    {history.additional_info?.comment ?? "N/A"}
                                                </TableCell>
                                                <TableCell>
                                                    {history.approved_by ?? "N/A"}
                                                </TableCell>
                                                {/* <TableCell className="text-center">
                                                    <PaymentHistoryStatusDropdown
                                                        paymentHistoryId={history.id}
                                                        currentStatus={history.payment_details?.payment_status_name}
                                                    />
                                                </TableCell> */}
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
