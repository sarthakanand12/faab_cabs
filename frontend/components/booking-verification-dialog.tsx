"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

interface BookingVerificationDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    phoneNumber: string
    onConfirm: () => void
    isSubmitting: boolean
}

export function BookingVerificationDialog({
    open,
    onOpenChange,
    phoneNumber,
    onConfirm,
    isSubmitting,
}: BookingVerificationDialogProps) {
    const { t } = useLanguage()
    const digitCount = phoneNumber.replace(/\D/g, "").length
    const isPhoneInvalid = digitCount < 10

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent showCloseButton={!isSubmitting} className="booking-verify-zoom">
                <DialogHeader>
                    <DialogTitle>{t("verify_mobile_title")}</DialogTitle>
                    <DialogDescription>
                        {t("verify_mobile_description")}
                    </DialogDescription>
                </DialogHeader>

                <div className="booking-verify-mobile-zoom space-y-2 rounded-lg border bg-secondary/30 p-4 text-sm">
                    <p>
                        <span className="font-semibold">{t("mobile_label")} : </span>
                        <strong className="font-bold bold-text-mobile-number-to-verify">{phoneNumber || "—"}</strong>
                    </p>
                </div>

                {isPhoneInvalid && (
                    <p className="text-xs text-destructive">{t("mobile_incorrect")}</p>
                )}

                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={isSubmitting}
                    >
                        {t("edit")}
                    </Button>
                    <Button type="button" onClick={onConfirm} disabled={isSubmitting || isPhoneInvalid}>
                        {isSubmitting ? t("submitting") : t("confirm_and_submit")}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
