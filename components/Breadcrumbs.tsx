import Link from "next/link";
import { ChevronRight, Home } from "react-feather";
import type { BreadcrumbsProps } from "../types/breadcrumbs";

const Breadcrumbs = ({ ...props }: BreadcrumbsProps) => {
    return (
        <nav className="flex mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
                <li>
                    <Link href="/">
                        <a className="text-gray-500 hover:text-gray-400 transition-colors duration-200 ease-in-out hover:cursor-pointer">
                            <span className="sr-only">Home</span>
                            <Home />
                        </a>
                    </Link>
                </li>
                <li>
                    <div className="flex items-center">
                        <ChevronRight />

                        <Link href={props.basePath}>
                            <a className="ml-4 text-sm font-medium text-gray-400 hover:text-gray-300 transition-colors duration-200 ease-in-out hover:cursor-pointer">
                                {props.baseLabel}
                            </a>
                        </Link>
                    </div>
                </li>
                <li>
                    <div className="flex items-center">
                        <ChevronRight />

                        <span className="ml-4 text-sm font-medium text-gray-400 hover:text-gray-300 transition-colors duration-200 ease-in-out hover:cursor-pointer">
                            {props.currentLabel}
                        </span>
                    </div>
                </li>
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
