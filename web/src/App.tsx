import useSWR, { mutate } from 'swr'
import './App.css'
import { FeedPost, Post } from './Post'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import gohper from './../public/gohper.svg'
import { CreatePostForm } from './CreatePostForm'

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/v1"
export const fetcher = (at: string) => (url: string) => fetch(API_URL + url, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${at}`
  }
}).then(r => r.json())

function App() {
  const [cookies, setCookie] = useCookies(['at']);
  const at = cookies.at;

  const redirect = useNavigate();

  const { data, error, isLoading } = useSWR<{ data: FeedPost[] }>('/feed', at ? fetcher(at) : null)

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  const { data: posts } = data

  const handleLogout = () => {
    setCookie("at", "")
    redirect("/")
    return
  }

  const reFetchData = () => {
    mutate('/feed');
  };

  const handleClickPost = (id: number) => () => redirect(`/post/${id}`)

  return (
    <div>
      <nav className='nav'>
        <div className='logo-container'>
          <img src={gohper} className="logo" />
          <h1>GopherSocial</h1>
        </div>

        <button onClick={handleLogout}>Logout</button>
      </nav>

      <p>This is a social media platform for gophers.</p>

      <CreatePostForm onFetchPosts={reFetchData} />

      <div className='posts'>
        {posts.map(post => (
          <Post key={post.id} post={post} onClick={handleClickPost(post.id)} />
        ))}

        {posts.length === 0 && <p>No posts yet, start following someone or post something</p>}
      </div>

    </div>
  )
}

export default App
