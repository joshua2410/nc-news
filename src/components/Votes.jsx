import { useState } from "react";
import { patchArticleVotes } from "../axiosFunctions";

const Votes = ({ article_id, setArticleVotes, articleVotes }) => {
  const [upVoted, setUpVoted] = useState(false);
  const [downVoted, setDownVoted] = useState(false);

  const articleUpVoteHandler = (article_id, votes) => {
    setArticleVotes(articleVotes + votes);
    setUpVoted(true);
    setDownVoted(false);
    patchArticleVotes(article_id, { inc_votes: votes });
  };
  const articleDownVoteHandler = (article_id, votes) => {
    setArticleVotes(articleVotes + votes);
    setUpVoted(false);
    setDownVoted(true);
    patchArticleVotes(article_id, { inc_votes: votes });
  };

  return (
    <>
      {upVoted ? (
        <>
          <span
            className="upVoted"
            onClick={() => {
              setArticleVotes(articleVotes - 1);
              setUpVoted(false);
              setDownVoted(false);
              patchArticleVotes(article_id, { inc_votes: -1 });
            }}
          >
            &#x25B2;
          </span>
          <span
            onClick={() => {
              articleDownVoteHandler(article_id, -2);
            }}
          >
            &#x25BC;
          </span>
        </>
      ) : null}

      {!downVoted && !upVoted ? (
        <>
          <span
            onClick={() => {
              articleUpVoteHandler(article_id, 1);
            }}
          >
            &#x25B2;
          </span>
          <span
            onClick={() => {
              articleDownVoteHandler(article_id, -1);
            }}
          >
            &#x25BC;
          </span>
        </>
      ) : null}
      {downVoted ? (
        <>
          <span
            onClick={() => {
              articleUpVoteHandler(article_id, 2);
            }}
          >
            &#x25B2;
          </span>
          <span
            className="downVoted"
            onClick={() => {
              setArticleVotes(articleVotes + 1);
              setUpVoted(false);
              setDownVoted(false);
              patchArticleVotes(article_id, { inc_votes: 1 });
            }}
          >
            &#x25Bc;
          </span>
        </>
      ) : null}
    </>
  );
};
export default Votes;
