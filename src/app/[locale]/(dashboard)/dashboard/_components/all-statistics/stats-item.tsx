import {
  CircleDollarSign,
  ClipboardList,
  Package,
  ReceiptText,
} from "lucide-react";
import { LucideIcon } from "lucide-react";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import { useCallback } from "react";

interface StatItemProps {
  icon: LucideIcon;
  value: string | number;
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
    <div className={`${bgClassName} rounded-2xl p-4 w-full`}>
      <Icon className={iconClassName} width={35} height={35} />

      {/* Value Of Stats */}
      <span
        className={`font-semibold text-2xl ${iconClassName} mt-3 mb-1 block`}>
        {value}
      </span>

      <p className="text-zinc-800 font-medium">{label}</p>
    </div>
  );
}

type Stats = {
  totalProducts: number;
  totalOrders: number;
  totalCategories: number;
  totalRevenue: number;
};

export default function StatisticsItem({ stats }: { stats: Stats }) {
  //Translations
  const t = useTranslations("dashboard.overview");
  const format = useFormatter();
  const locale = useLocale();

  //format currency code to be after number instead of before it.
  const formatCurrency = useCallback(
    (value: number) => {
      const formatted = format.number(value, "currency", {
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      });

      if (locale.startsWith("ar")) {
        return formatted;
      }

      return formatted.replace(/^([A-Z]{3})\s*(.+)$/, "$2 $1").trim();
    },
    [format, locale],
  );

  //Variables
  const STAT_CONFIGS = [
    {
      key: "totalProducts",
      icon: Package,
      label: t("total-products"),
      iconClassName: "text-maroon-600",
      bgClassName: "bg-maroon-50",
      value: format.number(stats.totalProducts, "precise"),
    },
    {
      key: "totalOrders",
      icon: ReceiptText,
      label: t("total-orders"),
      iconClassName: "text-blue-600",
      bgClassName: "bg-[#0063D00D]",
      value: format.number(stats.totalOrders, "precise"),
    },
    {
      key: "totalCategories",
      icon: ClipboardList,
      label: t("total-categories"),
      iconClassName: "text-[#753CBF]",
      bgClassName: "bg-[#753CBF0D]",
      value: format.number(stats.totalCategories, "precise"),
    },
    {
      key: "totalRevenue",
      icon: CircleDollarSign,
      label: t("total-revenue"),
      iconClassName: "text-emerald-600",
      bgClassName: "bg-[#0089610D]",
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
