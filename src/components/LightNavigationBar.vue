<template>
    <nav>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <div class="flex">
                    <div class="flex-shrink-0 flex items-center">
                        <img
                            class="block lg:hidden h-8 w-auto"
                            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                            alt="Workflow"
                        />
                        <img
                            class="hidden lg:block h-8 w-auto"
                            src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                            alt="Workflow"
                        />
                    </div>
                    <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
                        <!-- Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
                        <a
                            href="#"
                            class="
                                border-indigo-500
                                text-gray-900
                                inline-flex
                                items-center
                                px-1
                                pt-1
                                border-b-2
                                text-sm
                                font-medium
                            "
                        >
                            Dashboard
                        </a>
                        <a
                            href="#"
                            class="
                                border-transparent
                                text-gray-500
                                hover:border-gray-300 hover:text-gray-700
                                inline-flex
                                items-center
                                px-1
                                pt-1
                                border-b-2
                                text-sm
                                font-medium
                            "
                        >
                            Team
                        </a>
                        <a
                            href="#"
                            class="
                                border-transparent
                                text-gray-500
                                hover:border-gray-300 hover:text-gray-700
                                inline-flex
                                items-center
                                px-1
                                pt-1
                                border-b-2
                                text-sm
                                font-medium
                            "
                        >
                            Projects
                        </a>
                        <a
                            href="#"
                            class="
                                border-transparent
                                text-gray-500
                                hover:border-gray-300 hover:text-gray-700
                                inline-flex
                                items-center
                                px-1
                                pt-1
                                border-b-2
                                text-sm
                                font-medium
                            "
                        >
                            Calendar
                        </a>
                    </div>
                </div>
                <div class="hidden sm:ml-6 sm:flex sm:items-center">
                    <!-- Profile dropdown -->
                    <div class="ml-3 relative">
                        <div>
                            <button
                                class="
                                    bg-white
                                    rounded-full
                                    flex
                                    text-sm
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-offset-2
                                    focus:ring-indigo-500
                                "
                                id="user-menu"
                                aria-haspopup="true"
                            >
                                <span class="sr-only"> Switch theme </span>
                                <img
                                    class="h-8 w-8 rounded-full"
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                                    alt=""
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>
