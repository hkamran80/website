import NavLink from "./NavLink";
import { ChevronRight, Home } from "lucide-react";

type BreadcrumbsProps = {
    basePath?: string;
    baseLabel: string;
    currentLabel?: string;
};

const Breadcrumbs = ({ ...props }: BreadcrumbsProps) => {
    return (
        <nav className="mb-6 flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
                <li>
                    <NavLink
                        href="/"
                        className="text-gray-500 transition-colors"
                        conditionalClassNames="duration-200 ease-in-out hover:cursor-pointer hover:text-gray-400"
                    >
                        <span className="sr-only">Home</span>
                        <Home />
                    </NavLink>
                </li>
                <li>
                    <div className="flex items-center">
                        <ChevronRight />

                        {props.basePath ? (
                            <NavLink
                                href={props.basePath}
                                className="ml-4 text-sm font-medium text-gray-400"
                                conditionalClassNames="transition-colors duration-200 ease-in-out hover:cursor-pointer hover:text-gray-300"
                            >
                                {props.baseLabel}
                            </NavLink>
                        ) : (
                            <span className="ml-4 text-sm font-medium text-gray-400">
                                {props.baseLabel}
                            </span>
                        )}
                    </div>
                </li>
                {props.currentLabel ? (
                    <li>
                        <div className="flex items-center">
                            <ChevronRight />

                            <span className="ml-4 text-sm font-medium text-gray-400 transition-colors duration-200 ease-in-out hover:cursor-pointer hover:text-gray-300">
                                {props.currentLabel}
                            </span>
                        </div>
                    </li>
                ) : null}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
