import type { Writing } from "@/types/writings";

const NoteCard = ({ note }: { note: Writing }) => {
    return (
        <div className="mt-1 pt-5 hover:cursor-pointer">
            <div className="items-center">
                <div className="col-span-2">
                    <p className="text-sm text-gray-400">
                        {note.published !== "" ? (
                            <time dateTime={note.published}>
                                {new Date(
                                    `${note.published}T12:00:00-07:00`,
                                ).toLocaleDateString(undefined, {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </time>
                        ) : (
                            "Unpublished"
                        )}
                    </p>

                    <span className="mt-2 block">
                        <p className="text-xl font-semibold text-gray-200">
                            {note.title}
                        </p>
                        <p className="mt-2 text-base text-gray-400">
                            {note.description}
                        </p>
                    </span>

                    <div className="mt-3">
                        <span className="text-base font-semibold text-pink-700 hover:text-pink-600">
                            Read the note
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoteCard;
