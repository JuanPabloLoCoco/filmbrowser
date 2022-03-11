import { Box, Input } from "@mui/material";
import React, { useState } from "react";
import { mainTheme } from "../../App";
import { Comment } from "../CommentList";
import RateBox from "../RateBox";

interface CommentFormProps {
  onComment?: (newComment: Comment) => void;
}

const CommentForm: React.FC<CommentFormProps> = (props: CommentFormProps) => {
  const [comment, setComment] = useState<string>("");
  const [rate, setRate] = useState<number>(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleChangeRate = (newRate: number) => {
    setRate(newRate);
  };

  const handleSubmit = () => {
    if (props.onComment) {
      const uuid: number = new Date().getUTCDate();
      props.onComment({
        id: uuid,
        description: comment,
        name: "You",
        rate,
      });
    }
  };

  return (
    <>
      <RateBox onChange={handleChangeRate} value={rate} />
      <Box
        height={"3em"}
        borderColor={mainTheme.palette.midGrey.main}
        border={"1px"}
        borderRadius={"5px"}
        bgcolor={mainTheme.palette.white.main}
        className="itemSeparation lightGreyBC"
      >
        <Input
          fullWidth
          multiline
          disableUnderline
          onChange={handleInputChange}
          className="normal1"
          style={{ marginLeft: "1em" }}
          placeholder="Add your coments here"
        />
      </Box>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <button
          style={{
            backgroundColor: mainTheme.palette.tertiary.main,
            paddingInline: "3em",
            color: "white",
            paddingBlock: "0.5em",
            border: 0,
            borderRadius: "5px",
            cursor: "pointer",
          }}
          className="normal2"
          onClick={handleSubmit}
        >
          Post
        </button>
      </div>
    </>
  );
};

export default CommentForm;
