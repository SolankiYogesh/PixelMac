interface PostResponse {
  limit: number
  posts: Post[]
}
interface Post {
  body: string
  id: number
  reactions: Reactions
  tags: string[]
  title: string
  userId: number
  views: number
}

interface Reactions {
  dislikes: number
  likes: number
}
interface PixabayImage {
  id: number
  pageURL: string
  type: string
  tags: string
  previewURL: string
  previewWidth: number
  previewHeight: number
  webformatURL: string
  webformatWidth: number
  webformatHeight: number
  largeImageURL: string
  fullHDURL: string
  imageURL: string
  imageWidth: number
  imageHeight: number
  imageSize: number
  views: number
  downloads: number
  likes: number
  comments: number
  user_id: number
  user: string
  userImageURL: string
}

interface PixabayResponse {
  total: number
  totalHits: number
  hits: PixabayImage[]
}
