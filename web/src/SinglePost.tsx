import useSWR from "swr"
import { FeedPost } from "./Post"
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { fetcher } from "./App";

export const SinglePost = () => {
  const { postID } = useParams();
  const [cookies] = useCookies(['at']);
  const at = cookies.at;

  const redirect = useNavigate();


  const { data, error, isLoading } = useSWR<{ data: FeedPost }>('/posts/' + postID, at ? fetcher(at) : null)

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  const { data: post } = data

  const date = new Date(post.created_at).toDateString();

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>

      <div className="comments">
        {post.comments?.map(comment => (
          <div key={comment.id} className="comment">
            <p>{comment.user?.username}: </p>
            <p>{comment.content}</p>
            <p className="comment-date">at {date}</p>
          </div>
        ))}
      </div>

      <button onClick={() => redirect("/feed")}>Go back</button>
    </div>
  )
}