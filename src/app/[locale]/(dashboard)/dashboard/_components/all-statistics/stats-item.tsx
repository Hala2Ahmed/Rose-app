import { cn } from "@/lib/utils/tailwind-merge";
import {
  CircleDollarSign,
  ClipboardList,
  Package,
  ReceiptText,
} from "lucide-react";
import { LucideIcon } from "lucide-react";
import { getFormatter, getLocale, getTranslations } from "next-intl/server";

interface StatItemProps {
  icon: LucideIcon;
  value: React.ReactNode;
  label: string;
  iconClassName: string;
  bgClassName: string;
}

function StatItem({
  icon: Icon,
  value,
  label,
  iconClassName,
  bgClassName,
}: StatItemProps) {
  return (
    <div className={cn(" rounded-2xl p-4 w-full", bgClassName)}>
      <Icon className={iconClassName} width={35} height={35} />

      {/* Value Of Stats */}
      <span
        className={cn("font-semibold text-2xl mt-3 mb-1 block", iconClassName)}
      >
        {value}
      </span>

      <p className="text-zinc-800 dark:text-zinc-200 font-medium">{label}</p>
    </div>
  );
}

type Stats = {
  totalProducts: number;
  totalOrders: number;
  totalCategories: number;
  totalRevenue: number;
};

export default async function StatisticsItem({ stats }: { stats: Stats }) {
  //Translations
  const t = await getTranslations("dashboard.overview");
  const format = await getFormatter();
  const locale = await getLocale();

  //format currency code to be after number instead of before it.
  const formatCurrency = (value: number) => {
    const parts = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EGP",
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
      numberingSystem: locale === "ar" ? "arab" : "latn",
      currencyDisplay: locale === "ar" ? "symbol" : "code",
    }).formatToParts(value);

    const sorted = [
      ...parts.filter((p) => p.type !== "currency"),
      ...parts.filter((p) => p.type === "currency"),
    ];

    return (
      <>
        {sorted.map((part, i) =>
          part.type === "currency" ? (
            <span key={i} className="text-sm font-medium">
              {part.value}
            </span>
          ) : (
            part.value
          ),
        )}
      </>
    );
  };

  //Variables
  const STAT_CONFIGS = [
    {
      key: "totalProducts",
      icon: Package,
      label: t("total-products"),
      iconClassName: "text-maroon-600 dark:text-maroon-400",
      bgClassName: "bg-maroon-50 dark:bg-maroon-900/30",
      value: format.number(stats.totalProducts, "precise"),
    },
    {
      key: "totalOrders",
      icon: ReceiptText,
      label: t("total-orders"),
      iconClassName: "text-blue-600 dark:text-blue-400",
      bgClassName: "bg-[#0063D00D] dark:bg-blue-900/30",
      value: format.number(stats.totalOrders, "precise"),
    },
    {
      key: "totalCategories",
      icon: ClipboardList,
      label: t("total-categories"),
      iconClassName: "text-[#753CBF] dark:text-purple-400",
      bgClassName: "bg-[#753CBF0D] dark:bg-purple-900/30",
      value: format.number(stats.totalCategories, "precise"),
    },
    {
      key: "totalRevenue",
      icon: CircleDollarSign,
      label: t("total-revenue"),
      iconClassName: "text-emerald-600 dark:text-emerald-400",
      bgClassName: "bg-[#0089610D] dark:bg-emerald-900/30",
      value: formatCurrency(stats.totalRevenue),
    },
  ];

  return (
    <>
      {STAT_CONFIGS.map((config) => (
        <StatItem {...config} key={config.key} />
      ))}
    </>
  );
}
