import { useState } from "react"
import { API_URL } from "./App"
import { useCookies } from "react-cookie"

export const CreatePostForm: React.FC<{ onFetchPosts: () => void }> = ({ onFetchPosts }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const [cookies] = useCookies(['at']);
  const at = cookies.at;

  const handleSubmit = async () => {
    await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${at}`
      },
      body: JSON.stringify({
        title,
        content
      })
    })

    setTitle('')
    setContent('')
    onFetchPosts()
  }

  return (
    <div className="gopher-form">
      <label>
        <input placeholder="Title..." value={title} type="text" onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        <textarea placeholder="What's in your mind..." value={content} onChange={(e) => setContent(e.target.value)} />
      </label>
      <button onClick={handleSubmit}>Share</button>
    </div>
  )
}