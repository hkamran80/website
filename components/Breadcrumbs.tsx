import NavLink from './NavLink';
import { BreadcrumbJsonLd } from 'next-seo';
import { ChevronRight, Home } from 'lucide-react';

type BreadcrumbsProps = {
    basePath?: string;
    baseLabel: string;
    currentLabel?: string;
};

const Breadcrumbs = ({ ...props }: BreadcrumbsProps) => {
    return (
        <>
            {props.basePath ? (
                <BreadcrumbJsonLd
                    itemListElements={[
                        {
                            position: 1,
                            name: props.baseLabel,
                            item: `${
                                typeof window !== "undefined" &&
                                window.location.origin
                                    ? window.location.origin
                                    : ""
                            }${props.basePath}`,
                        },
                        ...(props.currentLabel
                            ? [
                                  {
                                      position: 2,
                                      name: props.currentLabel,
                                      item:
                                          typeof window !== "undefined" &&
                                          window.location.origin &&
                                          window.location.pathname
                                              ? window.location.origin +
                                                window.location.pathname
                                              : "",
                                  },
                              ]
                            : []),
                    ]}
                />
            ) : null}

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
        </>
    );
};

export default Breadcrumbs;
