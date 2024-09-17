import { useState } from "react";
import { patchArticleVotes } from "../axiosFunctions";

const Votes = ({ article_id, setArticleVotes, articleVotes }) => {
  const [upVoted, setUpVoted] = useState(false);
  const [downVoted, setDownVoted] = useState(false);

  const articleUpVoteHandler = (article_id, votes) => {
    patchArticleVotes(article_id, { inc_votes: votes }).then(({ article }) => {
      setArticleVotes(article.votes);
      console.log(article.votes);
      setUpVoted(true);
      setDownVoted(false);
    });
  };
  const articleDownVoteHandler = (article_id, votes) => {
    patchArticleVotes(article_id, { inc_votes: votes }).then(({ article }) => {
      setArticleVotes(article.votes);
      setUpVoted(false);
      setDownVoted(true);
    });
  };

  return (
    <>
      {upVoted ? (
        <>
          <span
            className="upVoted"
            onClick={() => {
              patchArticleVotes(article_id, { inc_votes: -1 }).then(
                ({ article }) => {
                  setArticleVotes(article.votes);
                  setUpVoted(false);
                  setDownVoted(false);
                }
              );
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
              setUpVoted(false);
              setDownVoted(false);
            }}
          >
            &#x25B2;
          </span>
          <span
            className="downVoted"
            onClick={() => {
              patchArticleVotes(article_id, { inc_votes: 1 }).then(
                ({ article }) => {
                  setArticleVotes(article.votes);
                  setUpVoted(false);
                  setDownVoted(false);
                }
              );
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
