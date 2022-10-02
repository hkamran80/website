import Link from "next/link";
import { ChevronRight, Home } from "react-feather";
import type { BreadcrumbsProps } from "../types/breadcrumbs";
import TextLink from "./TextLink";

const Breadcrumbs = ({ ...props }: BreadcrumbsProps) => {
    return (
        <nav className="mb-6 flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
                <li>
                    <TextLink
                        href="/"
                        className="text-gray-500 transition-colors duration-200 ease-in-out hover:cursor-pointer hover:text-gray-400"
                    >
                        <span className="sr-only">Home</span>
                        <Home />
                    </TextLink>
                </li>
                <li>
                    <div className="flex items-center">
                        <ChevronRight />

                        {props.basePath ? (
                            <TextLink
                                href={props.basePath}
                                className="ml-4 text-sm font-medium text-gray-400 transition-colors duration-200 ease-in-out hover:cursor-pointer hover:text-gray-300"
                            >
                                {props.baseLabel}
                            </TextLink>
                        ) : (
                            <span className="ml-4 text-sm font-medium text-gray-400">
                                {props.baseLabel}
                            </span>
                        )}
                    </div>
                </li>
                <li>
                    <div className="flex items-center">
                        <ChevronRight />

                        <span className="ml-4 text-sm font-medium text-gray-400 transition-colors duration-200 ease-in-out hover:cursor-pointer hover:text-gray-300">
                            {props.currentLabel}
                        </span>
                    </div>
                </li>
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
