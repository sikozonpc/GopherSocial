interface PostComment {
  id: number
  post_id: number
  user_id: number
  content: string
  created_at: string
  user?: {
    id: number
    username: string
  }
}

export interface FeedPost {
  id: number
  user_id: number
  comments_count: number
  content: string
  created_at: string
  tags: string[]
  title?: string
  comments?: PostComment[]
}

interface PostProps {
  post: FeedPost
  onClick: () => void
}

export const Post: React.FC<PostProps> = ({ post, onClick }) => (
  <div key={post.id} className="post" onClick={onClick}>
    <h2>{post.title}</h2>
    <p>{post.content}</p>

    <div className="post-bottom">
      <p>Categories: {post.tags?.join(', ')}</p>
      <p>{new Date(post.created_at).toDateString()}</p>
    </div>

    <div>
      Click to see {post.comments_count} comments
    </div>
  </div >
)