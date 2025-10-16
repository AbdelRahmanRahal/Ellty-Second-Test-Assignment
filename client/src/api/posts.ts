import { type ReplyData } from "../components/Reply"

export interface Post {
  id: number
  parent_id: number | null
  base_number: number | null
  operation: string | null
  operand: number | null
  author: string
  created_at: string
}

export interface TreeNode extends Post {
  children: TreeNode[]
  result: number
}

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch("http://localhost:3000/api/posts")
  if (!response.ok) {
    throw new Error("Failed to fetch posts")
  }
  return response.json()
}

export const buildPostTree = (posts: Post[]): TreeNode[] => {
  const postMap = new Map<number, TreeNode>()
  const rootPosts: TreeNode[] = []

  // First pass: create TreeNode for each post and store in map
  posts.forEach((post) => {
    postMap.set(post.id, {
      ...post,
      children: [],
      result: 0, // Will be calculated in the second pass
    })
  })

  // Second pass: build the tree and calculate results
  posts.forEach((post) => {
    const treeNode = postMap.get(post.id)
    if (!treeNode) return

    if (post.parent_id === null) {
      // This is a root post
      treeNode.result = post.base_number ?? 0
      rootPosts.push(treeNode)
    } else {
      // This is a child post
      const parentNode = postMap.get(post.parent_id)
      if (parentNode) {
        // Calculate result based on parent's result
        const parentResult = parentNode.result
        const { operation, operand } = post
        let currentResult = parentResult

        if (operation && operand !== null) {
          switch (operation) {
            case "+":
              currentResult += operand
              break
            case "-":
              currentResult -= operand
              break
            case "×":
              currentResult *= operand
              break
            case "/":
              currentResult /= operand
              break
          }
        }
        treeNode.result = currentResult
        parentNode.children.push(treeNode)
      }
    }
  })

  return rootPosts
}

// This function transforms the TreeNode from the fetch logic into the ReplyData shape expected by the Reply component.
export const transformNodeToReplyData = (nodes: TreeNode[]): ReplyData[] => {
  return nodes.map((node) => {
    return {
      id: String(node.id),
      author: node.author,
      // Ensure operation is valid before asserting the type (it fixes some niche TS error lol)
      operation: (node.operation?.charAt(0) ?? "+") as "+" | "-" | "×" | "/",
      operand: node.operand!,
      replies: node.children ? transformNodeToReplyData(node.children) : [],
    }
  })
}
