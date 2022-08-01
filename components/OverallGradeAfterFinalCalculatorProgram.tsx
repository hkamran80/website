import feather from "feather-icons";
import InputField from "./InputField";
import { resizeIcon } from "@hkamran/utility-web";
import { useEffect, useState } from "react";

const OverallGradeAfterFinalCalculatorProgram = () => {
    const [gradeBeforeFinal, setGradeBeforeFinal] = useState<number | null>(
        null,
    );
    const [finalScore, setFinalScore] = useState<number | null>(null);
    const [finalWeight, setFinalWeight] = useState<number | null>(null);
    const [gradeAfterFinal, setGradeAfterFinal] = useState<string | null>(null);

    useEffect(() => {
        if (gradeBeforeFinal && finalScore && finalWeight) {
            let finalWeightDecimal = finalWeight / 100;
            let score =
                ((1 - finalWeightDecimal) * (gradeBeforeFinal / 100) +
                    finalWeightDecimal * (finalScore / 100)) *
                100;

            setGradeAfterFinal(score.toFixed(2));
        }
    }, [gradeBeforeFinal, finalScore, finalWeight]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
            <InputField
                type="number"
                placeholder="Grade Before Final"
                label="Grade Before Final"
                value={gradeBeforeFinal || undefined}
                valueUpdate={(value) => setGradeBeforeFinal(value as number)}
                svg={resizeIcon(feather.icons.percent.toSvg())}
            />

            <InputField
                type="number"
                placeholder="Final Score"
                label="Final Score"
                value={finalScore || undefined}
                valueUpdate={(value) => setFinalScore(value as number)}
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
                    placeholder="Grade After Final"
                    label="Grade After Final"
                    value={gradeAfterFinal || ""}
                    valueUpdate={(value) => {}}
                    svg={resizeIcon(feather.icons.percent.toSvg())}
                    disabled
                />
            </div>
        </div>
    );
};

export default OverallGradeAfterFinalCalculatorProgram;
