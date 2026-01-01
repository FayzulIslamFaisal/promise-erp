"use client";

import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { getJoins, JoinType } from "@/apiServices/joinService";
import {
    assignJoinsToCourse,
    getCourseJoins,
    AssignedJoinsResponse,
} from "@/apiServices/courseService";
import { handleFormSuccess } from "@/lib/formErrorHandler";
import { toast } from "sonner";

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import NotFoundComponent from "@/components/common/NotFoundComponent";

/* =======================
   Types & Interfaces
======================= */

interface WhoCanJoinSelectionProps {
    courseId: number;
    onSuccess: () => void;
    isEdit?: boolean;
}

interface FormValues {
    joins: number[];
}

/* =======================
   Component
======================= */

export default function WhoCanJoinSelection({
    courseId,
    onSuccess,
    isEdit = false,
}: WhoCanJoinSelectionProps) {
    const [joins, setJoins] = useState<JoinType[]>([]);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [saveError, setSaveError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();
    const [isLoading, setIsLoading] = useState(true);

    const { watch, setValue, handleSubmit } = useForm<FormValues>({
        defaultValues: { joins: [] },
    });

    const selectedJoinIds = watch("joins");

    /* =======================
       Load all joins
    ======================= */
    const loadJoins = () => {
        setLoadError(null);
        setIsLoading(true);

        startTransition(async () => {
            try {
                const queryParams = {
                    per_page: "1000",
                    page: "1",
                    status: "1",
                };

                const response = await getJoins(1, queryParams);

                if (response?.data?.joins) {
                    setJoins(response.data.joins);
                } else {
                    throw new Error("Failed to load joins");
                }
            } catch (error: unknown) {
                const errorMessage =
                    error instanceof Error
                        ? error.message
                        : "Failed to load joins";

                setLoadError(errorMessage);
                toast.error(errorMessage);
            } finally {
                setIsLoading(false);
            }
        });
    };

    useEffect(() => {
        loadJoins();
    }, []);

    /* =======================
       Load assigned joins (Edit mode)
    ======================= */
    useEffect(() => {
        if (!isEdit || !courseId) return;

        const fetchAssignedJoins = async () => {
            try {
                const response: AssignedJoinsResponse = await getCourseJoins(courseId);

                if (response.success && response.data) {
                    let joinsList: JoinType[] = [];

                    if (Array.isArray(response.data)) {
                        joinsList = response.data;
                    } else if ('joins' in response.data && Array.isArray(response.data.joins)) {
                        joinsList = response.data.joins;
                    }

                    if (joinsList.length > 0) {
                        const assignedJoinIds = joinsList.map((join) => join.id);
                        setValue("joins", assignedJoinIds);
                    }
                }
            } catch (error: unknown) {
                console.error("Failed to load assigned joins", error);
            }
        };

        fetchAssignedJoins();
    }, [isEdit, courseId, setValue]);

    /* =======================
       Toggle join selection
    ======================= */
    const toggleJoin = (
        joinId: number,
        isChecked: boolean
    ) => {
        const updatedJoinIds = isChecked
            ? [...selectedJoinIds, joinId]
            : selectedJoinIds.filter(
                (selectedId) => selectedId !== joinId
            );

        setValue("joins", updatedJoinIds, {
            shouldValidate: true,
        });
        setSaveError(null);
    };

    /* =======================
       Submit selected joins
    ======================= */
    const onSubmit = (formData: FormValues) => {
        if (formData.joins.length === 0) {
            const errorMessage =
                "Please select at least 1 option";
            setSaveError(errorMessage);
            toast.error(errorMessage);
            return;
        }

        setSaveError(null);

        startTransition(async () => {
            try {
                const response = await assignJoinsToCourse(
                    courseId,
                    formData.joins
                );

                if (response.success) {
                    handleFormSuccess(
                        response.message ||
                        "Joins assigned successfully!"
                    );
                    onSuccess();
                } else {
                    throw new Error(
                        response.message || "Failed to save joins"
                    );
                }
            } catch (error: unknown) {
                const errorMessage =
                    error instanceof Error
                        ? error.message
                        : "Failed to save joins";

                setSaveError(errorMessage);
                toast.error(errorMessage);
            }
        });
    };

    /* =======================
       UI
    ======================= */
    return (
        <Card className="w-full mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl">
                    Who Can Join?
                </CardTitle>
            </CardHeader>

            <CardContent>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid gap-6"
                >
                    {/* Loading */}
                    {isLoading && !loadError && (
                        <p className="text-center">
                            Loading options…
                        </p>
                    )}

                    {/* Error */}
                    {loadError && (
                        <NotFoundComponent
                            message={loadError}
                            onActionClick={loadJoins}
                            actionLabel="Try Again"
                        />
                    )}

                    {/* Empty */}
                    {!loadError &&
                        !isLoading &&
                        joins.length === 0 && (
                            <NotFoundComponent
                                message="No active options found. Please create 'Who Can Join' items first."
                                onActionClick={loadJoins}
                                actionLabel="Refresh"
                            />
                        )}

                    {/* Validation Error */}
                    {saveError && (
                        <div className="bg-destructive/15 text-destructive p-3 rounded-md">
                            {saveError}
                        </div>
                    )}

                    {/* Joins List */}
                    {!isLoading &&
                        !loadError &&
                        joins.length > 0 && (
                            <div className="grid gap-4">
                                <Label>
                                    Select who can join this course:
                                </Label>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {joins.map((join) => {
                                        const isSelected = selectedJoinIds.includes(join.id);
                                        return (
                                            <div
                                                key={join.id}
                                                className={`flex items-center gap-3 p-4 rounded-lg border transition-all select-none relative group ${isSelected ? "bg-accent border-primary" : "hover:bg-accent/50"
                                                    }`}
                                            >
                                                <Checkbox
                                                    id={`join-${join.id}`}
                                                    checked={isSelected}
                                                    onCheckedChange={(checked) =>
                                                        toggleJoin(join.id, Boolean(checked))
                                                    }
                                                    className="z-10"
                                                />

                                                <Label
                                                    htmlFor={`join-${join.id}`}
                                                    className="cursor-pointer font-medium w-full stretched-link after:absolute after:inset-0"
                                                >
                                                    {join.title}
                                                </Label>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                    {/* Save Button */}
                    {!isLoading &&
                        !loadError &&
                        joins.length > 0 && (
                            <div className="flex justify-end mt-4">
                                <Button
                                    type="submit"
                                    className="w-32"
                                    disabled={
                                        isPending ||
                                        selectedJoinIds.length === 0
                                    }
                                >
                                    {isPending
                                        ? "Saving..."
                                        : "Save"}
                                </Button>
                            </div>
                        )}
                </form>
            </CardContent>
        </Card>
    );
}
