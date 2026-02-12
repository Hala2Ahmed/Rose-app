import OccasionsFilter from "./_components/filters/occasions-filter/occasions-filter";
import PriceFilter from "./_components/filters/price-filter";
import Orders from "./_components/orders/orders";

export default function page() {
  return (
    <>
      <Orders />
    </>
  )
  return (
    <div className="flex gap-5 ">
      {/* Filters */}
      <div className="w-filtersCard border-e pe-24">
        <div className="w-[277px]">
          {/* Occasions Filter */}
          <OccasionsFilter />
          {/* Prices Filter */}
          <PriceFilter />
        </div>
      </div>

      {/* Product List */}
    </div>
  );
}
