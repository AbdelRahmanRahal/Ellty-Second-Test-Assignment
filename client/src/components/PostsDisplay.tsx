import React, { useState, useEffect } from "react"
import {
  fetchPosts,
  buildPostTree,
  transformNodeToReplyData,
  type TreeNode,
} from "../api/posts.ts"
import Post from "./Post.tsx"
import "./PostsDisplay.css"

const PostsDisplay: React.FC = () => {
  const [posts, setPosts] = useState<TreeNode[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const loadPosts = async () => {
    try {
      setLoading(true)
      setError(null)
      const rawPosts = await fetchPosts()
      // The API response might not be sorted, which can cause issues with calculation.
      // Sorting by ID ensures parents are processed before children.
      const sortedPosts = rawPosts.sort((a, b) => a.id - b.id)
      const postTree = buildPostTree(sortedPosts)
      setPosts(postTree)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPosts()
  }, [])

  if (loading) {
    return <div>Loading posts...</div>
  }

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>
  }

  return (
    <div className="posts-display">
      {posts.map((post) => (
        <Post
          key={post.id}
          id={String(post.id)}
          author={post.author}
          number={post.base_number!}
          replies={transformNodeToReplyData(post.children)}
          onReplyPosted={loadPosts}
        />
      ))}
    </div>
  )
}

export default PostsDisplay
