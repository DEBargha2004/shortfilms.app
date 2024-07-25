import { PostLayout } from '@/components/custom/post'

export default function Layout ({
  children,
  related
}: {
  children: React.ReactNode
  related: React.ReactNode
}) {
  return (
    <PostLayout>
      {children}
      {related}
    </PostLayout>
  )
}
