import OrdersList from "@/features/orders/ui/orders-list";
import OrdersPageHeader from "@/features/orders/ui/orders-page-header";

export default function OrdersPage() {
  return (
    <section className="relative bg-[#031522] text-white pt-17">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(24,119,242,0.08),transparent_32%),radial-gradient(circle_at_left_top,rgba(56,189,248,0.06),transparent_24%)]" />

      <div className="relative mx-auto max-w-[1400px] space-y-6 px-4 pb-10 pt-8 sm:px-6 lg:px-8">
        <OrdersPageHeader />
        <OrdersList />
      </div>
    </section>
  );
}