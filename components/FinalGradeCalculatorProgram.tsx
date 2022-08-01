import feather from "feather-icons";
import InputField from "./InputField";
import { resizeIcon } from "@hkamran/utility-web";
import { useEffect, useState } from "react";

const messages = (score: number): string => {
    if (score > 100) {
        return 'Impossible. But as Tommy Lasorda said, "The difference between the impossible and the possible lies in a man\'s determination."';
    } else if (score < 0) {
        return "Uhhh...yeah, go ahead and flunk the final, you should get the grade you want.";
    } else {
        return "Achievable. I have faith in you.";
    }
};

const FinalGradeCalculatorProgram = () => {
    const [currentGrade, setCurrentGrade] = useState<number | null>(null);
    const [gradeWanted, setGradeWanted] = useState<number | null>(null);
    const [finalWeight, setFinalWeight] = useState<number | null>(null);
    const [scoreNeeded, setScoreNeeded] = useState<string | null>(null);

    useEffect(() => {
        if (currentGrade && gradeWanted && finalWeight) {
            let score =
                (gradeWanted * 100 - currentGrade * (100 - finalWeight)) /
                finalWeight;

            setScoreNeeded(score.toFixed(2));
        }
    }, [currentGrade, gradeWanted, finalWeight]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
            <InputField
                type="number"
                placeholder="Current Grade"
                label="Current Grade"
                value={currentGrade || undefined}
                valueUpdate={(value) => setCurrentGrade(value as number)}
                svg={resizeIcon(feather.icons.percent.toSvg())}
            />

            <InputField
                type="number"
                placeholder="Grade Wanted"
                label="Grade Wanted"
                value={gradeWanted || undefined}
                valueUpdate={(value) => setGradeWanted(value as number)}
                svg={resizeIcon(feather.icons.percent.toSvg())}
            />

            <InputField
                type="number"
                placeholder="Final Weight"
                label="Final Weight"
                value={finalWeight || undefined}
                classes="md:col-span-2"
                valueUpdate={(value) => setFinalWeight(value as number)}
                svg={resizeIcon(feather.icons.percent.toSvg())}
            />

            <div className="md:col-span-2">
                <hr
                    className="mb-4"
                    style={{
                        border: 0,
                        height: "1px",
                        background: "#374151",
                    }}
                />

                <InputField
                    type="number"
                    placeholder="Score Needed"
                    label="Score Needed"
                    value={scoreNeeded || ""}
                    valueUpdate={(value) => {}}
                    svg={resizeIcon(feather.icons.percent.toSvg())}
                    disabled
                />

                <span>{scoreNeeded && messages(Number(scoreNeeded))}</span>
            </div>
        </div>
    );
};

export default FinalGradeCalculatorProgram;
