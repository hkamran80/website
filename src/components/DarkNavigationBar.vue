<template>
    <nav>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <img
                            class="block lg:hidden h-8 w-auto"
                            src="/src/assets/profile.png"
                            alt="Profile"
                        />

                        <div class="hidden lg:block items-center">
                            <img
                                class="h-8 w-auto"
                                src="/src/assets/profile.png"
                                alt="Profile"
                            />

                            H. Kamran
                        </div>
                    </div>
                    <div class="hidden sm:block sm:ml-6">
                        <div class="flex space-x-4">
                            <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                            <a
                                href="#"
                                class="
                                    bg-gray-900
                                    text-white
                                    px-3
                                    py-2
                                    rounded-md
                                    text-sm
                                    font-medium
                                "
                                >Dashboard</a
                            >
                            <a
                                href="#"
                                class="
                                    text-gray-300
                                    hover:bg-gray-700 hover:text-white
                                    px-3
                                    py-2
                                    rounded-md
                                    text-sm
                                    font-medium
                                "
                                >Team</a
                            >
                            <a
                                href="#"
                                class="
                                    text-gray-300
                                    hover:bg-gray-700 hover:text-white
                                    px-3
                                    py-2
                                    rounded-md
                                    text-sm
                                    font-medium
                                "
                                >Projects</a
                            >
                            <a
                                href="#"
                                class="
                                    text-gray-300
                                    hover:bg-gray-700 hover:text-white
                                    px-3
                                    py-2
                                    rounded-md
                                    text-sm
                                    font-medium
                                "
                                >Calendar</a
                            >
                        </div>
                    </div>
                </div>
                <div class="hidden sm:ml-6 sm:block">
                    <div class="flex items-center">
                        <button
                            class="
                                bg-gray-800
                                p-1
                                rounded-full
                                text-gray-400
                                hover:text-white
                                focus:outline-none
                                focus:ring-2
                                focus:ring-offset-2
                                focus:ring-offset-gray-800
                                focus:ring-white
                            "
                        >
                            <span class="sr-only">View notifications</span>
                            <svg
                                class="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>
