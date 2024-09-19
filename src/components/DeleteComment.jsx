import { deleteComment } from "../axiosFunctions";
import React from "react";
import Popup from "reactjs-popup";

const DeleteComment = ({
  comment_id,
  loggedInUser,
  username,
  comments,
  setComments,
}) => {
  const onSubmit = (e) => {
    deleteComment(comment_id);
    e.preventDefault();
    setComments(
      comments.filter((comment) => comment.comment_id !== comment_id)
    );
  };
  if (loggedInUser === username)
    return (
      <div>
        <Popup trigger={<button>delete</button>} modal>
          {(close) => (
            <div className="modal">
              <div className="header">Are you sure you want to delete?</div>

              <div className="actions">
                <button
                  onClick={(e) => {
                    onSubmit(e);
                  }}
                >
                  delete
                </button>
                <button
                  onClick={() => {
                    close();
                  }}
                >
                  cancel
                </button>
              </div>
            </div>
          )}
        </Popup>
      </div>
    );
};
export default DeleteComment;
