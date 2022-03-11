import StarBorderIcon from "@mui/icons-material/StarBorder";
import Star from "@mui/icons-material/Star";
import { mainTheme } from "../../App";
import React from "react";

interface RateBoxProps {
  onChange?: (newRate: number) => void;
  value: number;
}

const RateBox: React.FC<RateBoxProps> = (props: RateBoxProps) => {
  const handleStarClicked = (index: number) => {
    if (props.onChange) {
      props.onChange(index);
    }
  };
  return (
    <div style={{ width: "100%" }} className="flexRow">
      <div
        className="head3"
        style={{
          color: mainTheme.palette.midGrey.main,
          display: "flex",
          alignItems: "center",
          paddingRight: "1em",
        }}
      >
        Rate:
      </div>
      {[...Array(5).keys()].map((item) => {
        return (
          <span onClick={() => handleStarClicked(item + 1)}>
            {item < props.value ? <Star /> : <StarBorderIcon />}
          </span>
        );
      })}
    </div>
  );
};

export default RateBox;
