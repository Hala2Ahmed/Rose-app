interface Props {
    order: string;
    date: string;
    t: (key: string) => string;
};

export default function HeaderOrderItem({ order, date, t }: Props) {

    return (
        <div className="flex items-center justify-between rounded-t-lg bg-red-800 dark:bg-softPink-200 px-4 py-3 text-white dark:text-zinc-800">
            <span className="font-semibold text-2xl">{t("order")} #{order}</span>
            <span>{t("created")}: <span className="font-semibold">{date}</span></span>
        </div>
    )
}