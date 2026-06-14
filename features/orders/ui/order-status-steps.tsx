import { Check, PackageCheck, Truck, CircleCheckBig } from "lucide-react";
import { useTranslations } from "next-intl";
import { OrderStatus } from "../model/types";

type OrderStatusStepsProps = {
  status: OrderStatus;
};

const steps = [
  { key: "accepted",  icon: Check },
  { key: "preparing", icon: PackageCheck },
  { key: "on_the_way", icon: Truck },
  { key: "delivered", icon: CircleCheckBig },
] as const;

const statusStepMap: Record<OrderStatus, number> = {
  accepted:  0,
  preparing: 1,
  on_the_way: 2,
  delivered: 3,
  cancelled: -1,
};

export default function OrderStatusSteps({ status }: OrderStatusStepsProps) {
  const t = useTranslations("order_status");

  if (status === "cancelled") {
    return (
      <div className="rounded-[14px] border border-rose-400/15 bg-rose-400/[0.05] px-4 py-3 text-[13px] text-rose-200">
        {t("cancelled")}
      </div>
    );
  }

  const activeStep = statusStepMap[status];

  return (
    <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isDone = index <= activeStep;
        const isCurrent = index === activeStep;

        return (
          <div
            key={step.key}
            className={`rounded-[16px] border px-3 py-3 transition ${
              isDone
                ? "border-cyan-300/18 bg-cyan-300/[0.06]"
                : "border-white/8 bg-white/[0.025]"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  isDone
                    ? "bg-cyan-300/12 text-cyan-200"
                    : "bg-white/[0.04] text-white/40"
                }`}
              >
                <Icon size={14} />
              </div>

              <div>
                <p className={`text-[12px] font-medium ${isDone ? "text-white" : "text-white/50"}`}>
                  {t(`steps.${step.key}`)}
                </p>
                {isCurrent && (
                  <p className="mt-0.5 text-[10px] text-cyan-200">
                    {t("current")}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}