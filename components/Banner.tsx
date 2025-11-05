import NavLink from "./navigation/NavLink";

const Banner = () => (
    <header className="relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-800/50 px-6 py-2.5 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10 sm:px-3.5 sm:before:flex-1">
        <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm/6 text-gray-100">
                <strong className="font-semibold">We Did It</strong>
                <svg
                    viewBox="0 0 2 2"
                    aria-hidden="true"
                    className="mx-2 inline size-0.5 fill-current"
                >
                    <circle r="1" cx="1" cy="1" />
                </svg>
                California voted heavily in favour of Prop. 50, NYC elected
                Zohran Mamdani, and voters across the country said no to Trump
            </p>
            <NavLink
                href="https://apnews.com/projects/election-results-2025/"
                className="flex-none rounded-full bg-white/10 px-3.5 py-1 text-sm font-semibold text-white shadow-sm ring-white/20 hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
                Results <span aria-hidden="true">&rarr;</span>
            </NavLink>
        </div>
        <div className="flex flex-1 justify-end"></div>
    </header>
);

export default Banner;
