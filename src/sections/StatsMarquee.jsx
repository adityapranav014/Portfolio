import Marquee from "../components/Marquee";

const items = [
    "6 Projects Shipped",
    "34% AOV Lift",
    "10k Concurrent Users",
    "Sub-2s FCP",
    "Zero Downtime Deploys",
    "14 Page-One Rankings",
    "3× Revenue on Launch",
    "91 Lighthouse Score",
];

// Render each item as a stat pill
const statItems = items.map((label) => (
    <span key={label} className="flex items-center gap-6 shrink-0 px-8">
        <span
            aria-hidden="true"
            className="w-1 h-1 rounded-full bg-accent shrink-0"
        />
        <span>{label}</span>
    </span>
));

const StatsMarquee = () => (
    <div className="border-y border-black/[0.08] overflow-hidden">
        <Marquee
            items={statItems}
            className="text-black bg-[#e5e5e0] text-[11px] uppercase tracking-[0.3em] font-light"
            iconClassName="hidden"
        />
    </div>
);

export default StatsMarquee;
