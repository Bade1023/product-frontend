import React from "react";
import HorizontalTimeline from "react-horizontal-timeline";
import moment from "moment";
import Datas from "./Data";

function HomePage() {
    const [period, setPeriod] = React.useState(1);
    const [curIdx, setCurIdx] = React.useState(1);
    const [prevIdx, setPrevIdx] = React.useState(-1);

    return (
        <div>
            <div
                style={{
                    height: "200px"
                }}
                className="text-center"
            >
                <h3>Filter Bars</h3>
            </div>
            <div
                style={{
                    width: "80%",
                    height: "100px",
                    margin: "0 auto",
                    marginTop: "20px",
                    fontSize: "15px"
                }}
            >
                <HorizontalTimeline
                    labelWidth={200}
                    getLabel={(date) => {
                        return moment(date).format("lll");
                    }}
                    styles={{
                        background: "#f8f8f8",
                        foreground: "#1A79AD",
                        outline: "#dfdfdf"
                    }}
                    index={curIdx}
                    indexClick={(index) => {
                        const curIdX = curIdx;
                        setCurIdx(index);
                        setPrevIdx(curIdX);
                    }}
                    values={Datas[period].map((x) => x.data)}
                />
            </div>
        </div>
    );
}

export default HomePage;
