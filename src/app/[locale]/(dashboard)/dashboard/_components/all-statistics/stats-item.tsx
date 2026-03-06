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
              {" "}
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
